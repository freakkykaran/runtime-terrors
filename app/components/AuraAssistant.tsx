"use client";

import { useState } from "react";

export default function VesperAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! I am Vesper 👑 AI, your quantum concierge. Ask me anything via text or voice telemetry." }
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setInput("");

    // Smart automated AI response simulation
    setTimeout(() => {
      let reply = "I am processing your quantum query through the Vesper ecosystem.";
      const lower = userMsg.toLowerCase();
      if (lower.includes("shipping") || lower.includes("delivery")) {
        reply = "All orders are dispatched from our Kolkata primary hub via secure rail telemetry.";
      } else if (lower.includes("price") || lower.includes("cost")) {
        reply = "You can switch currencies instantly using the top navigation USD/INR toggle.";
      } else if (lower.includes("hello") || lower.includes("hi")) {
        reply = "Greetings! How can I assist your hardware acquisition today?";
      }

      setMessages(prev => [...prev, { sender: "ai", text: reply }]);
    }, 1000);
  };

  const handleVoiceToggle = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setInput("Show me flagship devices under $1,000");
    }, 2500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300 font-bold text-xl"
        >
          👑
        </button>
      ) : (
        <div className="w-[360px] md:w-[400px] bg-black/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col h-[520px] overflow-hidden animate-slideUp">
          
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm">👑</div>
              <div>
                <h3 className="font-bold text-sm">Vesper Quantum AI</h3>
                <span className="text-[10px] font-mono text-emerald-400">● Live Neural Telemetry</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition text-xs font-mono"
            >
              ✕
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${msg.sender === 'user' ? 'ml-auto bg-white text-black font-medium rounded-br-none' : 'mr-auto bg-white/5 border border-white/10 text-neutral-200 rounded-bl-none'}`}
              >
                {msg.text}
              </div>
            ))}
            {isListening && (
              <div className="p-3.5 rounded-2xl max-w-[85%] mr-auto bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono animate-pulse">
                🎙️ Listening to your voice telemetry...
              </div>
            )}
          </div>

          {/* Input & Voice Controls */}
          <div className="p-4 border-t border-white/10 bg-white/[0.02] space-y-2">
            <form onSubmit={handleSend} className="flex gap-2">
              <input 
                type="text" 
                placeholder="Ask Vesper AI..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-black/50 border border-white/10 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-white transition text-white placeholder:text-neutral-600"
              />
              <button 
                type="submit"
                className="px-4 py-3 rounded-2xl bg-white text-black font-bold hover:bg-neutral-200 transition text-xs"
              >
                Send
              </button>
            </form>
            <button 
              type="button"
              onClick={handleVoiceToggle}
              className={`w-full py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition ${isListening ? 'bg-red-500/20 border-red-500/40 text-red-400' : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'}`}
            >
              <span>🎙️</span> {isListening ? "Listening..." : "Click to Speak"}
            </button>
          </div>

        </div>
      )}
    </div>
  );
}