import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Upload, Link2, Share2, CheckCircle2, Sparkles, Users, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SignupFlowProps {
  onComplete: (universityData: {
    name: string;
    email: string;
    universityName: string;
    designation: string;
  }) => void;
  onSwitchToSignIn: () => void;
}

export function SignupFlow({ onComplete, onSwitchToSignIn }: SignupFlowProps) {
  const [step, setStep] = useState<"signup" | "invite">("signup");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    universityName: "",
    designation: ""
  });
  const [inviteLink] = useState("https://oncampus.app/join/iit-delhi-2026");
  const [studentsJoined, setStudentsJoined] = useState(0);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("invite");
    // Simulate students joining
    const interval = setInterval(() => {
      setStudentsJoined(prev => {
        const newCount = prev + Math.floor(Math.random() * 3);
        if (newCount >= 50) {
          clearInterval(interval);
          return 50;
        }
        return newCount;
      });
    }, 2000);
  };

  const handleComplete = () => {
    onComplete(formData);
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
  };

  if (step === "signup") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center px-6 py-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#DFFF6C]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-50/50 to-transparent rounded-full blur-3xl"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#DFFF6C] to-[#c9ea4f] flex items-center justify-center shadow-xl shadow-[#DFFF6C]/20">
                <span className="font-bold text-2xl text-black">OC</span>
              </div>
            </motion.div>
            <h1 className="text-4xl font-bold mb-3 tracking-tight">Welcome to OnCampus</h1>
            <p className="text-gray-600">Create your university account to get started</p>
          </div>

          <form onSubmit={handleSignup} className="bg-white rounded-3xl shadow-2xl p-8 space-y-6 border border-gray-100">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Dr. Rajesh Kumar"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Official Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="placement@university.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="university">University Name</Label>
              <Input
                id="university"
                type="text"
                placeholder="Indian Institute of Technology, Delhi"
                value={formData.universityName}
                onChange={(e) => setFormData({ ...formData, universityName: e.target.value })}
                required
                className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Select
                id="designation"
                value={formData.designation}
                onValueChange={(value) => setFormData({ ...formData, designation: value })}
                required
                className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
              >
                <SelectTrigger className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors">
                  <SelectValue placeholder="Select your designation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Placement Officer">Placement Officer</SelectItem>
                  <SelectItem value="Dean of Students">Dean of Students</SelectItem>
                  <SelectItem value="Professor">Professor</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              className="w-full h-13 bg-gradient-to-r from-black to-gray-800 hover:from-gray-900 hover:to-black text-white shadow-xl shadow-black/20 transition-all duration-300"
              size="lg"
            >
              Create Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <p className="text-xs text-center text-gray-500 pt-2">
              No approval wall. No waiting. <span className="font-semibold text-black">Instant access.</span>
            </p>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">Already have an account?</span>
            </div>
          </div>

          <Button
            type="button"
            onClick={onSwitchToSignIn}
            variant="outline"
            className="w-full h-12 border-2 border-gray-200 hover:border-[#DFFF6C] hover:bg-[#DFFF6C]/10 transition-all duration-300"
          >
            Sign In
          </Button>

          <p className="text-center text-sm text-gray-500 mt-6 italic">
            OnCampus works with placement cells, not around them.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#DFFF6C]/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-50/50 to-transparent rounded-full blur-3xl"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#DFFF6C] to-[#c9ea4f] flex items-center justify-center shadow-xl shadow-[#DFFF6C]/20">
              <span className="font-bold text-2xl text-black">OC</span>
            </div>
          </motion.div>
          <h1 className="text-4xl font-bold mb-3 tracking-tight">Invite your students</h1>
          <p className="text-gray-600">Students receive a link to create their profile and join OnCampus.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-8 border border-gray-100">
          {/* Upload CSV */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold">Upload student emails (CSV)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center hover:border-[#DFFF6C] hover:bg-[#DFFF6C]/5 transition-all duration-300 cursor-pointer group">
              <Upload className="w-14 h-14 mx-auto mb-4 text-gray-400 group-hover:text-[#DFFF6C] transition-colors" />
              <p className="font-medium mb-2 text-gray-700 group-hover:text-black transition-colors">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500">CSV file with student emails</p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">or</span>
            </div>
          </div>

          {/* Copy Invite Link */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold">Copy invite link</Label>
            <div className="flex gap-2">
              <Input
                value={inviteLink}
                readOnly
                className="h-12 bg-gray-50 border-gray-200 font-mono text-sm"
              />
              <Button
                onClick={copyInviteLink}
                variant="outline"
                className="h-12 px-6 hover:bg-[#DFFF6C] hover:border-[#DFFF6C] hover:text-black transition-all"
              >
                <Link2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Share Options */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold">Share via</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-12 justify-start gap-3 hover:bg-[#DFFF6C] hover:border-[#DFFF6C] hover:text-black transition-all">
                <Share2 className="h-5 w-5" />
                WhatsApp
              </Button>
              <Button variant="outline" className="h-12 justify-start gap-3 hover:bg-[#DFFF6C] hover:border-[#DFFF6C] hover:text-black transition-all">
                <Share2 className="h-5 w-5" />
                Email
              </Button>
            </div>
          </div>

          {/* Live Count */}
          <div className="bg-gradient-to-br from-[#DFFF6C]/20 via-[#DFFF6C]/10 to-transparent rounded-2xl p-6 border-2 border-[#DFFF6C]/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#DFFF6C] to-[#c9ea4f] flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-7 h-7 text-black" />
                </div>
                <div>
                  <div className="font-semibold text-lg">Students Joined</div>
                  <div className="text-sm text-gray-600">Live count updates automatically</div>
                </div>
              </div>
              <motion.div
                key={studentsJoined}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-6xl font-bold bg-gradient-to-br from-black to-gray-700 bg-clip-text text-transparent"
              >
                {studentsJoined}
              </motion.div>
            </div>
          </div>

          <Button 
            onClick={handleComplete}
            className="w-full h-14 bg-gradient-to-r from-black to-gray-800 hover:from-gray-900 hover:to-black text-white shadow-xl shadow-black/20 transition-all duration-300"
            size="lg"
          >
            Go to Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-gray-500">
            Students can join anytime. You can always invite more later.
          </p>
        </div>
      </motion.div>
    </div>
  );
}