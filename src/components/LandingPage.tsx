import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { ThemeToggle } from './ThemeToggle';

interface LandingPageProps {
  onEnterChat: () => void;
}

export function LandingPage({ onEnterChat }: LandingPageProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const features = [
    {
      title: "Legal Query Resolution",
      description: "Get instant answers to your legal questions with AI-powered assistance",
      icon: "⚖️"
    },
    {
      title: "Lawyer Directory",
      description: "Find qualified lawyers in your area with specialization filters",
      icon: "👨‍💼"
    },
    {
      title: "24/7 Availability",
      description: "Access legal information anytime, anywhere",
      icon: "🕐"
    },
    {
      title: "Secure & Private",
      description: "Your conversations are encrypted and confidential",
      icon: "🔒"
    }
  ];

  const developers = [
    {
      name: "P Tejas Kumar",
      role: "Lead Developer & AI Specialist",
      bio: "Full-stack developer with expertise in AI/ML and legal technology solutions.",
      github: "https://github.com/PTejasKr",
      linkedin: "#"
    }
  ];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-white/20 dark:border-gray-700/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Daayre.ai
              </span>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Features
              </a>
              <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                About
              </a>
              <ThemeToggle />
              <button
                onClick={onEnterChat}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
              Your AI Legal
              <br />
              Assistant
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
              Get instant legal guidance, find qualified lawyers, and navigate the legal system with confidence.
              <br />
              <span className="text-lg text-gray-500 dark:text-gray-400">Specialized in Indian Law</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={onEnterChat}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Start Legal Consultation
              </button>
              <button className="px-8 py-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 rounded-xl font-semibold text-lg hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all">
                Watch Demo
              </button>
            </div>

            {/* Glass Card Preview */}
            <div className="max-w-2xl mx-auto">
              <div className="backdrop-blur-xl bg-white/30 dark:bg-gray-900/30 rounded-2xl border border-white/20 dark:border-gray-700/30 p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-left space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
                      U
                    </div>
                    <div className="flex-1 bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3">
                      <p className="text-sm text-gray-800 dark:text-gray-200">
                        What are my rights as a tenant in India?
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                      D
                    </div>
                    <div className="flex-1 bg-gray-100 dark:bg-gray-800/50 rounded-lg p-3">
                      <p className="text-sm text-gray-800 dark:text-gray-200">
                        As a tenant in India, you have several important rights under the Rent Control Acts...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need for legal assistance in one intelligent platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/30 dark:bg-gray-900/30 rounded-2xl border border-white/20 dark:border-gray-700/30 p-8 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              About Daayre.ai
            </h2>
          </div>

          <div className="space-y-6">
            {/* Developers Dropdown */}
            <div className="backdrop-blur-xl bg-white/30 dark:bg-gray-900/30 rounded-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
              <button
                onClick={() => toggleSection('developers')}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-white/20 dark:hover:bg-gray-800/20 transition-colors"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Meet the Developers
                </h3>
                <ChevronDownIcon
                  className={`w-5 h-5 text-gray-600 dark:text-gray-300 transform transition-transform ${
                    expandedSection === 'developers' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedSection === 'developers' && (
                <div className="px-6 pb-6">
                  {developers.map((dev, index) => (
                    <div key={index} className="border-t border-white/20 dark:border-gray-700/30 pt-4">
                      <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                        {dev.name}
                      </h4>
                      <p className="text-blue-600 dark:text-blue-400 mb-2">{dev.role}</p>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">{dev.bio}</p>
                      <div className="flex gap-4">
                        <a
                          href={dev.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          GitHub
                        </a>
                        <a
                          href={dev.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          LinkedIn
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mission Dropdown */}
            <div className="backdrop-blur-xl bg-white/30 dark:bg-gray-900/30 rounded-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
              <button
                onClick={() => toggleSection('mission')}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-white/20 dark:hover:bg-gray-800/20 transition-colors"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Our Mission
                </h3>
                <ChevronDownIcon
                  className={`w-5 h-5 text-gray-600 dark:text-gray-300 transform transition-transform ${
                    expandedSection === 'mission' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedSection === 'mission' && (
                <div className="px-6 pb-6 border-t border-white/20 dark:border-gray-700/30 pt-4">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Daayre.ai is dedicated to democratizing legal knowledge and making legal assistance accessible to everyone. 
                    We believe that understanding your legal rights shouldn't be a privilege reserved for the few. Our AI-powered 
                    platform provides instant, accurate legal information while connecting you with qualified legal professionals 
                    when you need personalized advice.
                  </p>
                </div>
              )}
            </div>

            {/* Technology Dropdown */}
            <div className="backdrop-blur-xl bg-white/30 dark:bg-gray-900/30 rounded-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
              <button
                onClick={() => toggleSection('technology')}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-white/20 dark:hover:bg-gray-800/20 transition-colors"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Technology Stack
                </h3>
                <ChevronDownIcon
                  className={`w-5 h-5 text-gray-600 dark:text-gray-300 transform transition-transform ${
                    expandedSection === 'technology' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedSection === 'technology' && (
                <div className="px-6 pb-6 border-t border-white/20 dark:border-gray-700/30 pt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Frontend</h4>
                      <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• React with TypeScript</li>
                        <li>• Tailwind CSS</li>
                        <li>• Vite Build Tool</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Backend</h4>
                      <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• Convex Database</li>
                        <li>• OpenAI GPT-4</li>
                        <li>• Real-time Updates</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="backdrop-blur-xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl border border-white/20 dark:border-gray-700/30 p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Ready to Get Legal Help?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust Daayre.ai for their legal information needs.
            </p>
            <button
              onClick={onEnterChat}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Start Your Legal Journey
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/20 dark:border-gray-700/30">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Daayre.ai
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Your trusted AI legal assistant for Indian law
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 Daayre.ai. All rights reserved. | 
            <span className="ml-1">Disclaimer: This is not a substitute for professional legal advice.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
