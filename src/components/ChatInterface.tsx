import { useState, useRef, useEffect } from 'react';
import { useMutation, useQuery, useAction } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useLocation } from '../contexts/LocationContext';
import { LawyerSearch } from './LawyerSearch';
import { PaperAirplaneIcon, MapPinIcon, UserIcon, SparklesIcon } from '@heroicons/react/24/outline';

export function ChatInterface() {
  const [message, setMessage] = useState('');
  const [sessionId] = useState(() => crypto.randomUUID());
  const [isLoading, setIsLoading] = useState(false);
  const [showLawyerSearch, setShowLawyerSearch] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { location, setLocation } = useLocation();
  
  const sendMessage = useAction(api.chat.sendMessage);
  const conversation = useQuery(api.chat.getConversation, { sessionId });
  const clearConversation = useMutation(api.chat.clearConversation);

  const messages = conversation?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage('');
    setIsLoading(true);

    try {
      await sendMessage({
        message: userMessage,
        sessionId,
        location: location || undefined,
      });
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = async () => {
    try {
      await clearConversation({ sessionId });
    } catch (error) {
      console.error('Error clearing chat:', error);
    }
  };

  const suggestedQuestions = [
    "What are my rights as a tenant in India?",
    "How do I file an FIR?",
    "What is the process for divorce in India?",
    "How to register a property?",
    "What are consumer rights in India?",
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Chat Header */}
      <div className="backdrop-blur-xl bg-white/30 dark:bg-gray-900/30 rounded-t-2xl border border-white/20 dark:border-gray-700/30 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <SparklesIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">Legal AI Assistant</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">Specialized in Indian Law</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowLawyerSearch(!showLawyerSearch)}
              className="px-3 py-2 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
            >
              Find Lawyers
            </button>
            <button
              onClick={handleClearChat}
              className="px-3 py-2 text-sm bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
            >
              Clear Chat
            </button>
          </div>
        </div>

        {/* Location Input */}
        <div className="mt-4 flex items-center gap-2">
          <MapPinIcon className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Enter your location (optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 px-3 py-2 text-sm bg-white/50 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Lawyer Search Panel */}
      {showLawyerSearch && (
        <div className="backdrop-blur-xl bg-white/30 dark:bg-gray-900/30 border-x border-white/20 dark:border-gray-700/30 p-4">
          <LawyerSearch />
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 backdrop-blur-xl bg-white/20 dark:bg-gray-900/20 border-x border-white/20 dark:border-gray-700/30 overflow-hidden">
        <div className="h-full overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <SparklesIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Welcome to Daayre.ai
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                I'm your AI legal assistant specialized in Indian law. Ask me about your legal rights, procedures, or any law-related questions.
              </p>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Try asking:
                </p>
                <div className="grid gap-2 max-w-lg mx-auto">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setMessage(question)}
                      className="text-left p-3 text-sm bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 rounded-lg hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <SparklesIcon className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] p-4 rounded-2xl backdrop-blur-sm ${
                    msg.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/60 dark:bg-gray-800/60 text-gray-900 dark:text-white border border-white/20 dark:border-gray-700/30'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  <div className="mt-2 text-xs opacity-70">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center flex-shrink-0">
                    <UserIcon className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <SparklesIcon className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="backdrop-blur-xl bg-white/30 dark:bg-gray-900/30 rounded-b-2xl border border-white/20 dark:border-gray-700/30 p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me about Indian law, legal procedures, or your rights..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!message.trim() || isLoading}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-none"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
          Daayre.ai provides legal information only. Always consult a qualified lawyer for specific legal advice.
        </div>
      </form>
    </div>
  );
}
