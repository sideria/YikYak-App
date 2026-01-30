import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Cpu, Dumbbell, Trophy, Music, Palette, BookOpen, 
  GraduationCap, Calendar, Heart, MessageCircle, 
  Crown, Shield, Settings
} from "lucide-react";
import BottomNav from "@/components/BottomNav";

interface Board {
  id: string;
  name: string;
  icon: any;
  color: string;
  isPremium?: boolean;
  isClub?: boolean;
}

const standardBoards: Board[] = [
  { id: "tech", name: "Tech", icon: Cpu, color: "from-cyan-500/20 to-cyan-600/10" },
  { id: "gym", name: "Gym", icon: Dumbbell, color: "from-red-500/20 to-red-600/10" },
  { id: "sports", name: "Sports", icon: Trophy, color: "from-green-500/20 to-green-600/10" },
  { id: "music", name: "Music", icon: Music, color: "from-purple-500/20 to-purple-600/10" },
  { id: "fashion", name: "Fashion", icon: Palette, color: "from-pink-500/20 to-pink-600/10" },
  { id: "art", name: "Art", icon: Palette, color: "from-orange-500/20 to-orange-600/10" },
  { id: "literature", name: "Literature", icon: BookOpen, color: "from-amber-500/20 to-amber-600/10" },
  { id: "study", name: "Study", icon: GraduationCap, color: "from-blue-500/20 to-blue-600/10" },
  { id: "events", name: "Events", icon: Calendar, color: "from-indigo-500/20 to-indigo-600/10" },
  { id: "confession", name: "Confession", icon: Heart, color: "from-rose-500/20 to-rose-600/10" },
];

const premiumBoards: Board[] = [
  { id: "ieee-sb", name: "IEEE SB", icon: Crown, color: "from-amber-500/30 to-amber-600/15", isPremium: true, isClub: true },
  { id: "randomize", name: "RANDOMIZE", icon: Crown, color: "from-amber-500/30 to-amber-600/15", isPremium: true, isClub: true },
  { id: "tmc", name: "TMC", icon: Crown, color: "from-amber-500/30 to-amber-600/15", isPremium: true, isClub: true },
  { id: "tech-ideate", name: "Tech Ideate", icon: Calendar, color: "from-amber-500/30 to-amber-600/15", isPremium: true },
];

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"boards" | "premium">("boards");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 glass border-b border-white/5"
      >
        <div className="px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold gradient-text">Yik Yak</h1>
          <button 
            onClick={() => navigate("/settings")}
            className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-4 pb-4 flex gap-2">
          <TabButton
            active={activeTab === "boards"}
            onClick={() => setActiveTab("boards")}
            label="Boards"
          />
          <TabButton
            active={activeTab === "premium"}
            onClick={() => setActiveTab("premium")}
            label="Premium"
            isPremium
          />
        </div>
      </motion.header>

      {/* Content */}
      <div className="px-4 py-6">
        <AnimatePresence mode="wait">
          {activeTab === "boards" ? (
            <motion.div
              key="boards"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-2 gap-3"
            >
              {standardBoards.map((board) => (
                <BoardCard
                  key={board.id}
                  board={board}
                  variants={itemVariants}
                  onClick={() => navigate(`/board/${board.id}`)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="premium"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Premium Header */}
              <motion.div
                variants={itemVariants}
                className="glass rounded-2xl p-6 mb-6 border-amber-500/20"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/30 to-amber-600/20 flex items-center justify-center">
                    <Crown className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Premium Boards</h3>
                    <p className="text-sm text-muted-foreground">Clubs, orgs & events</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Premium boards are created by verified clubs, organizations, and event organizers. 
                  Visible to all students in range.
                </p>
              </motion.div>

              {/* Premium Boards Grid */}
              <div className="grid grid-cols-2 gap-3">
                {premiumBoards.map((board) => (
                  <BoardCard
                    key={board.id}
                    board={board}
                    variants={itemVariants}
                    onClick={() => navigate(`/board/${board.id}`)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BottomNav />
    </div>
  );
};

const TabButton = ({
  active,
  onClick,
  label,
  isPremium,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  isPremium?: boolean;
}) => (
  <motion.button
    onClick={onClick}
    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all relative overflow-hidden ${
      active
        ? isPremium
          ? "bg-gradient-to-r from-amber-500/20 to-amber-600/10 text-accent"
          : "bg-primary/20 text-primary"
        : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
    }`}
    whileTap={{ scale: 0.97 }}
  >
    <span className="relative z-10 flex items-center gap-1.5">
      {isPremium && <Crown className="w-3.5 h-3.5" />}
      {label}
    </span>
  </motion.button>
);

const BoardCard = ({
  board,
  variants,
  onClick,
}: {
  board: Board;
  variants: any;
  onClick: () => void;
}) => {
  const Icon = board.icon;
  
  return (
    <motion.button
      variants={variants}
      onClick={onClick}
      className={`glass rounded-2xl p-5 text-left group relative overflow-hidden ${
        board.isPremium ? "border-amber-500/20" : ""
      }`}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${board.color} opacity-50 group-hover:opacity-70 transition-opacity`} />
      
      <div className="relative z-10">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${board.color} flex items-center justify-center mb-3`}>
          <Icon className={`w-5 h-5 ${board.isPremium ? "text-accent" : "text-foreground"}`} />
        </div>
        <h3 className={`font-semibold ${board.isPremium ? "text-accent" : "text-foreground"}`}>
          {board.name}
        </h3>
        {board.isClub && (
          <span className="text-xs text-muted-foreground mt-1 block">Club Board</span>
        )}
      </div>
    </motion.button>
  );
};

export default Home;
