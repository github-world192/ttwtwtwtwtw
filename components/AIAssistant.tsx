
import React, { useState, useRef, useEffect } from 'react';
import { chatWithAssistant } from '../services/geminiService';
import { ChatMessage, Task } from '../types';

interface AIAssistantProps {
  tasks: Task[];
}

const AIAssistant: React.FC<AIAssistantProps> = ({ tasks }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: "Hi! I'm your TaskFlow assistant. How can I help you be more productive today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    setIsTyping(true);
    const aiResponse = await chatWithAssistant(userMessage, tasks);
    setIsTyping(false);

    setMessages(prev => [...prev, { role: 'model', content: aiResponse }]);
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-150px)]">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-primary text-white rounded-tr-none' 
                : 'bg-slate-800 text-slate-100 rounded-tl-none'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none flex gap-1">
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-900/50 backdrop-blur-lg border-t border-slate-800">
        <div className="flex items-center gap-2 bg-slate-800 rounded-2xl p-2 pl-4">
          <input 
            type="text"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-transparent border-none text-white focus:ring-0 text-sm h-10"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center disabled:opacity-50 transition-opacity"
          >
            <span className="material-symbols-outlined text-xl">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
