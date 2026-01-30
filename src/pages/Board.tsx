import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Flag, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import BottomNav from "@/components/BottomNav";

interface Post {
  id: string;
  content: string;
  timestamp: Date;
  upvotes: number;
  reports: number;
}

const boardNames: Record<string, string> = {
  tech: "Tech",
  gym: "Gym",
  sports: "Sports",
  music: "Music",
  fashion: "Fashion",
  art: "Art",
  literature: "Literature",
  study: "Study",
  events: "Events",
  confession: "Confession",
  "ieee-sb": "IEEE SB",
  randomize: "RANDOMIZE",
  tmc: "TMC",
  "tech-ideate": "Tech Ideate",
};

const mockPosts: Post[] = [
  { id: "1", content: "Just finished my first hackathon project. Feels amazing to finally ship something!", timestamp: new Date(Date.now() - 1000 * 60 * 5), upvotes: 24, reports: 0 },
  { id: "2", content: "Anyone else struggling with DSA? Looking for study partners.", timestamp: new Date(Date.now() - 1000 * 60 * 15), upvotes: 18, reports: 0 },
  { id: "3", content: "The campus wifi is actually working today. Mark this day in history.", timestamp: new Date(Date.now() - 1000 * 60 * 30), upvotes: 45, reports: 0 },
];

const Board = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [newPost, setNewPost] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const boardName = boardNames[boardId || ""] || "Board";
  const isPremium = ["ieee-sb", "randomize", "tmc", "tech-ideate"].includes(boardId || "");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handlePost = () => {
    if (!newPost.trim() || cooldown > 0) return;

    const post: Post = {
      id: Date.now().toString(),
      content: newPost.trim(),
      timestamp: new Date(),
      upvotes: 0,
      reports: 0,
    };

    setPosts([post, ...posts]);
    setNewPost("");
    setCooldown(15);
  };

  const handleUpvote = (postId: string) => {
    setPosts(posts.map(p => 
      p.id === postId ? { ...p, upvotes: p.upvotes + 1 } : p
    ));
  };

  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "now";
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 glass border-b border-white/5"
      >
        <div className="px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/home")}
            className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className={`text-xl font-bold ${isPremium ? "gradient-text-amber" : "text-foreground"}`}>
              {boardName}
            </h1>
            <p className="text-xs text-muted-foreground">{posts.length} posts nearby</p>
          </div>
        </div>
      </motion.header>

      {/* Compose */}
      <div className="px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-4"
        >
          <Textarea
            ref={textareaRef}
            placeholder="Share your thoughts anonymously..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="min-h-[80px] bg-transparent border-0 resize-none text-foreground placeholder:text-muted-foreground focus-visible:ring-0 p-0"
            maxLength={300}
          />
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
            <span className="text-xs text-muted-foreground">
              {newPost.length}/300
            </span>
            <Button
              onClick={handlePost}
              disabled={!newPost.trim() || cooldown > 0}
              size="sm"
              className={`rounded-xl px-4 ${
                cooldown > 0
                  ? "bg-muted text-muted-foreground"
                  : "bg-gradient-to-r from-primary to-primary/80"
              }`}
            >
              {cooldown > 0 ? (
                <span className="tabular-nums">{cooldown}s</span>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-1.5" />
                  Post
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Posts Feed */}
      <div className="px-4 space-y-3">
        <AnimatePresence>
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              className="glass rounded-2xl p-4"
            >
              <p className="text-foreground leading-relaxed mb-4">{post.content}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleUpvote(post.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
                  >
                    <motion.svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground group-hover:text-primary transition-colors"
                      whileTap={{ scale: 1.3 }}
                    >
                      <path d="m18 15-6-6-6 6"/>
                    </motion.svg>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors tabular-nums">
                      {post.upvotes}
                    </span>
                  </button>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(post.timestamp)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                    <Flag className="w-4 h-4 text-muted-foreground hover:text-destructive transition-colors" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <BottomNav />
    </div>
  );
};

export default Board;
