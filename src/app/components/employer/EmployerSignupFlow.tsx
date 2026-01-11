import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Plus, X, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface EmployerSignupFlowProps {
  onComplete: (data: {
    companyName: string;
    email: string;
    role: string;
    jobPosted: boolean;
  }) => void;
}

export function EmployerSignupFlow({ onComplete }: EmployerSignupFlowProps) {
  const [step, setStep] = useState<"signup" | "postjob">("signup");
  const [signupData, setSignupData] = useState({
    companyName: "",
    email: "",
    role: ""
  });
  const [jobData, setJobData] = useState({
    title: "",
    type: "intern",
    skills: [] as string[],
    courses: [] as string[],
    years: [] as string[],
    startDate: ""
  });
  const [skillInput, setSkillInput] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("postjob");
  };

  const handleJobPost = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      ...signupData,
      jobPosted: true
    });
  };

  const handleSkipJobPost = () => {
    onComplete({
      ...signupData,
      jobPosted: false
    });
  };

  const addSkill = () => {
    if (skillInput.trim() && !jobData.skills.includes(skillInput.trim())) {
      setJobData({ ...jobData, skills: [...jobData.skills, skillInput.trim()] });
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setJobData({ ...jobData, skills: jobData.skills.filter(s => s !== skill) });
  };

  const toggleCourse = (course: string) => {
    setJobData({
      ...jobData,
      courses: jobData.courses.includes(course)
        ? jobData.courses.filter(c => c !== course)
        : [...jobData.courses, course]
    });
  };

  const toggleYear = (year: string) => {
    setJobData({
      ...jobData,
      years: jobData.years.includes(year)
        ? jobData.years.filter(y => y !== year)
        : [...jobData.years, year]
    });
  };

  if (step === "signup") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1B1F3B] via-[#252A45] to-[#1B1F3B] flex items-center justify-center px-6 py-12 relative overflow-hidden">
        {/* Subtle glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#DFFF6C]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        
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
            <h1 className="text-4xl font-bold mb-3 tracking-tight text-white">Create your account</h1>
            <p className="text-gray-300">Start hiring campus talent in minutes</p>
          </div>

          <form onSubmit={handleSignup} className="bg-[#252A45]/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 space-y-6 border border-white/10">
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-white">Company Name</Label>
              <Input
                id="companyName"
                type="text"
                placeholder="Acme Corp"
                value={signupData.companyName}
                onChange={(e) => setSignupData({ ...signupData, companyName: e.target.value })}
                required
                className="h-12 bg-[#1B1F3B]/50 border-white/20 text-white placeholder:text-gray-500 focus:bg-[#1B1F3B] focus:border-[#DFFF6C] transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Work Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="hiring@company.com"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                required
                className="h-12 bg-[#1B1F3B]/50 border-white/20 text-white placeholder:text-gray-500 focus:bg-[#1B1F3B] focus:border-[#DFFF6C] transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-white">Your Role</Label>
              <Select value={signupData.role} onValueChange={(value) => setSignupData({ ...signupData, role: value })}>
                <SelectTrigger className="h-12 bg-[#1B1F3B]/50 border-white/20 text-white focus:bg-[#1B1F3B] focus:border-[#DFFF6C]">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="founder">Founder</SelectItem>
                  <SelectItem value="hr">HR Manager</SelectItem>
                  <SelectItem value="recruiter">Recruiter</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 bg-gradient-to-r from-[#DFFF6C] to-[#c9ea4f] hover:from-[#c9ea4f] hover:to-[#DFFF6C] text-black font-semibold shadow-xl shadow-[#DFFF6C]/30 transition-all duration-300"
              size="lg"
            >
              Continue
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <p className="text-xs text-center text-gray-400 pt-2">
              No friction. <span className="font-semibold text-white">Instant access.</span>
            </p>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6 italic">
            Students are verified through partnered colleges
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B1F3B] via-[#252A45] to-[#1B1F3B] flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Subtle glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#DFFF6C]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl relative z-10"
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
          <h1 className="text-4xl font-bold mb-3 tracking-tight text-white">Post your first role</h1>
          <p className="text-gray-300">Keep it simple. We'll match you with the right candidates.</p>
        </div>

        <form onSubmit={handleJobPost} className="bg-[#252A45]/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 space-y-6 border border-white/10">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">Role Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Software Development Intern"
              value={jobData.title}
              onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
              required
              className="h-12 bg-[#1B1F3B]/50 border-white/20 text-white placeholder:text-gray-500 focus:bg-[#1B1F3B] focus:border-[#DFFF6C] transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Type</Label>
            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => setJobData({ ...jobData, type: "intern" })}
                className={`flex-1 h-12 ${
                  jobData.type === "intern"
                    ? "bg-[#DFFF6C] text-black hover:bg-[#c9ea4f]"
                    : "bg-[#1B1F3B]/50 text-white border border-white/20 hover:bg-[#1B1F3B]"
                }`}
              >
                Intern
              </Button>
              <Button
                type="button"
                onClick={() => setJobData({ ...jobData, type: "fulltime" })}
                className={`flex-1 h-12 ${
                  jobData.type === "fulltime"
                    ? "bg-[#DFFF6C] text-black hover:bg-[#c9ea4f]"
                    : "bg-[#1B1F3B]/50 text-white border border-white/20 hover:bg-[#1B1F3B]"
                }`}
              >
                Full-time
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Skills Required</Label>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Add a skill..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                className="h-12 bg-[#1B1F3B]/50 border-white/20 text-white placeholder:text-gray-500 focus:bg-[#1B1F3B] focus:border-[#DFFF6C] transition-all"
              />
              <Button
                type="button"
                onClick={addSkill}
                className="h-12 px-6 bg-[#1B1F3B]/50 border border-white/20 text-white hover:bg-[#DFFF6C] hover:text-black hover:border-[#DFFF6C]"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            {jobData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {jobData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#DFFF6C] text-black rounded-lg text-sm font-medium"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="hover:bg-black/10 rounded-full p-0.5 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-white">Eligible Courses</Label>
            <div className="flex flex-wrap gap-2">
              {["B.Tech", "M.Tech", "MBA", "MCA", "BCA"].map((course) => (
                <button
                  key={course}
                  type="button"
                  onClick={() => toggleCourse(course)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    jobData.courses.includes(course)
                      ? "bg-[#DFFF6C] text-black"
                      : "bg-[#1B1F3B]/50 text-white border border-white/20 hover:bg-[#1B1F3B]"
                  }`}
                >
                  {course}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Graduation Years</Label>
            <div className="flex flex-wrap gap-2">
              {["2024", "2025", "2026"].map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={() => toggleYear(year)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    jobData.years.includes(year)
                      ? "bg-[#DFFF6C] text-black"
                      : "bg-[#1B1F3B]/50 text-white border border-white/20 hover:bg-[#1B1F3B]"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate" className="text-white">Start Date (Optional)</Label>
            <Input
              id="startDate"
              type="text"
              placeholder="e.g., June 2024"
              value={jobData.startDate}
              onChange={(e) => setJobData({ ...jobData, startDate: e.target.value })}
              className="h-12 bg-[#1B1F3B]/50 border-white/20 text-white placeholder:text-gray-500 focus:bg-[#1B1F3B] focus:border-[#DFFF6C] transition-all"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              className="flex-1 h-14 bg-gradient-to-r from-[#DFFF6C] to-[#c9ea4f] hover:from-[#c9ea4f] hover:to-[#DFFF6C] text-black font-semibold shadow-xl shadow-[#DFFF6C]/30 transition-all duration-300"
              size="lg"
            >
              Post Job
              <CheckCircle2 className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              type="button"
              onClick={handleSkipJobPost}
              variant="outline"
              className="h-14 px-6 border-2 border-white/20 text-white hover:bg-white/10"
              size="lg"
            >
              Skip for now
            </Button>
          </div>

          <p className="text-xs text-center text-gray-400 pt-2">
            Universities stay informed to reduce dropouts
          </p>
        </form>
      </motion.div>
    </div>
  );
}
