import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import { 
  FaRobot, 
  FaPaperPlane,
  FaChevronDown, 
  FaChevronUp,
  FaTimes 
} from 'react-icons/fa';
import logo from '../../assets/logo.png';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello, I'm Crypto Chatbot. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chatbot opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 300);
    }
  }, [isOpen]);

  // Simulate bot response
  const getBotResponse = (userMessage) => {
    const responses = [
      "I can help you with cryptocurrency information and market data!",
      "Would you like to know about Bitcoin, Ethereum, or other cryptocurrencies?",
      "I can assist you with price tracking, market analysis, and portfolio management.",
      "Feel free to ask me about any crypto-related questions!",
      "I'm here to help you navigate the crypto market. What would you like to know?",
      "You can ask me about coin prices, market trends, or trading strategies.",
    ];
    
    // Simple keyword-based responses
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return "You can check real-time prices on our main dashboard. Which cryptocurrency are you interested in?";
    }
    if (lowerMessage.includes('bitcoin') || lowerMessage.includes('btc')) {
      return "Bitcoin is the world's first cryptocurrency. You can track its price and performance on our platform!";
    }
    if (lowerMessage.includes('ethereum') || lowerMessage.includes('eth')) {
      return "Ethereum is a decentralized platform that runs smart contracts. Check out its current price and trends!";
    }
    if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
      return "I'm here to help! You can ask me about cryptocurrency prices, market trends, or how to use our platform.";
    }
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowTypewriter(false);
    }
  };

  return (
    <div className="chatbot-container">
      {/* Floating Button */}
      {!isOpen && (
        <button 
          className="chatbot-toggle"
          onClick={toggleChatbot}
          aria-label="Open chatbot"
        >
          <FaRobot className="chatbot-toggle-icon" />
          <div className="chatbot-pulse"></div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <FaRobot />
              </div>
              <div className="chatbot-title">
                <h4>Crypto Chatbot</h4>
                <span className="chatbot-status">Online</span>
              </div>
            </div>
            <div className="chatbot-header-actions">
              <button 
                className="chatbot-minimize"
                onClick={toggleChatbot}
                aria-label="Minimize chatbot"
              >
                <FaChevronDown />
              </button>
              <button 
                className="chatbot-close"
                onClick={toggleChatbot}
                aria-label="Close chatbot"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div 
                key={message.id}
                className={`message ${message.isBot ? 'bot-message' : 'user-message'}`}
              >
                {message.isBot && (
                  <div className="message-avatar">
                    <FaRobot />
                  </div>
                )}
                <div className="message-content">
                  <div className="message-bubble">
                    {message.isBot && index === 0 && showTypewriter ? (
                      <TypewriterText text={message.text} />
                    ) : (
                      message.text
                    )}
                  </div>
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="message bot-message">
                <div className="message-avatar">
                  <FaRobot />
                </div>
                <div className="message-content">
                  <div className="message-bubble typing-indicator">
                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form className="chatbot-input" onSubmit={handleSendMessage}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="chatbot-input-field"
            />
            <button 
              type="submit"
              className="chatbot-send-btn"
              disabled={!inputValue.trim()}
              aria-label="Send message"
            >
              <img src={logo} alt="Send" className="chatbot-send-logo" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

// Typewriter Effect Component
const TypewriterText = ({ text, speed = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return <span>{displayText}<span className="typewriter-cursor">|</span></span>;
};

export default Chatbot;