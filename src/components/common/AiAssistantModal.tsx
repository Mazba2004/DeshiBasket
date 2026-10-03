import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Bot, Send, X, Sparkles, Phone, AlertCircle } from 'lucide-react';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ isOpen, onClose }) => {
  const { supportChat, sendSupportMessage, activeOrder, setRole } = useApp();
  const [inputText, setInputText] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [supportChat, isOpen]);

  if (!isOpen) return null;

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    sendSupportMessage(inputText.trim());
    setInputText('');
  };

  const handleQuickClick = (q: string) => {
    sendSupportMessage(q);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[600px] max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-700 to-teal-800 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
              <Bot className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-base tracking-tight">DESHI AI সহকারী</h3>
                <span className="text-[10px] bg-emerald-400/20 text-emerald-200 px-1.5 py-0.5 rounded border border-emerald-400/30">
                  অনলাইন
                </span>
              </div>
              <p className="text-xs text-emerald-100">২৪/৭ কাশিয়ানীর স্মার্ট খাবার ও পণ্য ডেলিভারি সেবা</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/15 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Order Notice if exists */}
        {activeOrder && (
          <div className="bg-emerald-50 border-b border-emerald-100 px-4 py-2 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>সক্রিয় অর্ডার #{activeOrder.orderNumber} ({activeOrder.vendor.bengaliName})</span>
            </div>
            <span className="text-emerald-700 font-bold">৳{activeOrder.totalAmount}</span>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
          {supportChat.map(msg => {
            const isAi = msg.sender === 'AI';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}
              >
                <div className="text-[11px] text-slate-400 mb-1 px-1">
                  {msg.senderName} · {msg.timestamp}
                </div>
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed ${
                    isAi
                      ? 'bg-white text-slate-800 shadow-sm border border-slate-200/80 rounded-tl-sm'
                      : 'bg-emerald-600 text-white shadow-sm rounded-tr-sm'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Quick Reply Pills */}
                  {msg.quickReplies && msg.quickReplies.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5">
                      {msg.quickReplies.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickClick(q)}
                          className="text-xs bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-medium px-2.5 py-1 rounded-lg border border-slate-200 transition-colors"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={chatBottomRef} />
        </div>

        {/* Quick Suggestion Buttons Bar */}
        <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 text-[11px] shrink-0">দ্রুত প্রশ্ন:</span>
          <button
            onClick={() => handleQuickClick('আমার অর্ডার কোথায়?')}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 shrink-0"
          >
            আমার অর্ডার কোথায়?
          </button>
          <button
            onClick={() => handleQuickClick('ডেলিভারি দেরি হচ্ছে')}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 shrink-0"
          >
            ডেলিভারি দেরি হচ্ছে
          </button>
          <button
            onClick={() => handleQuickClick('রিফান্ড চাই')}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 shrink-0"
          >
            রিফান্ড নীতি
          </button>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="আপনার প্রশ্ন বা মতামত বাংলায় লিখুন..."
            className="flex-1 bg-slate-100 text-slate-900 placeholder:text-slate-400 text-sm px-4 py-2.5 rounded-xl border border-transparent focus:border-emerald-500 focus:bg-white focus:outline-none transition-all"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="h-10 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-medium flex items-center justify-center transition-all active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Human Agent Contact Fallback */}
        <div className="px-4 py-1.5 bg-slate-100/80 border-t border-slate-200/50 flex items-center justify-between text-[11px] text-slate-500">
          <span>জরুরি প্রয়োজনে হেল্পলাইন: ০১৭১২-০৯৮৭৬৫</span>
          <button
            onClick={() => {
              onClose();
              setRole('CUSTOMER_SERVICE');
            }}
            className="text-emerald-700 font-semibold hover:underline"
          >
            কাস্টমার সার্ভিস ডেস্কে যান →
          </button>
        </div>
      </div>
    </div>
  );
};
