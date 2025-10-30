import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, User, Sparkles } from 'lucide-react';
import { CVData, Message } from '../../types';
import { getAiCvResponse } from '../../services/geminiService';

interface ChatbotProps {
    cvData: CVData;
}

const Chatbot: React.FC<ChatbotProps> = ({ cvData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { text: "Hello! I'm Aura, Amira's AI assistant. Ask me anything about her portfolio.", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const cvDataString = JSON.stringify(cvData, null, 2);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;
        
        const userMessage: Message = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const aiResponseText = await getAiCvResponse(input, cvDataString);
            const aiMessage: Message = { text: aiResponseText, sender: 'ai' };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error getting AI response:", error);
            const errorMessage: Message = { text: "Sorry, I'm having trouble connecting right now. Please try again later.", sender: 'ai' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'w-80 md:w-96 h-[70vh] max-h-[600px] opacity-100' : 'w-0 h-0 opacity-0'}`}>
                <div className="aurora-card w-full h-full rounded-2xl shadow-2xl shadow-primary/10 flex flex-col">
                    <div className="p-4 border-b border-border/20 flex justify-between items-center">
                        <h3 className="font-bold text-card-foreground flex items-center gap-2"><Sparkles className="w-5 h-5 text-primary"/> AI Assistant</h3>
                        <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-secondary/50">
                            <X size={20} />
                        </button>
                    </div>
                    <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.sender === 'ai' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center"><Bot size={18} /></div>}
                                <p className={`max-w-[85%] text-sm px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-secondary text-secondary-foreground rounded-bl-none'}`}>{msg.text}</p>
                                {msg.sender === 'user' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center"><User size={18} /></div>}
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex items-start gap-3 justify-start">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center"><Bot size={18} /></div>
                                <div className="bg-secondary px-4 py-3 rounded-2xl rounded-bl-none flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-typing-dot" style={{ animationDelay: '0s' }}></span>
                                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-typing-dot" style={{ animationDelay: '0.2s' }}></span>
                                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-typing-dot" style={{ animationDelay: '0.4s' }}></span>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>
                    <form onSubmit={handleSend} className="p-4 border-t border-border/20 flex gap-2">
                        <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Ask a question..." className="flex-grow bg-secondary/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                        <button type="submit" disabled={isTyping} className="bg-primary p-2.5 rounded-lg text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-white text-primary rounded-full w-16 h-16 flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform duration-300 animate-pulse border border-border/20"
                aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
            >
                {isOpen ? <X size={32} /> : <Bot size={32} />}
            </button>
        </div>
    );
};

export default Chatbot;
