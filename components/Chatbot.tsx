import React, { useState, useRef, useEffect } from 'react';
import { getChatbotResponse } from '../services/localAssistant';
import type { Message } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
);
const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const SendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
);


const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: "Hi, I'm Luna, Amira's portfolio assistant. Ask me about her experience, projects, studies, or technologies." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeChat = () => {
    setIsOpen(false);
    toggleRef.current?.focus();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  useEffect(() => {
    if (!isOpen) return;
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 220);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeChat();
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  const handleSend = async (messageText = input) => {
    const currentInput = messageText.trim();
    if (!currentInput || isLoading) return;

    const userMessage: Message = { sender: 'user', text: currentInput };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await getChatbotResponse(messages, currentInput);
      const aiMessage: Message = { sender: 'ai', text: aiResponse };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage: Message = { sender: 'ai', text: "Luna couldn't connect just now. Please try again in a moment." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (isLoading) return;
    setMessages([{ sender: 'ai', text: "Hi, I'm Luna, Amira's portfolio assistant. Ask me about her experience, projects, studies, or technologies." }]);
    setInput('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chatbot-widget">
      <button
        ref={toggleRef}
        onClick={() => setIsOpen(!isOpen)}
        className="chatbot-toggle"
        aria-label={isOpen ? 'Close Luna chat' : 'Open Luna chat'}
        aria-expanded={isOpen}
        aria-controls="luna-chat-panel"
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </button>

      <div id="luna-chat-panel" className={`chatbot-panel ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen} aria-labelledby="luna-chat-title" inert={!isOpen}>
        <div className="chatbot-panel-inner">
          <header className="chatbot-header">
            <span className="luna-avatar" aria-hidden="true">L<span>✦</span></span>
            <div className="luna-heading"><h3 id="luna-chat-title">Luna</h3><span>Amira’s portfolio assistant</span></div>
            <div className="luna-actions">
              <button type="button" onClick={handleReset} disabled={isLoading} aria-label="Start a new chat" title="New chat">↺</button>
              <button type="button" onClick={closeChat} aria-label="Close Luna chat" title="Close chat"><CloseIcon /></button>
            </div>
          </header>

          <div className="chatbot-messages" role="log" aria-live="polite" aria-label="Chat conversation">
            <div className="chatbot-message-list">
              {messages.map((msg, index) => (
                <div key={index} className={`chat-message-row ${msg.sender === 'user' ? 'from-user' : 'from-ai'}`}>
                  <div className="chat-message">
                     <div className="chat-message-text">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {messages.length === 1 && !isLoading && (
                <div className="luna-suggestions" aria-label="Suggested questions">
                  <span>TRY ASKING</span>
                  <button type="button" onClick={() => handleSend('What projects has Amira worked on?')}>Her projects</button>
                  <button type="button" onClick={() => handleSend('What technologies does Amira use?')}>Technologies</button>
                  <button type="button" onClick={() => handleSend('Tell me about Amira’s experience.')}>Experience</button>
                </div>
              )}
              {isLoading && (
                <div className="chat-message-row from-ai">
                    <div className="chat-message">
                        <div className="chatbot-typing" aria-label="Luna is typing">
                           <span className="typing-dot" />
                           <span className="typing-dot" />
                           <span className="typing-dot" />
                        </div>
                    </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="chatbot-compose">
            <div className="chatbot-input-row">
              <input
                ref={inputRef}
                type="text"
                aria-label="Message Luna"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Luna about Amira…"
                className="chatbot-input"
                disabled={isLoading}
              />
              <button onClick={() => handleSend()} disabled={isLoading || !input.trim()} className="chatbot-send" aria-label="Send message">
                <SendIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
