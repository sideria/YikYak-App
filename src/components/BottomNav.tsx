import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutGrid, MessageCircle, Shield } from "lucide-react";

const navItems = [
  { id: "home", path: "/home", icon: LayoutGrid, label: "Boards" },
  { id: "chat", path: "/chat", icon: MessageCircle, label: "Chat" },
  { id: "safety", path: "/safety", icon: Shield, label: "Safety" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4"
    >
      <div className="glass rounded-2xl p-2 flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.id === "home" && location.pathname.startsWith("/board"));
          const Icon = item.icon;

          return (
            <motion.button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`relative flex flex-col items-center gap-1 py-2 px-6 rounded-xl transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className="w-5 h-5 relative z-10" />
              <span className="text-xs font-medium relative z-10">{item.label}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default BottomNav;
