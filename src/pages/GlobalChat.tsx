import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import BottomNav from "@/components/BottomNav";

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
}

const mockMessages: Message[] = [
  { id: "1", content: "Anyone know when the library closes today?", timestamp: new Date(Date.now() - 1000 * 60 * 10), isOwn: false },
  { id: "2", content: "Should be 10pm, extended hours for exams", timestamp: new Date(Date.now() - 1000 * 60 * 9), isOwn: false },
  { id: "3", content: "Thanks!", timestamp: new Date(Date.now() - 1000 * 60 * 8), isOwn: false },
  { id: "4", content: "No problem, good luck with your exams", timestamp: new Date(Date.now() - 1000 * 60 * 7), isOwn: true },
  { id: "5", content: "The cafe has really good coffee today btw", timestamp: new Date(Date.now() - 1000 * 60 * 5), isOwn: false },
  { id: "6", content: "Which one? North or South campus?", timestamp: new Date(Date.now() - 1000 * 60 * 4), isOwn: false },
  { id: "7", content: "South campus, near the engineering block", timestamp: new Date(Date.now() - 1000 * 60 * 3), isOwn: false },
];

const GlobalChat = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleSend = () => {
    if (!newMessage.trim() || cooldown > 0) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage.trim(),
      timestamp: new Date(),
      isOwn: true,
    };

    setMessages([...messages, message]);
    setNewMessage("");
    setCooldown(15);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 glass border-b border-white/5"
      >
        <div className="px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold gradient-text">Global Chat</h1>
            <p className="text-xs text-muted-foreground">{messages.length} messages nearby</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </div>
      </motion.header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-32">
        <AnimatePresence>
          {messages.map((message, index) => {
            const showTime = index === 0 || 
              messages[index - 1].timestamp.getTime() < message.timestamp.getTime() - 1000 * 60 * 5;

            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              >
                {showTime && (
                  <div className="text-center my-4">
                    <span className="text-xs text-muted-foreground px-3 py-1 rounded-full bg-secondary/30">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                )}
                <div className={`flex mb-2 ${message.isOwn ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      message.isOwn
                        ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-br-md"
                        : "glass rounded-bl-md"
                    }`}
                  >
                    <p className={`text-sm leading-relaxed ${message.isOwn ? "" : "text-foreground"}`}>
                      {message.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-20 left-0 right-0 px-4 pb-4 bg-gradient-to-t from-background via-background to-transparent pt-8"
      >
        <div className="glass rounded-2xl p-2 flex items-center gap-2">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 h-12 bg-transparent border-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
            maxLength={200}
          />
          <button
            onClick={handleSend}
            disabled={!newMessage.trim() || cooldown > 0}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
              cooldown > 0
                ? "bg-muted text-muted-foreground"
                : newMessage.trim()
                ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground"
                : "bg-secondary/50 text-muted-foreground"
            }`}
          >
            {cooldown > 0 ? (
              <span className="text-xs font-medium tabular-nums">{cooldown}</span>
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
        {cooldown > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-xs text-muted-foreground mt-2"
          >
            Wait {cooldown}s before sending another message
          </motion.p>
        )}
      </motion.div>

      <BottomNav />
    </div>
  );
};

export default GlobalChat;
