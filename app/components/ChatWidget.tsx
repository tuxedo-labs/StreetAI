import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, X, Sparkles, User as UserIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
}

interface ChatWidgetProps {
  context: { name: string; description: string } | null;
  onClose: () => void;
}

export default function ChatWidget({ context, onClose }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: context
        ? `I see you're interested in ${context.name}. I have some great local insights about this place. What would you like to know?`
        : "Hi there! I'm your AI Travel Companion. Keep exploring the map, or ask me for general travel advice right here!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Reset/Add context message when context changes
  useEffect(() => {
    if (context) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "ai",
          text: `Focusing on ${context.name}. Ready for your questions!`,
        },
      ]);
    }
  }, [context]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.text,
          context: context,
        }),
      });

      const data = await response.json();

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { id: (Date.now() + 1).toString(), sender: "ai", text: data.reply },
        ]);
      } else {
        throw new Error("No reply from AI");
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: "I'm having a little trouble connecting to the travel network right now. Could you try asking again?",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white/95 backdrop-blur-xl border-l border-white/20 shadow-2xl overflow-hidden font-sans">
      {/* Premium Header */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-6 pb-8 text-white relative overflow-hidden shrink-0">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-10 blur-2xl pointer-events-none" />
        <div className="relative z-10 flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl shadow-inner border border-white/10">
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg tracking-tight">AI Assistant</h3>
              <p className="text-xs text-blue-100 font-medium opacity-90">
                {context ? `Exploring: ${context.name}` : "Travel Guide"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="group p-2 hover:bg-white/20 rounded-full transition-all duration-200 active:scale-95"
          >
            <X className="w-5 h-5 text-blue-100 group-hover:text-white" />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 bg-slate-50/50 scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-3 ${
              msg.sender === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Avatar */}
            <div
              className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
                msg.sender === "user" ? "bg-indigo-100" : "bg-blue-100"
              }`}
            >
              {msg.sender === "user" ? (
                <UserIcon className="w-4 h-4 text-indigo-600" />
              ) : (
                <Bot className="w-4 h-4 text-blue-600" />
              )}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm transition-all duration-300 animate-in fade-in zoom-in-95 ${
                msg.sender === "user"
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-white text-slate-700 border border-slate-100 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-end gap-3">
            <div className="shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shadow-sm">
              <Bot className="w-4 h-4 text-blue-600" />
            </div>
            <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none border border-slate-100 shadow-sm flex items-center gap-1.5">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center gap-2 group"
        >
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
            <Sparkles className="w-4 h-4" />
          </div>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            className="pl-10 pr-12 h-12 rounded-full bg-slate-50 border-slate-200 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all text-base"
          />
          <Button
            type="submit"
            size="icon"
            className={`absolute right-1 top-1 h-10 w-10 rounded-full transition-all duration-300 ${
              input.trim()
                ? "bg-blue-600 hover:bg-blue-700 opacity-100 rotate-0"
                : "bg-slate-200 text-slate-400 opacity-0 -rotate-90 pointer-events-none"
            }`}
            disabled={isLoading || !input.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
        <p className="text-[10px] text-center text-slate-400 mt-2">
          AI can make mistakes. Verify important info.
        </p>
      </div>
    </div>
  );
}
