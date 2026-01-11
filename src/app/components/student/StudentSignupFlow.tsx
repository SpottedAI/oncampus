import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, User, Mail, Building2, Upload } from "lucide-react";
import { Button } from "../ui/button";

interface StudentSignupFlowProps {
  onComplete: (data: {
    name: string;
    email: string;
    college: string;
    course: string;
    year: string;
    skills: string[];
    resume: string;
  }) => void;
  onSwitchToSignIn: () => void;
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

const popularSkills = [
  "Python", "Java", "JavaScript", "React", "Node.js", "SQL", "MongoDB",
  "Machine Learning", "Data Analysis", "AWS", "Docker", "Git",
  "C++", "HTML/CSS", "TypeScript", "Angular", "Vue.js"
];

export function StudentSignupFlow({ onComplete, onSwitchToSignIn }: StudentSignupFlowProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    college: "",
    course: "",
    year: "",
    skills: [] as string[],
    resume: ""
  });

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  const isStep1Valid = formData.name && formData.email && formData.password;
  const isStep2Valid = formData.college && formData.course && formData.year;
  const isStep3Valid = formData.skills.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B1F3B] via-[#252A45] to-[#1B1F3B] flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#DFFF6C]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl relative z-10"
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

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  step >= num
                    ? "bg-[#DFFF6C] text-black"
                    : "bg-[#252A45] text-gray-500 border border-white/10"
                }`}
              >
                {num}
              </div>
              {num < 3 && (
                <div
                  className={`w-16 h-1 rounded-full transition-all ${
                    step > num ? "bg-[#DFFF6C]" : "bg-[#252A45]"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Signup Card */}
        <div className="bg-[#252A45] rounded-3xl shadow-2xl border border-white/10 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2 text-center">
                  <h2 className="text-3xl font-bold text-white">Create your profile</h2>
                  <p className="text-gray-400">Let's start with the basics</p>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder="Enter your full name"
                        className="w-full pl-12 pr-4 py-3 bg-[#1F2437] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#DFFF6C] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">
                      College Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="your.email@college.edu"
                        className="w-full pl-12 pr-4 py-3 bg-[#1F2437] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#DFFF6C] transition-colors"
                      />
                    </div>
                    <p className="text-xs text-gray-500">Your profile is visible only to verified employers</p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-300">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      placeholder="Create a strong password"
                      className="w-full px-4 py-3 bg-[#1F2437] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#DFFF6C] transition-colors"
                    />
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!isStep1Valid}
                  className="w-full bg-gradient-to-r from-[#DFFF6C] to-[#c9ea4f] hover:from-[#c9ea4f] hover:to-[#DFFF6C] text-black font-semibold py-6 text-base shadow-lg shadow-[#DFFF6C]/20 disabled:opacity-50"
                >
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            )}

            {/* Step 2: Academic Info */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2 text-center">
                  <h2 className="text-3xl font-bold text-white">Academic details</h2>
                  <p className="text-gray-400">Tell us about your education</p>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="college" className="text-sm font-medium text-gray-300">
                      Select Your College
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        id="college"
                        value={formData.college}
                        onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-[#1F2437] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#DFFF6C] transition-colors appearance-none"
                      >
                        <option value="" disabled>Choose your college...</option>
                        {partnerColleges.map((collegeName, index) => (
                          <option key={index} value={collegeName}>{collegeName}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="course" className="text-sm font-medium text-gray-300">
                      Course / Program
                    </label>
                    <select
                      id="course"
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-[#1F2437] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#DFFF6C] transition-colors"
                    >
                      <option value="" disabled>Select your course...</option>
                      <option value="B.Tech Computer Science">B.Tech Computer Science</option>
                      <option value="B.Tech Electronics">B.Tech Electronics</option>
                      <option value="B.Tech Mechanical">B.Tech Mechanical</option>
                      <option value="B.Tech Civil">B.Tech Civil</option>
                      <option value="BBA">BBA</option>
                      <option value="B.Com">B.Com</option>
                      <option value="B.Sc">B.Sc</option>
                      <option value="MBA">MBA</option>
                      <option value="MCA">MCA</option>
                      <option value="M.Tech">M.Tech</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="year" className="text-sm font-medium text-gray-300">
                      Year of Study
                    </label>
                    <select
                      id="year"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-[#1F2437] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#DFFF6C] transition-colors"
                    >
                      <option value="" disabled>Select year...</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year / Final Year</option>
                      <option value="Recent Graduate">Recent Graduate</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    onClick={handleBack}
                    variant="outline"
                    className="flex-1 border-white/20 text-white hover:bg-white/10"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={!isStep2Valid}
                    className="flex-1 bg-gradient-to-r from-[#DFFF6C] to-[#c9ea4f] hover:from-[#c9ea4f] hover:to-[#DFFF6C] text-black font-semibold disabled:opacity-50"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Skills & Resume */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2 text-center">
                  <h2 className="text-3xl font-bold text-white">Skills & Resume</h2>
                  <p className="text-gray-400">Help employers find you</p>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Select Your Skills
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {popularSkills.map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => handleSkillToggle(skill)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            formData.skills.includes(skill)
                              ? "bg-[#DFFF6C] text-black"
                              : "bg-[#1F2437] text-gray-400 border border-white/10 hover:border-[#DFFF6C]/50"
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">Select at least 3 skills</p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="resume" className="text-sm font-medium text-gray-300">
                      Upload Resume (Optional)
                    </label>
                    <div className="relative">
                      <Upload className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="resume"
                        type="text"
                        value={formData.resume}
                        onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
                        placeholder="Resume filename or link"
                        className="w-full pl-12 pr-4 py-3 bg-[#1F2437] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#DFFF6C] transition-colors"
                      />
                    </div>
                    <p className="text-xs text-gray-500">You can upload this later from your dashboard</p>
                  </div>
                </div>

                <div className="bg-[#1F2437] border border-[#DFFF6C]/20 rounded-xl p-4">
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold text-[#DFFF6C]">You're ready to apply!</span>
                    <br />
                    Your profile will be visible only to verified employers.
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    onClick={handleBack}
                    variant="outline"
                    className="flex-1 border-white/20 text-white hover:bg-white/10"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={!isStep3Valid}
                    className="flex-1 bg-gradient-to-r from-[#DFFF6C] to-[#c9ea4f] hover:from-[#c9ea4f] hover:to-[#DFFF6C] text-black font-semibold disabled:opacity-50"
                  >
                    Complete Profile
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <div className="text-center pt-4 border-t border-white/10">
                <p className="text-gray-400 text-sm">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={onSwitchToSignIn}
                    className="text-[#DFFF6C] font-semibold hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            )}
          </form>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          By signing up, you agree to our Terms and Privacy Policy
        </p>
      </motion.div>
    </div>
  );
}
