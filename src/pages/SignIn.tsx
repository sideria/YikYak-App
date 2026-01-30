import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Shield, Users, Lock } from "lucide-react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.endsWith(".edu") && !email.endsWith(".ac.in")) {
      return;
    }
    setIsLoading(true);
    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      navigate("/home");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full bg-primary/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full bg-accent/5 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Logo and Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-primary/60 mb-6 glow"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <span className="text-3xl font-bold text-primary-foreground">Y</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 gradient-text">
            Yik Yak
          </h1>
          <p className="text-muted-foreground text-lg">
            Your campus. Your voice. Anonymous.
          </p>
        </motion.div>

        {/* Sign In Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="glass rounded-3xl p-8 card-shadow">
            <form onSubmit={handleSignIn} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">
                  College Email
                </label>
                <Input
                  type="email"
                  placeholder="you@college.edu.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 bg-secondary/50 border-white/5 rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 transition-all"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Only .edu or .ac.in emails accepted
                </p>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-all font-semibold text-base group"
              >
                {isLoading ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <>
                    Verify & Continue
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/5">
              <div className="grid grid-cols-3 gap-4">
                <FeatureItem icon={Shield} label="Anonymous" />
                <FeatureItem icon={Users} label="Campus Only" />
                <FeatureItem icon={Lock} label="Private" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-sm text-muted-foreground"
        >
          By continuing, you agree to our Terms & Privacy Policy
        </motion.p>
      </div>
    </div>
  );
};

const FeatureItem = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <div className="flex flex-col items-center gap-2 text-center">
    <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <span className="text-xs text-muted-foreground">{label}</span>
  </div>
);

export default SignIn;
