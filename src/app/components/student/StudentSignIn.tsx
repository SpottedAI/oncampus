import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Building2 } from "lucide-react";
import { Button } from "../ui/button";

interface StudentSignInProps {
  onSignIn: (data: { email: string; password: string; college: string }) => void;
  onSwitchToSignup: () => void;
}

// Partner colleges list
const partnerColleges = [
  "Indian Institute of Technology (IIT) Delhi",
  "Indian Institute of Technology (IIT) Bombay",
  "Indian Institute of Technology (IIT) Madras",
  "Indian Institute of Technology (IIT) Kanpur",
  "Indian Institute of Technology (IIT) Kharagpur",
  "Birla Institute of Technology and Science (BITS) Pilani",
  "National Institute of Technology (NIT) Trichy",
  "National Institute of Technology (NIT) Warangal",
  "National Institute of Technology (NIT) Surathkal",
  "Delhi Technological University (DTU)",
  "Netaji Subhas University of Technology (NSUT)",
  "Vellore Institute of Technology (VIT)",
  "Manipal Institute of Technology",
  "PSG College of Technology",
  "College of Engineering Pune (COEP)"
];

export function StudentSignIn({ onSignIn, onSwitchToSignup }: StudentSignInProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [college, setCollege] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && college) {
      onSignIn({ email, password, college });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B1F3B] via-[#252A45] to-[#1B1F3B] flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#DFFF6C]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <img 
              src="/spottedAiLogo.svg" 
              alt="OnCampus Logo" 
              className="h-10 w-auto object-contain invert transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(223,255,108,0.8)] cursor-pointer" 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
        </div>

        {/* Sign In Card */}
        <div className="bg-[#252A45] rounded-3xl shadow-2xl border border-white/10 p-8">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold text-white">Welcome back</h1>
              <p className="text-gray-400">Sign in to your student account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="college" className="text-sm font-medium text-gray-300">
                  Select Your College
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    id="college"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-[#1F2437] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#DFFF6C] transition-colors"
                  >
                    <option value="" disabled>Choose your college...</option>
                    {partnerColleges.map((collegeName, index) => (
                      <option key={index} value={collegeName}>{collegeName}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your.email@college.edu"
                  className="w-full px-4 py-3 bg-[#1F2437] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#DFFF6C] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-[#1F2437] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#DFFF6C] transition-colors"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#DFFF6C] to-[#c9ea4f] hover:from-[#c9ea4f] hover:to-[#DFFF6C] text-black font-semibold py-6 text-base shadow-lg shadow-[#DFFF6C]/20"
              >
                Sign In
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>

            <div className="text-center pt-4 border-t border-white/10">
              <p className="text-gray-400 text-sm">
                Don't have an account?{" "}
                <button
                  onClick={onSwitchToSignup}
                  className="text-[#DFFF6C] font-semibold hover:underline"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          By signing in, you agree to our Terms and Privacy Policy
        </p>
      </motion.div>
    </div>
  );
}
