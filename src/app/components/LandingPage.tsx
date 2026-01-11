import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { motion as motionOriginal, useScroll, useTransform } from "motion/react";
import { ArrowRight, CheckCircle2, Users, Briefcase, Eye, Handshake, Sparkles, TrendingUp, Zap, Building2 } from "lucide-react";
import { Button } from "./ui/button";

interface LandingPageProps {
  onGetStarted: () => void;
  onBookDemo: () => void;
  onEmployers: () => void;
}

export function LandingPage({ onGetStarted, onBookDemo, onEmployers }: LandingPageProps) {
  const { scrollYProgress } = useScroll();
  
  // Background color transition - subtle change for university side
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5],
    ["rgb(238, 242, 255)", "rgb(249, 250, 251)", "#FFFFFF"]
  );

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setScrollProgress(latest);
    });
  }, [scrollYProgress]);

  return (
    <motionOriginal.div 
      style={{ backgroundColor }}
      className="min-h-screen relative overflow-hidden transition-colors duration-700"
    >
      {/* Sophisticated layered background */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMDMsIDkwLCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50 -z-10"></div>
      
      {/* Animated gradient orbs */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#DFFF6C]/15 via-yellow-200/10 to-transparent rounded-full blur-3xl animate-pulse -z-10" style={{ animationDuration: '8s' }}></div>
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-purple-200/20 via-blue-200/15 to-transparent rounded-full blur-3xl animate-pulse -z-10" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-pink-200/10 to-transparent rounded-full blur-3xl animate-pulse -z-10" style={{ animationDuration: '12s', animationDelay: '4s' }}></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DFFF6C] to-[#c9ea4f] flex items-center justify-center shadow-lg shadow-[#DFFF6C]/20">
              <span className="font-bold text-lg text-black">OC</span>
            </div>
            <span className="font-semibold text-xl tracking-tight">OnCampus</span>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={onEmployers}
              className="hover:bg-gray-100"
            >
              For Employers
            </Button>
            <Button 
              variant="ghost" 
              onClick={onBookDemo}
              className="hover:bg-gray-100"
            >
              Book a Demo
            </Button>
            <Button 
              onClick={onGetStarted} 
              className="bg-black hover:bg-gray-900 shadow-lg shadow-black/10"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Sophisticated Layout */}
      <section className="pt-40 pb-32 px-6 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#DFFF6C]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-50/50 to-transparent rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-10"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#DFFF6C]/20 to-[#DFFF6C]/10 border border-[#DFFF6C]/30"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">Placement Success Platform</span>
                </motion.div>
                
                <h1 className="text-7xl font-bold leading-[1.1] tracking-tight">
                  Get your students{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10">hired.</span>
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                      className="absolute bottom-2 left-0 h-4 bg-[#DFFF6C] -z-10"
                    ></motion.span>
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                  Bring your students in front of more verified employers — and increase placements beyond your usual campus drives.
                </p>
                
                <p className="text-lg text-gray-500 italic font-light max-w-lg">
                  Because opportunities shouldn't depend on how many companies a college can bring.
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <Button 
                  onClick={onGetStarted}
                  size="lg"
                  className="bg-black hover:bg-gray-900 text-white px-10 h-14 text-base shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  onClick={onBookDemo}
                  size="lg"
                  variant="outline"
                  className="px-10 h-14 text-base border-2 border-gray-300 hover:border-gray-900 hover:bg-gray-50"
                >
                  Book a Demo
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-8 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-3xl font-bold">847+</div>
                  <div className="text-sm text-gray-500">Students Placed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">120+</div>
                  <div className="text-sm text-gray-500">Companies</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">95%</div>
                  <div className="text-sm text-gray-500">Success Rate</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200/50 backdrop-blur-sm"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DFFF6C] to-[#c9ea4f] flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">Placement Dashboard</div>
                        <div className="text-xs text-gray-500">Real-time insights</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                      className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-5 shadow-sm border border-blue-100/50"
                    >
                      <div className="text-xs font-medium text-gray-600 mb-2">Students Onboarded</div>
                      <div className="text-4xl font-bold mb-1">847</div>
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <TrendingUp className="w-3 h-3" />
                        <span>+23% this month</span>
                      </div>
                    </motion.div>
                    <motion.div
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                      className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-5 shadow-sm border border-purple-100/50"
                    >
                      <div className="text-xs font-medium text-gray-600 mb-2">Active Offers</div>
                      <div className="text-4xl font-bold mb-1">89</div>
                      <div className="flex items-center gap-1 text-xs text-blue-600">
                        <Zap className="w-3 h-3" />
                        <span>156 interviewing</span>
                      </div>
                    </motion.div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 shadow-sm border border-gray-100/50">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-semibold text-sm">Recent Placements</span>
                      <span className="text-xs bg-gradient-to-r from-[#DFFF6C] to-[#c9ea4f] px-3 py-1 rounded-full font-medium">Live</span>
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: "Priya Sharma", company: "TechCorp", role: "SDE Intern", color: "from-blue-400 to-blue-600" },
                        { name: "Rahul Verma", company: "Innovate Labs", role: "Data Analyst", color: "from-purple-400 to-purple-600" },
                        { name: "Ananya Roy", company: "CloudSys", role: "Product Manager", color: "from-pink-400 to-pink-600" }
                      ].map((offer, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1 + i * 0.2 }}
                          className="flex items-center gap-3 text-sm"
                        >
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${offer.color} flex-shrink-0 shadow-md`}></div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm truncate">{offer.name}</div>
                            <div className="text-xs text-gray-500 truncate">{offer.company} • {offer.role}</div>
                          </div>
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold">New Offer!</div>
                    <div className="text-xs text-gray-500">Just now</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Validation - Unique Card Layout */}
      <section className="py-32 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-16"
          >
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-bold tracking-tight">You already know the problem.</h2>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                The challenges you face every placement season
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { text: "Not enough companies visit campus", icon: Briefcase, gradient: "from-red-50 to-red-100/50", iconColor: "text-red-600" },
                { text: "Some capable students remain unplaced", icon: Users, gradient: "from-orange-50 to-orange-100/50", iconColor: "text-orange-600" },
                { text: "Placement pressure increases every year", icon: TrendingUp, gradient: "from-amber-50 to-amber-100/50", iconColor: "text-amber-600" },
                { text: "College reach limits opportunities", icon: Zap, gradient: "from-yellow-50 to-yellow-100/50", iconColor: "text-yellow-700" }
              ].map((problem, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className={`relative bg-gradient-to-br ${problem.gradient} p-8 rounded-3xl border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center ${problem.iconColor} flex-shrink-0`}>
                      <problem.icon className="w-6 h-6" />
                    </div>
                    <p className="text-lg font-medium text-gray-800 leading-relaxed pt-2">{problem.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center pt-8"
            >
              <p className="text-2xl font-medium text-gray-700 italic">
                You're not failing your students.{" "}
                <span className="text-gray-900 font-semibold">The system is failing you.</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why OnCampus Exists - Centered Elegant Layout */}
      <section className="py-32 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-12"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="inline-block"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#DFFF6C] to-[#c9ea4f] flex items-center justify-center shadow-2xl shadow-[#DFFF6C]/20 mx-auto mb-8">
                  <Sparkles className="w-10 h-10 text-black" />
                </div>
              </motion.div>
              
              <h2 className="text-5xl font-bold tracking-tight">Why OnCampus exists</h2>
            </div>
            
            <div className="space-y-8 text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-2xl"
              >
                Most colleges simply cannot bring enough companies for all students.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-2xl text-white font-medium"
              >
                OnCampus exists to bring more companies to your students, so more of them get interviews and offers.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="pt-8"
            >
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#DFFF6C] to-transparent mx-auto"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What OnCampus Does - Premium Card Grid */}
      <section className="py-32 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold tracking-tight mb-4">What OnCampus does</h2>
            <p className="text-xl text-gray-500">Simple, powerful, effective</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: "More Employers",
                description: "Students are visible to companies hiring through OnCampus.",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Briefcase,
                title: "More Opportunities",
                description: "Students get interviews beyond limited campus drives.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Eye,
                title: "College Visibility",
                description: "You see applications, interviews, and offers clearly.",
                gradient: "from-orange-500 to-red-500"
              },
              {
                icon: Handshake,
                title: "Works With You",
                description: "OnCampus supports your placement process — it does not replace it.",
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
                
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Interactive Timeline */}
      <section className="py-32 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full">
          <div className="absolute left-1/2 top-20 bottom-20 w-px bg-gradient-to-b from-transparent via-[#DFFF6C] to-transparent opacity-30"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20 space-y-4"
          >
            <h2 className="text-5xl font-bold tracking-tight">Start in minutes</h2>
            <p className="text-xl text-gray-500">Simple setup, powerful results</p>
          </motion.div>
          
          <div className="space-y-20">
            {[
              { 
                step: "01", 
                title: "Create university account", 
                description: "Simple signup with your official email. No approval walls, instant access to your dashboard.",
                icon: Users,
                position: "left"
              },
              { 
                step: "02", 
                title: "Invite students", 
                description: "Upload student emails via CSV or share a custom invite link. Students join instantly.",
                icon: Users,
                position: "right"
              },
              { 
                step: "03", 
                title: "Students create profiles", 
                description: "They build comprehensive profiles with their skills, projects, and preferences.",
                icon: Sparkles,
                position: "left"
              },
              { 
                step: "04", 
                title: "Employers post jobs & interview", 
                description: "Verified companies connect directly with your students for interviews and assessments.",
                icon: Briefcase,
                position: "right"
              },
              { 
                step: "05", 
                title: "Offers are tracked", 
                description: "See all outcomes in real-time. Track applications, interviews, and placements effortlessly.",
                icon: CheckCircle2,
                position: "left"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: item.position === "left" ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className={`flex items-center gap-12 ${item.position === "right" ? "flex-row-reverse" : ""}`}
              >
                <div className={`flex-1 ${item.position === "right" ? "text-right" : ""}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="inline-block bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className={`flex items-start gap-6 ${item.position === "right" ? "flex-row-reverse text-right" : ""}`}>
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#DFFF6C] to-[#c9ea4f] flex items-center justify-center shadow-lg flex-shrink-0">
                        <item.icon className="w-8 h-8 text-black" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-400 mb-2">STEP {item.step}</div>
                        <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                <div className="flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-br from-[#DFFF6C] to-[#c9ea4f] shadow-lg shadow-[#DFFF6C]/30 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#DFFF6C] to-[#c9ea4f] animate-ping opacity-75"></div>
                </div>
                
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-lg text-gray-600 pt-20 font-medium"
          >
            No long onboarding. No system overhaul. <span className="text-black">Just results.</span>
          </motion.p>
        </div>
      </section>

      {/* Final CTA - Bold and Simple */}
      <section className="py-32 px-6 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#DFFF6C]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-6xl font-bold leading-tight">
              Help more students<br />get placed.
            </h2>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join leading universities already using OnCampus to transform their placement outcomes.
            </p>

            <div className="flex items-center justify-center gap-4 pt-6">
              <Button 
                onClick={onGetStarted}
                size="lg"
                className="bg-gradient-to-r from-[#DFFF6C] to-[#c9ea4f] hover:from-[#c9ea4f] hover:to-[#DFFF6C] text-black px-12 h-16 text-lg font-semibold shadow-2xl shadow-[#DFFF6C]/20 hover:shadow-[#DFFF6C]/40 transition-all duration-300"
              >
                Get Started
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
              <Button 
                onClick={onBookDemo}
                size="lg"
                variant="outline"
                className="px-12 h-16 text-lg border-2 border-white text-white hover:bg-white hover:text-black font-semibold transition-all duration-300"
              >
                Book a Demo
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
            <p className="text-sm text-gray-600 italic">OnCampus works with placement cells, not around them.</p>
            <p className="text-sm text-gray-500">© 2026 OnCampus. Increasing opportunities, not false promises.</p>
          </div>
        </div>
      </footer>
    </motionOriginal.div>
  );
}