import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { api } from "./_generated/api";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: process.env.CONVEX_OPENAI_BASE_URL,
  apiKey: process.env.CONVEX_OPENAI_API_KEY,
});

const LEGAL_SYSTEM_PROMPT = `You are Daayre.ai, a specialized legal AI assistant. You ONLY provide information about:
- Indian law and legal procedures
- Legal rights and obligations
- Court procedures and documentation
- Legal terminology explanations
- General legal guidance (NOT specific legal advice)

STRICT CONSTRAINTS:
- NEVER provide specific legal advice - always recommend consulting a qualified lawyer
- REFUSE to discuss non-legal topics politely but firmly
- Do NOT engage in casual conversation, entertainment, or other domains
- Always remind users that your responses are for informational purposes only
- Suggest consulting local lawyers for specific cases

If asked about non-legal topics, respond: "I'm Daayre.ai, your legal information assistant. I can only help with legal questions and information. Please ask me about Indian law, legal procedures, or your legal rights."

Keep responses concise, accurate, and always include appropriate disclaimers about seeking professional legal counsel.`;

export const sendMessage = action({
  args: {
    message: v.string(),
    sessionId: v.string(),
    location: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<string> => {
    // Check if message is legal-related
    const isLegalQuery = await checkIfLegalQuery(args.message);
    
    if (!isLegalQuery) {
      const response = "I'm Daayre.ai, your legal information assistant. I can only help with legal questions and information about Indian law, legal procedures, or your legal rights. Please ask me a law-related question.";
      
      await ctx.runMutation(api.chat.saveMessage, {
        sessionId: args.sessionId,
        role: "user",
        content: args.message,
        location: args.location,
      });
      
      await ctx.runMutation(api.chat.saveMessage, {
        sessionId: args.sessionId,
        role: "assistant",
        content: response,
        location: args.location,
      });
      
      return response;
    }

    // Get conversation history
    const conversation = await ctx.runQuery(api.chat.getConversation, {
      sessionId: args.sessionId,
    });

    const messages = conversation?.messages || [];
    const recentMessages = messages.slice(-10); // Last 10 messages for context

    // Prepare OpenAI messages
    const openaiMessages = [
      { role: "system" as const, content: LEGAL_SYSTEM_PROMPT },
      ...recentMessages.map((msg: any) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      { role: "user" as const, content: args.message },
    ];

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: openaiMessages,
        max_tokens: 500,
        temperature: 0.3,
      });

      const response: string = completion.choices[0]?.message?.content || "I apologize, but I couldn't process your request. Please try again.";

      // Save both messages
      await ctx.runMutation(api.chat.saveMessage, {
        sessionId: args.sessionId,
        role: "user",
        content: args.message,
        location: args.location,
      });

      await ctx.runMutation(api.chat.saveMessage, {
        sessionId: args.sessionId,
        role: "assistant",
        content: response,
        location: args.location,
      });

      return response;
    } catch (error) {
      console.error("OpenAI API error:", error);
      const fallbackResponse = "I'm experiencing technical difficulties. Please try again in a moment. For urgent legal matters, please consult a qualified lawyer immediately.";
      
      await ctx.runMutation(api.chat.saveMessage, {
        sessionId: args.sessionId,
        role: "assistant",
        content: fallbackResponse,
        location: args.location,
      });
      
      return fallbackResponse;
    }
  },
});

async function checkIfLegalQuery(message: string): Promise<boolean> {
  const legalKeywords = [
    'law', 'legal', 'court', 'judge', 'lawyer', 'attorney', 'case', 'lawsuit', 'contract',
    'agreement', 'rights', 'constitution', 'act', 'section', 'ipc', 'crpc', 'cpc',
    'bail', 'arrest', 'police', 'fir', 'complaint', 'divorce', 'marriage', 'property',
    'inheritance', 'will', 'testament', 'criminal', 'civil', 'family', 'corporate',
    'tax', 'gst', 'income tax', 'labour', 'employment', 'consumer', 'cyber', 'defamation',
    'harassment', 'domestic violence', 'dowry', 'maintenance', 'custody', 'adoption',
    'trademark', 'copyright', 'patent', 'intellectual property', 'arbitration',
    'mediation', 'litigation', 'appeal', 'supreme court', 'high court', 'district court',
    'magistrate', 'session', 'advocate', 'barrister', 'solicitor', 'legal advice',
    'legal help', 'legal consultation', 'legal procedure', 'legal document',
    'affidavit', 'notary', 'stamp paper', 'registration', 'deed', 'lease',
    'rent', 'tenant', 'landlord', 'eviction', 'notice', 'summons', 'warrant',
    'chargesheet', 'evidence', 'witness', 'testimony', 'cross-examination',
    'verdict', 'judgment', 'sentence', 'fine', 'imprisonment', 'probation',
    'parole', 'anticipatory bail', 'regular bail', 'interim bail', 'quash',
    'stay order', 'injunction', 'mandamus', 'habeas corpus', 'certiorari',
    'prohibition', 'quo-warranto', 'fundamental rights', 'directive principles',
    'pil', 'public interest litigation', 'writ petition', 'constitutional law',
    'administrative law', 'tort', 'negligence', 'damages', 'compensation',
    'insurance claim', 'motor accident', 'medical negligence', 'professional negligence'
  ];

  const messageLower = message.toLowerCase();
  return legalKeywords.some(keyword => messageLower.includes(keyword));
}

export const saveMessage = mutation({
  args: {
    sessionId: v.string(),
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
    location: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("conversations")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .first();

    const newMessage = {
      id: crypto.randomUUID(),
      role: args.role,
      content: args.content,
      timestamp: Date.now(),
    };

    if (existing) {
      await ctx.db.patch(existing._id, {
        messages: [...existing.messages, newMessage],
        location: args.location || existing.location,
      });
    } else {
      await ctx.db.insert("conversations", {
        sessionId: args.sessionId,
        messages: [newMessage],
        location: args.location,
      });
    }
  },
});

export const getConversation = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("conversations")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .first();
  },
});

export const clearConversation = mutation({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const conversation = await ctx.db
      .query("conversations")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .first();
    
    if (conversation) {
      await ctx.db.delete(conversation._id);
    }
  },
});
