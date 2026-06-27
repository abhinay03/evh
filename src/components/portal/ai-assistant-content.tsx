"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useLocale } from "@/context/locale-context";
import { useTheme } from "@/context/theme-context";
import { aiResponses } from "@/lib/mock-data";

const examplePromptKeys = [
  "ai.prompt.1",
  "ai.prompt.2",
  "ai.prompt.3",
  "ai.prompt.4",
  "ai.prompt.5",
  "ai.prompt.6",
];

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AiAssistantContent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { t, locale } = useLocale();
  const { theme } = useTheme();

  useEffect(() => {
    if (!initialized) {
      setMessages([{ role: "assistant", content: t("ai.portal.greeting") }]);
      setInitialized(true);
    }
  }, [t, initialized]);

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
        <h1 className="text-2xl md:text-3xl font-display font-bold text-evh-dark dark:text-white">{t("ai.portal.title")}</h1>
        <p className="text-evh-gray-500 dark:text-slate-400 text-sm mt-1">{t("ai.portal.subtitle")}</p>
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
                  <img
                    src="/images/Thermo-Toni.png"
                    alt="Thermo-Toni"
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                  />
                )}
                <div
                  className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-evh-dark text-white rounded-br-lg"
                      : "bg-evh-gray-50 dark:bg-slate-800 text-evh-dark dark:text-white rounded-bl-lg"
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
                <img
                  src="/images/Thermo-Toni.png"
                  alt="Thermo-Toni"
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                />
                <div className="bg-evh-gray-50 dark:bg-slate-800 rounded-2xl p-4 rounded-bl-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-evh-gray-300 dark:bg-slate-600 rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-evh-gray-300 dark:bg-slate-600 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
                    <div className="w-2 h-2 bg-evh-gray-300 dark:bg-slate-600 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {examplePromptKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => sendMessage(t(key))}
                  className="px-3 py-1.5 bg-evh-gray-50 dark:bg-slate-800 hover:bg-evh-gray-100 dark:hover:bg-slate-700 text-xs font-medium text-evh-gray-600 dark:text-slate-300 rounded-xl border border-evh-gray-200 dark:border-slate-600 transition-colors"
                >
                  {t(key)}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder={t("ai.portal.placeholder")}
              className="flex-1 px-4 py-3 rounded-xl border border-evh-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-evh-dark dark:text-white placeholder:text-evh-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-evh-primary/50 focus:border-evh-primary transition-all"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              className="px-5 py-3 bg-evh-dark text-white text-sm font-semibold rounded-xl hover:bg-evh-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {t("ai.portal.send")}
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
