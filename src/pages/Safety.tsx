import { motion } from "framer-motion";
import { Shield, Phone, Heart, AlertTriangle, ExternalLink, Info } from "lucide-react";
import BottomNav from "@/components/BottomNav";

interface HelplineCard {
  id: string;
  title: string;
  description: string;
  number: string;
  icon: any;
  color: string;
  available: string;
}

const helplines: HelplineCard[] = [
  {
    id: "cybercrime",
    title: "Cybercrime Helpline",
    description: "Report online harassment, threats, and cyber fraud",
    number: "1930",
    icon: Shield,
    color: "from-cyan-500/20 to-cyan-600/10",
    available: "24/7",
  },
  {
    id: "women",
    title: "Women Safety",
    description: "Emergency assistance for women in distress",
    number: "181 / 1091",
    icon: Heart,
    color: "from-rose-500/20 to-rose-600/10",
    available: "24/7",
  },
  {
    id: "mental",
    title: "Mental Health - Kiran",
    description: "Free mental health counseling and support",
    number: "1800-599-0019",
    icon: Heart,
    color: "from-purple-500/20 to-purple-600/10",
    available: "24/7 Toll-Free",
  },
  {
    id: "emergency",
    title: "Emergency Services",
    description: "Police, ambulance, and fire services",
    number: "112",
    icon: AlertTriangle,
    color: "from-red-500/20 to-red-600/10",
    available: "24/7",
  },
];

const reportCategories = [
  { id: "harassment", label: "Harassment", description: "Repeated unwanted contact or bullying" },
  { id: "hate", label: "Hate Speech", description: "Content targeting groups based on identity" },
  { id: "threat", label: "Threats", description: "Statements indicating intent to harm" },
  { id: "misinfo", label: "Misinformation", description: "False or misleading content" },
];

const Safety = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleCall = (number: string) => {
    const cleanNumber = number.replace(/\s/g, "").split("/")[0];
    window.open(`tel:${cleanNumber}`, "_self");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 glass border-b border-white/5"
      >
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold gradient-text">Safety Center</h1>
          <p className="text-xs text-muted-foreground">Resources and support when you need it</p>
        </div>
      </motion.header>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 py-6 space-y-6"
      >
        {/* Emergency Banner */}
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden rounded-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10" />
          <div className="relative glass rounded-2xl p-5 border-red-500/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/30 to-red-600/20 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">In immediate danger?</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  If you or someone else is in immediate danger, please contact emergency services.
                </p>
                <button
                  onClick={() => handleCall("112")}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors text-sm font-medium"
                >
                  <Phone className="w-4 h-4" />
                  Call 112
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Helplines Section */}
        <motion.section variants={itemVariants}>
          <div className="flex items-center gap-2 mb-4">
            <Phone className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Helplines</h2>
          </div>
          <div className="space-y-3">
            {helplines.map((helpline) => (
              <HelplineItem key={helpline.id} helpline={helpline} onCall={handleCall} />
            ))}
          </div>
        </motion.section>

        {/* Reporting Guide */}
        <motion.section variants={itemVariants}>
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Content Reporting</h2>
          </div>
          <div className="glass rounded-2xl p-5">
            <p className="text-sm text-muted-foreground mb-4">
              Posts can be flagged by the community. Multiple reports from different users 
              trigger a review. Categories include:
            </p>
            <div className="grid grid-cols-2 gap-3">
              {reportCategories.map((category) => (
                <div
                  key={category.id}
                  className="p-3 rounded-xl bg-secondary/30 border border-white/5"
                >
                  <h4 className="font-medium text-foreground text-sm mb-1">{category.label}</h4>
                  <p className="text-xs text-muted-foreground">{category.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Safety Tips */}
        <motion.section variants={itemVariants}>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Stay Safe</h2>
          </div>
          <div className="glass rounded-2xl p-5 space-y-4">
            <SafetyTip
              title="Protect your identity"
              description="Never share personal details like your name, room number, or class schedule in posts."
            />
            <SafetyTip
              title="Report concerning content"
              description="Use the flag icon on posts to report harassment, threats, or harmful content."
            />
            <SafetyTip
              title="Trust your instincts"
              description="If something feels wrong, reach out to campus security or use the helplines above."
            />
            <SafetyTip
              title="Take breaks"
              description="Social media can be overwhelming. It's okay to step away when you need to."
            />
          </div>
        </motion.section>
      </motion.div>

      <BottomNav />
    </div>
  );
};

const HelplineItem = ({
  helpline,
  onCall,
}: {
  helpline: HelplineCard;
  onCall: (number: string) => void;
}) => {
  const Icon = helpline.icon;

  return (
    <motion.div
      className="glass rounded-2xl p-4 group"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${helpline.color} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-5 h-5 text-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground">{helpline.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-1">{helpline.description}</p>
          <span className="text-xs text-primary/70">{helpline.available}</span>
        </div>
        <button
          onClick={() => onCall(helpline.number)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors"
        >
          <Phone className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">{helpline.number}</span>
        </button>
      </div>
    </motion.div>
  );
};

const SafetyTip = ({ title, description }: { title: string; description: string }) => (
  <div className="flex gap-3">
    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
    <div>
      <h4 className="font-medium text-foreground text-sm mb-0.5">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default Safety;
