import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, CheckCircle2, Users, Building2, Clock, TrendingUp, Sparkles, Shield, Target, Zap } from "lucide-react";
import { Button } from "../ui/button";

interface EmployerLandingPageProps {
  onPostJob: () => void;
  onRequestDemo: () => void;
}

export function EmployerLandingPage({ onPostJob, onRequestDemo }: EmployerLandingPageProps) {
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DFFF6C] to-[#c9ea4f] flex items-center justify-center shadow-lg shadow-[#DFFF6C]/20">
              <span className="font-bold text-lg text-black">OC</span>
            </div>
            <span className="font-semibold text-xl tracking-tight text-white">OnCampus</span>
            <span className="text-sm text-gray-400 ml-2">for Employers</span>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={onRequestDemo}
              className="text-white hover:bg-white/10"
            >
              Request a Demo
            </Button>
            <Button 
              onClick={onPostJob} 
              className="bg-[#DFFF6C] hover:bg-[#c9ea4f] text-black font-semibold shadow-lg shadow-[#DFFF6C]/20"
            >
              Post a Job for Free
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Dark Background */}
      <section className="pt-40 pb-32 px-6 relative overflow-hidden">
        {/* Subtle glows */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[#DFFF6C]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-10"
            >
              <div className="space-y-6">
                <h1 className="text-7xl font-bold leading-[1.1] tracking-tight text-white">
                  Hire college talent —{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10">without the noise.</span>
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="absolute bottom-2 left-0 h-3 bg-[#DFFF6C] -z-10"
                    ></motion.span>
                  </span>
                </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
                  Access students from top institutions across India. Post roles, review applications, and hire — all in one place.
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#DFFF6C] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-300">Verified students from partnered colleges</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#DFFF6C] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-300">Top institutions across India</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#DFFF6C] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-300">No resume spam, only relevant candidates</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#DFFF6C] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-300">Post jobs for free, hire faster</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <Button 
                  onClick={onPostJob}
                  size="lg"
                  className="bg-[#DFFF6C] hover:bg-[#c9ea4f] text-black px-10 h-14 text-base font-semibold shadow-xl shadow-[#DFFF6C]/30 hover:shadow-2xl hover:shadow-[#DFFF6C]/40 transition-all duration-300"
                >
                  Post a Job for Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  onClick={onRequestDemo}
                  size="lg"
                  variant="outline"
                  className="px-10 h-14 text-base border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/30"
                >
                  Request a Demo
                </Button>
              </div>
            </motion.div>

            {/* Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="bg-[#252A45] rounded-2xl shadow-2xl p-6 border border-white/10 backdrop-blur-sm"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#DFFF6C] flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-white">Hiring Dashboard</div>
                        <div className="text-xs text-gray-400">Real-time updates</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                      className="bg-[#2A2F4A] rounded-xl p-4 border border-white/5"
                    >
                      <div className="text-xs font-medium text-gray-400 mb-2">Active Roles</div>
                      <div className="text-3xl font-bold text-white mb-1">12</div>
                      <div className="flex items-center gap-1 text-xs text-[#DFFF6C]">
                        <TrendingUp className="w-3 h-3" />
                        <span>3 new this week</span>
                      </div>
                    </motion.div>
                    <motion.div
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                      className="bg-[#2A2F4A] rounded-xl p-4 border border-white/5"
                    >
                      <div className="text-xs font-medium text-gray-400 mb-2">Applications</div>
                      <div className="text-3xl font-bold text-white mb-1">247</div>
                      <div className="flex items-center gap-1 text-xs text-blue-400">
                        <Users className="w-3 h-3" />
                        <span>42 shortlisted</span>
                      </div>
                    </motion.div>
                  </div>

                  <div className="bg-[#2A2F4A] rounded-xl p-4 border border-white/5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-sm text-white">Recent Applications</span>
                      <span className="text-xs bg-[#DFFF6C] px-2 py-1 rounded-full font-medium text-black">Live</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { name: "Priya S.", college: "IIT Delhi", role: "SDE Intern", status: "Applied", color: "from-blue-400 to-blue-600" },
                        { name: "Rahul V.", college: "BITS Pilani", role: "Data Analyst", status: "Shortlisted", color: "from-green-400 to-green-600" },
                        { name: "Ananya R.", college: "NIT Trichy", role: "Product Intern", status: "Interviewing", color: "from-orange-400 to-orange-600" }
                      ].map((app, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1 + i * 0.2 }}
                          className="flex items-center gap-3 text-sm bg-[#1F2437] rounded-lg p-3 border border-white/5"
                        >
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${app.color} flex-shrink-0`}></div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-white truncate">{app.name}</div>
                            <div className="text-xs text-gray-400 truncate">{app.college} • {app.role}</div>
                          </div>
                          <div className="text-xs px-2 py-1 rounded-md bg-white/5 text-gray-300">
                            {app.status}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section - Still Dark */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-16"
          >
            <h2 className="text-5xl font-bold tracking-tight text-white">
              This is not a job board.<br />This is a hiring system.
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              See applications, track progress, and hire faster — all in one clean interface.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#252A45] rounded-3xl shadow-2xl border border-white/10 overflow-hidden"
          >
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-6 pb-6 border-b border-white/10">
                <div className="flex-1">
                  <div className="text-sm text-gray-400 mb-1">Role</div>
                  <div className="text-xl font-semibold text-white">Software Development Intern</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Universities</div>
                  <div className="text-xl font-semibold text-white">23 colleges</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Applications</div>
                  <div className="text-xl font-semibold text-white">156</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Shortlisted</div>
                  <div className="text-xl font-semibold text-[#DFFF6C]">28</div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { name: "Priya Sharma", college: "IIT Delhi", course: "B.Tech CSE • 2024", status: "Shortlisted", tagColor: "bg-green-500/20 text-green-400" },
                  { name: "Rahul Verma", college: "BITS Pilani", course: "B.Tech ECE • 2024", status: "Applied", tagColor: "bg-blue-500/20 text-blue-400" },
                  { name: "Ananya Roy", college: "NIT Trichy", course: "B.Tech IT • 2025", status: "Interviewing", tagColor: "bg-orange-500/20 text-orange-400" }
                ].map((student, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-[#2A2F4A] rounded-xl p-5 border border-white/5 hover:border-[#DFFF6C]/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{student.name}</div>
                          <div className="text-sm text-gray-400">{student.college} • {student.course}</div>
                        </div>
                      </div>
                      <div className={`px-3 py-1.5 rounded-lg text-sm font-medium ${student.tagColor}`}>
                        {student.status}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Transition Point - Background starts becoming white */}
      
      {/* Social Proof - White Background */}
      <section className="py-32 px-6" style={{ opacity: scrollProgress > 0.3 ? 1 : 0.5 }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-5xl font-bold tracking-tight mb-6"
            style={{ color: scrollProgress > 0.4 ? "#000" : "#fff" }}
          >
            100+ companies use OnCampus to find their next generation of talent.
          </motion.h2>
        </div>
      </section>

      {/* Value Section - White Background */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold tracking-tight mb-4" style={{ color: scrollProgress > 0.4 ? "#000" : "#fff" }}>
              Everything you need to hire top campus talent
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Verified Students",
                description: "Students are linked to real colleges and universities",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Building2,
                title: "Top Institutions",
                description: "Access talent from leading colleges across India",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Target,
                title: "Limited, Relevant Applications",
                description: "No resume dumps, only serious candidates",
                gradient: "from-orange-500 to-red-500"
              },
              {
                icon: Zap,
                title: "Faster Hiring",
                description: "Clear shortlists, faster interviews, better outcomes",
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
                <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
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
              Start hiring from campuses<br />that matter.
            </h2>

            <div className="flex items-center justify-center gap-4 pt-6">
              <Button 
                onClick={onPostJob}
                size="lg"
                className="bg-gradient-to-r from-[#DFFF6C] to-[#c9ea4f] hover:from-[#c9ea4f] hover:to-[#DFFF6C] text-black px-12 h-16 text-lg font-semibold shadow-2xl shadow-[#DFFF6C]/20 hover:shadow-[#DFFF6C]/40 transition-all duration-300"
              >
                Post a Job for Free
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
              <Button 
                onClick={onRequestDemo}
                size="lg"
                variant="outline"
                className="px-12 h-16 text-lg border-2 border-black text-black hover:bg-black hover:text-white font-semibold transition-all duration-300"
              >
                Request a Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-16 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DFFF6C] to-[#c9ea4f] flex items-center justify-center">
                <span className="font-bold text-lg text-black">OC</span>
              </div>
              <span className="font-semibold text-xl">OnCampus</span>
            </div>
            <p className="text-sm text-gray-600 italic">A clean, trusted lane to hire serious campus talent.</p>
            <p className="text-sm text-gray-500">© 2026 OnCampus. Quality hiring, not resume dumps.</p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}