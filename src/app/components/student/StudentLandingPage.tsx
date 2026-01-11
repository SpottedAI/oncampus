import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, CheckCircle2, Users, Briefcase, Eye, TrendingUp, Sparkles, Shield, Building2 } from "lucide-react";
import { Button } from "../ui/button";

interface StudentLandingPageProps {
  onJoin: () => void;
}

export function StudentLandingPage({ onJoin }: StudentLandingPageProps) {
  const { scrollYProgress } = useScroll();
  
  // Background color transition from dark navy to white
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5],
    ["#1B1F3B", "#2A2F4F", "#FFFFFF"]
  );

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setScrollProgress(latest);
    });
  }, [scrollYProgress]);

  return (
    <motion.div 
      style={{ backgroundColor }}
      className="min-h-screen transition-colors duration-700"
    >
      {/* Navigation - Always visible */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1B1F3B]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DFFF6C] to-[#c9ea4f] flex items-center justify-center shadow-lg shadow-[#DFFF6C]/20">
              <span className="font-bold text-lg text-black">OC</span>
            </div>
            <span className="font-semibold text-xl tracking-tight text-white">OnCampus</span> */}
            <img 
              src="/spottedAiLogo.svg" 
              alt="OnCampus Logo" 
              className="h-10 w-auto object-contain invert transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(223,255,108,0.8)] cursor-pointer" 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
            <span className="text-sm text-gray-400 ml-2">for Students</span>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              onClick={onJoin} 
              className="bg-[#DFFF6C] hover:bg-[#c9ea4f] text-black font-semibold shadow-lg shadow-[#DFFF6C]/20 hover:cursor-pointer"
            >
              Join SpottedAI
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Dark Background */}
      <section className="pt-40 pb-32 px-6 relative overflow-hidden">
        {/* Subtle glows */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[#DFFF6C]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center space-y-10"
          >
            <div className="space-y-6">
              <h1 className="text-7xl font-bold leading-[1.1] tracking-tight text-white">
                Get hired{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">from college.</span>
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute bottom-2 left-0 h-3 bg-[#DFFF6C] -z-10"
                  ></motion.span>
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Get access to real job opportunities from companies hiring students across top colleges in India.
              </p>

              <p className="text-lg text-gray-400 italic max-w-2xl mx-auto">
                No spam. No fake jobs. Only real opportunities.
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 pt-4">
              <Button 
                onClick={onJoin}
                size="lg"
                className="bg-[#DFFF6C] hover:bg-[#c9ea4f] text-black px-12 h-14 text-base font-semibold shadow-xl shadow-[#DFFF6C]/30 hover:shadow-2xl hover:shadow-[#DFFF6C]/40 transition-all duration-300 hover:cursor-pointer"
              >
                Join SpottedAI
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-12 pt-12 border-t border-white/10 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">2,500+</div>
                <div className="text-sm text-gray-400 mt-1">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white">120+</div>
                <div className="text-sm text-gray-400 mt-1">Hiring Companies</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white">50+</div>
                <div className="text-sm text-gray-400 mt-1">Partner Colleges</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section - Still Dark */}
      <section className="py-32 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-16"
          >
            <h2 className="text-5xl font-bold tracking-tight text-white">
              How SpottedAI helps you get hired
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Simple, fair, and designed to give you real opportunities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                number: "01",
                title: "Join through your college",
                description: "Connect using your college email or invitation link",
                icon: Users
              },
              {
                number: "02",
                title: "Complete your profile",
                description: "Add your skills, projects, and upload your resume",
                icon: Sparkles
              },
              {
                number: "03",
                title: "Apply to relevant roles",
                description: "Browse and apply to jobs from verified companies",
                icon: Briefcase
              },
              {
                number: "04",
                title: "Track your progress",
                description: "Monitor applications, interviews, and offers in one place",
                icon: Eye
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-[#252A45] rounded-2xl p-6 border border-white/10 hover:border-[#DFFF6C]/30 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#DFFF6C] flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-black" />
                  </div>
                  <div className="text-sm font-semibold text-[#DFFF6C]">STEP {step.number}</div>
                  <h3 className="text-xl font-bold text-white">{step.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-lg text-gray-400 pt-12 italic"
          >
            Your college stays in the loop. You stay in control.
          </motion.p>
        </div>
      </section>

      {/* Why Different Section - Transition to White */}
      <section className="py-32 px-6" style={{ opacity: scrollProgress > 0.3 ? 1 : 0.8 }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-16"
          >
            <h2 
              className="text-5xl font-bold tracking-tight"
              style={{ color: scrollProgress > 0.4 ? "#000" : "#fff" }}
            >
              Why students use SpottedAI
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Building2,
                title: "Real Companies",
                description: "Employers here are actively hiring students",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Shield,
                title: "Fair Exposure",
                description: "You are seen based on eligibility, not luck",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: CheckCircle2,
                title: "No Resume Spam",
                description: "Limited, relevant applications only",
                gradient: "from-orange-500 to-red-500"
              },
              {
                icon: TrendingUp,
                title: "Clear Progress",
                description: "Know where you stand at every stage",
                gradient: "from-green-500 to-emerald-500"
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-black">{card.title}</h3>
                <p className="text-gray-600 leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section - White Background */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-6xl font-bold leading-tight text-black">
              Your college placements,<br />done right.
            </h2>

            <div className="flex items-center justify-center gap-4 pt-6">
              <Button 
                onClick={onJoin}
                size="lg"
                className="bg-gradient-to-r from-[#DFFF6C] to-[#c9ea4f] hover:from-[#c9ea4f] hover:to-[#DFFF6C] text-black px-12 h-16 text-lg font-semibold shadow-2xl shadow-[#DFFF6C]/20 hover:shadow-[#DFFF6C]/40 transition-all duration-300 hover:cursor-pointer"
              >
                Join SpottedAI
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 pt-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>No spam</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>No fake jobs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Only real opportunities</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-16 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-6">
            <img src="/spottedAiLogo.svg" alt="OnCampus Logo" className="h-10 w-auto object-contain " />
            </div>
            <p className="text-sm text-gray-600 italic">This helps you get hired.</p>
            <p className="text-sm text-gray-500">© 2026 SpottedAI. Fair opportunities, real chances.</p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}