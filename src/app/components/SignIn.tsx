import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface SignInProps {
  onSignIn: (data: { email: string; password: string }) => void;
  onSwitchToSignup: () => void;
}

export function SignIn({ onSignIn, onSwitchToSignup }: SignInProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn(formData);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-6 py-12">
      {/* Sophisticated uniform background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#DFFF6C]/10 via-[#DFFF6C]/5 to-transparent rounded-full blur-3xl"></div>
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-50/50 via-purple-50/30 to-transparent rounded-full blur-3xl"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#DFFF6C] to-[#c9ea4f] flex items-center justify-center shadow-2xl shadow-[#DFFF6C]/30 relative">
              <span className="font-bold text-2xl text-black">OC</span>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent"></div>
            </div>
          </motion.div>
          <h1 className="text-5xl font-bold mb-3 tracking-tight bg-gradient-to-br from-black via-gray-800 to-gray-600 bg-clip-text text-transparent">
            Welcome back
          </h1>
          <p className="text-gray-600">Sign in to your university account</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 space-y-6 border border-gray-200/50">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="placement@university.edu"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="h-12 bg-gray-50/50 border-gray-200 focus:bg-white transition-all duration-300 focus:border-[#DFFF6C]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="h-12 bg-gray-50/50 border-gray-200 focus:bg-white transition-all duration-300 focus:border-[#DFFF6C] pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-gray-600 hover:text-black transition-colors">
              Forgot password?
            </a>
          </div>

          <Button 
            type="submit" 
            className="w-full h-14 bg-gradient-to-r from-black via-gray-900 to-black hover:from-gray-900 hover:via-black hover:to-gray-900 text-white shadow-xl shadow-black/20 transition-all duration-300 group"
            size="lg"
          >
            Sign In
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/80 text-gray-500 font-medium">New to OnCampus?</span>
            </div>
          </div>

          <Button
            type="button"
            onClick={onSwitchToSignup}
            variant="outline"
            className="w-full h-12 border-2 border-gray-200 hover:border-[#DFFF6C] hover:bg-[#DFFF6C]/10 transition-all duration-300"
          >
            Create an account
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6 italic">
          OnCampus works with placement cells, not around them.
        </p>
      </motion.div>
    </div>
  );
}
