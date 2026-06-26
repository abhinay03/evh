"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { aiResponses } from "@/lib/mock-data";

const examplePrompts = [
  "Explain my bill",
  "Can I switch to district heating?",
  "Will I save money?",
  "Heating seems high",
  "Any incentives?",
  "Should I install solar?",
];

interface Message {
  role: "user" | "assistant";
  content: string;
}

const initialMessages: Message[] = [
  {
    role: "assistant",
    content: "Hello Anna! I'm your EVH AI assistant. Ask me anything about your energy, bills, or how to save money.",
  },
];

export function AiAssistantContent() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const lower = text.toLowerCase();
      let response = aiResponses["explain bill"];
      for (const [key, value] of Object.entries(aiResponses)) {
        if (lower.includes(key)) {
          response = value;
          break;
        }
      }
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="p-4 md:p-6 h-[calc(100vh-8rem)] flex flex-col"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-evh-dark">AI Assistant</h1>
        <p className="text-evh-gray-500 text-sm mt-1">Ask anything about your energy.</p>
      </div>

      <Card className="flex-1 mt-6 flex flex-col overflow-hidden">
        <CardContent className="flex-1 p-5 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 hide-scrollbar">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-evh-yellow to-amber-400 flex items-center justify-center text-white font-bold text-xs shrink-0">
                    AI
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-evh-dark text-white rounded-br-lg"
                      : "bg-evh-gray-50 text-evh-dark rounded-bl-lg"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-evh-dark flex items-center justify-center text-white font-bold text-xs shrink-0">
                    A
                  </div>
                )}
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-evh-yellow to-amber-400 flex items-center justify-center text-white font-bold text-xs shrink-0">
                  AI
                </div>
                <div className="bg-evh-gray-50 rounded-2xl p-4 rounded-bl-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-evh-gray-300 rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-evh-gray-300 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
                    <div className="w-2 h-2 bg-evh-gray-300 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {examplePrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="px-3 py-1.5 bg-evh-gray-50 hover:bg-evh-gray-100 text-xs font-medium text-evh-gray-600 rounded-xl border border-evh-gray-200 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Ask a question..."
              className="flex-1 px-4 py-3 rounded-xl border border-evh-gray-200 bg-white text-sm text-evh-dark placeholder:text-evh-gray-400 focus:outline-none focus:ring-2 focus:ring-evh-yellow/50 focus:border-evh-yellow transition-all"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              className="px-5 py-3 bg-evh-dark text-white text-sm font-semibold rounded-xl hover:bg-evh-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Send
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
