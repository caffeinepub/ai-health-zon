import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { MessageSquare, Send, X, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI Health Zon assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Healthcare services
    if (lowerMessage.includes('service') || lowerMessage.includes('what do you offer')) {
      return 'AI Health Zon offers three main verticals: Revenue Cycle Management (RCM), Healthcare Technology solutions, and a Healthcare Connecting Platform that links hospitals with professionals, vendors, ambulance services, NGOs, and more.';
    }

    // Contact information
    if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
      return 'You can reach us at:\n📞 Phone: +91-8696766966\n📧 Email: info@aihealthzon.com or support@aihealthzon.com\n💬 WhatsApp: +91-8696766966\n📍 Address: 123 Healthcare Avenue, Medical District';
    }

    // RCM services
    if (lowerMessage.includes('rcm') || lowerMessage.includes('revenue') || lowerMessage.includes('billing')) {
      return 'Our Revenue Cycle Management services include eligibility verification, medical billing & coding, claims management, denial prediction, and AR management with AI-powered dashboards.';
    }

    // Technology solutions
    if (lowerMessage.includes('technology') || lowerMessage.includes('tech') || lowerMessage.includes('software')) {
      return 'We provide AI-powered dashboards, HIS/EHR integration, NABH and licensing support, telemedicine solutions, and comprehensive data security and compliance tools.';
    }

    // Network/Directory
    if (lowerMessage.includes('network') || lowerMessage.includes('directory') || lowerMessage.includes('connect')) {
      return 'Our Healthcare Connecting Platform connects hospitals with doctors, nurses, radiologists, physiotherapists, dietitians, ambulance services, diagnostics, pharmacies, vendors, insurance partners, and NGOs.';
    }

    // Careers
    if (lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('hiring')) {
      return 'We have opportunities for healthcare professionals including doctors, nurses, radiologists, physiotherapists, dietitians, medical coders, and RCM staff. Visit our Careers page to learn more and apply.';
    }

    // Vendors
    if (lowerMessage.includes('vendor') || lowerMessage.includes('supplier')) {
      return 'Vendors can register on our platform to connect with hospitals and healthcare organizations. We offer lead generation, hospital partnerships, and market visibility. Visit our Vendors page to register.';
    }

    // Ambulance
    if (lowerMessage.includes('ambulance') || lowerMessage.includes('emergency')) {
      return 'We connect ambulance service providers with hospitals and patients. If you provide ambulance services, you can register on our platform. For emergency services, please call +91-8696766966.';
    }

    // NGOs
    if (lowerMessage.includes('ngo') || lowerMessage.includes('non-profit') || lowerMessage.includes('charity')) {
      return 'NGOs can join our platform to expand their community reach, coordinate programs, manage volunteers, and track impact. Visit our NGO Listing page to register your organization.';
    }

    // Pricing
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('fee')) {
      return 'Our pricing varies based on the services you need. Please contact us at +91-8696766966 or info@aihealthzon.com for a customized quote and demo.';
    }

    // Demo
    if (lowerMessage.includes('demo') || lowerMessage.includes('trial')) {
      return 'We\'d be happy to provide a demo! Please fill out the contact form on our Contact page or call us at +91-8696766966 to schedule a personalized demonstration.';
    }

    // Hours
    if (lowerMessage.includes('hours') || lowerMessage.includes('time') || lowerMessage.includes('open')) {
      return 'Our support team is available Monday to Friday, 9:00 AM - 6:00 PM. For urgent inquiries, please call +91-8696766966 or message us on WhatsApp.';
    }

    // Greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return 'Hello! Welcome to AI Health Zon. How can I assist you today? You can ask me about our services, contact information, careers, or anything else related to our healthcare platform.';
    }

    // Thanks
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return 'You\'re welcome! Is there anything else I can help you with today?';
    }

    // Default response
    return 'Thank you for your question! For detailed information, please contact our team at +91-8696766966 or info@aihealthzon.com. You can also explore our website to learn more about our services.';
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:scale-110 transition-transform"
        aria-label="Open chatbot"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]">
      <Card className="shadow-2xl">
        <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <CardTitle className="text-lg">AI Health Zon Assistant</CardTitle>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                onClick={() => setIsOpen(false)}
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-96 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground rounded-lg px-4 py-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon" disabled={!inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
