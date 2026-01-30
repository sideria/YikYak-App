import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Bell, Lock, HelpCircle, LogOut, 
  ChevronRight, User, Palette, MessageSquare
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import BottomNav from "@/components/BottomNav";

const Settings = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
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
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Settings</h1>
        </div>
      </motion.header>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 py-6 space-y-6"
      >
        {/* Profile Section */}
        <motion.section variants={itemVariants}>
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                <User className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Anonymous User</h3>
                <p className="text-sm text-muted-foreground">Verified Student</p>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                Active
              </div>
            </div>
          </div>
        </motion.section>

        {/* Preferences */}
        <motion.section variants={itemVariants}>
          <h2 className="text-sm font-medium text-muted-foreground mb-3 px-1">Preferences</h2>
          <div className="glass rounded-2xl overflow-hidden divide-y divide-white/5">
            <SettingToggle
              icon={Bell}
              label="Push Notifications"
              description="Get notified about nearby activity"
              defaultChecked={true}
            />
            <SettingToggle
              icon={MessageSquare}
              label="Chat Sounds"
              description="Play sound for new messages"
              defaultChecked={false}
            />
            <SettingItem
              icon={Palette}
              label="Appearance"
              description="Theme and display options"
              onClick={() => {}}
            />
          </div>
        </motion.section>

        {/* Privacy */}
        <motion.section variants={itemVariants}>
          <h2 className="text-sm font-medium text-muted-foreground mb-3 px-1">Privacy & Security</h2>
          <div className="glass rounded-2xl overflow-hidden divide-y divide-white/5">
            <SettingItem
              icon={Lock}
              label="Privacy Settings"
              description="Manage your data and visibility"
              onClick={() => {}}
            />
            <SettingItem
              icon={HelpCircle}
              label="Help & Support"
              description="FAQs and contact information"
              onClick={() => {}}
            />
          </div>
        </motion.section>

        {/* Sign Out */}
        <motion.section variants={itemVariants}>
          <button
            onClick={() => navigate("/")}
            className="w-full glass rounded-2xl p-4 flex items-center gap-4 hover:bg-destructive/10 transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center group-hover:bg-destructive/20 transition-colors">
              <LogOut className="w-5 h-5 text-destructive" />
            </div>
            <span className="font-medium text-destructive">Sign Out</span>
          </button>
        </motion.section>

        {/* App Info */}
        <motion.div
          variants={itemVariants}
          className="text-center pt-4"
        >
          <p className="text-xs text-muted-foreground">Yik Yak v1.0.0</p>
          <p className="text-xs text-muted-foreground/50 mt-1">Made for campus communities</p>
        </motion.div>
      </motion.div>

      <BottomNav />
    </div>
  );
};

const SettingItem = ({
  icon: Icon,
  label,
  description,
  onClick,
}: {
  icon: any;
  label: string;
  description: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="w-full p-4 flex items-center gap-4 hover:bg-secondary/30 transition-colors"
  >
    <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center">
      <Icon className="w-5 h-5 text-muted-foreground" />
    </div>
    <div className="flex-1 text-left">
      <h3 className="font-medium text-foreground">{label}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
    <ChevronRight className="w-5 h-5 text-muted-foreground" />
  </button>
);

const SettingToggle = ({
  icon: Icon,
  label,
  description,
  defaultChecked,
}: {
  icon: any;
  label: string;
  description: string;
  defaultChecked: boolean;
}) => (
  <div className="p-4 flex items-center gap-4">
    <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center">
      <Icon className="w-5 h-5 text-muted-foreground" />
    </div>
    <div className="flex-1">
      <h3 className="font-medium text-foreground">{label}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
    <Switch defaultChecked={defaultChecked} />
  </div>
);

export default Settings;
