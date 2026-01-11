import { useState } from "react";
import { motion } from "motion/react";
import { 
  Bell, User, LogOut, Briefcase, FileText, Calendar, 
  TrendingUp, CheckCircle2, Clock, MapPin, Building2, 
  Filter, Search, ArrowRight, AlertCircle, Award
} from "lucide-react";
import { Button } from "../ui/button";

interface StudentDashboardProps {
  studentName: string;
  collegeName: string;
}

type PlacementStatus = "Ready" | "Applied" | "Interviewing" | "Offer Received" | "Placed";
type ApplicationStatus = "Applied" | "Shortlisted" | "Interviewing" | "Offer Received" | "Rejected";

export function StudentDashboard({ studentName, collegeName }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState<"opportunities" | "applications" | "interviews">("opportunities");
  const [placementStatus] = useState<PlacementStatus>("Interviewing");
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock data
  const opportunities = [
    {
      id: 1,
      company: "TechCorp Solutions",
      role: "Software Development Intern",
      location: "Bangalore",
      type: "Internship",
      eligibility: "Eligible",
      postedDate: "2 days ago",
      applicants: 45
    },
    {
      id: 2,
      company: "DataMinds Analytics",
      role: "Data Analyst Intern",
      location: "Mumbai",
      type: "Internship",
      eligibility: "Eligible",
      postedDate: "5 days ago",
      applicants: 32
    },
    {
      id: 3,
      company: "CloudTech Inc",
      role: "Backend Developer",
      location: "Remote",
      type: "Full-time",
      eligibility: "Eligible",
      postedDate: "1 week ago",
      applicants: 67
    },
    {
      id: 4,
      company: "InnovateLabs",
      role: "Product Management Intern",
      location: "Pune",
      type: "Internship",
      eligibility: "Eligible",
      postedDate: "3 days ago",
      applicants: 28
    }
  ];

  const applications = [
    {
      id: 1,
      company: "TechCorp Solutions",
      role: "Software Development Intern",
      appliedDate: "5 days ago",
      status: "Interviewing" as ApplicationStatus,
      nextStep: "Technical Interview on Jan 15"
    },
    {
      id: 2,
      company: "StartupHub",
      role: "Full Stack Developer",
      appliedDate: "1 week ago",
      status: "Shortlisted" as ApplicationStatus,
      nextStep: "Awaiting interview schedule"
    },
    {
      id: 3,
      company: "FinTech Pro",
      role: "Software Engineer Intern",
      appliedDate: "2 weeks ago",
      status: "Applied" as ApplicationStatus,
      nextStep: "Under review"
    }
  ];

  const interviews = [
    {
      id: 1,
      company: "TechCorp Solutions",
      role: "Software Development Intern",
      date: "Jan 15, 2026",
      time: "10:00 AM",
      mode: "Online",
      round: "Technical Round"
    },
    {
      id: 2,
      company: "StartupHub",
      role: "Full Stack Developer",
      date: "Jan 18, 2026",
      time: "2:00 PM",
      mode: "Offline",
      round: "HR Round"
    }
  ];

  const activities = [
    { text: "New opportunity: Frontend Developer at WebCraft", time: "2 hours ago" },
    { text: "Interview scheduled with TechCorp Solutions", time: "1 day ago" },
    { text: "Application shortlisted for StartupHub", time: "2 days ago" },
    { text: "New opportunity: Data Scientist at AI Innovators", time: "3 days ago" }
  ];

  const getStatusColor = (status: PlacementStatus) => {
    switch (status) {
      case "Ready": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Applied": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "Interviewing": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Offer Received": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Placed": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    }
  };

  const getApplicationStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case "Applied": return "bg-blue-500/20 text-blue-400";
      case "Shortlisted": return "bg-purple-500/20 text-purple-400";
      case "Interviewing": return "bg-orange-500/20 text-orange-400";
      case "Offer Received": return "bg-green-500/20 text-green-400";
      case "Rejected": return "bg-red-500/20 text-red-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/spottedAiLogo.svg" alt="SpottedAI Logo" className="h-10 w-auto object-contain cursor-pointer" />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              >
                <Bell className="w-5 h-5 text-gray-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {activities.map((activity, i) => (
                      <div key={i} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <p className="text-sm text-gray-700">{activity.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-xl">
              <User className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">{studentName}</span>
            </div>

            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <LogOut className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Welcome back, {studentName.split(' ')[0]}!</h1>
            <p className="text-gray-600">{collegeName}</p>
          </div>

          {/* Placement Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border border-gray-200 p-8"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-500 font-medium">Your Placement Status</p>
                <div className="flex items-center gap-3">
                  <span className={`px-6 py-3 rounded-full text-lg font-semibold border-2 ${getStatusColor(placementStatus)}`}>
                    {placementStatus}
                  </span>
                </div>
                <p className="text-sm text-gray-600 italic">Your college is informed of all updates</p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{applications.length}</div>
                  <div className="text-sm text-gray-500 mt-1">Applications</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{interviews.length}</div>
                  <div className="text-sm text-gray-500 mt-1">Interviews</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">0</div>
                  <div className="text-sm text-gray-500 mt-1">Offers</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex items-center gap-2 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("opportunities")}
              className={`px-6 py-3 font-medium transition-colors relative ${
                activeTab === "opportunities"
                  ? "text-black"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Opportunities
              {activeTab === "opportunities" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#DFFF6C]"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("applications")}
              className={`px-6 py-3 font-medium transition-colors relative ${
                activeTab === "applications"
                  ? "text-black"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              My Applications
              {activeTab === "applications" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#DFFF6C]"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("interviews")}
              className={`px-6 py-3 font-medium transition-colors relative ${
                activeTab === "interviews"
                  ? "text-black"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Interviews & Offers
              {activeTab === "interviews" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#DFFF6C]"
                />
              )}
            </button>
          </div>

          {/* Opportunities Tab */}
          {activeTab === "opportunities" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Filters */}
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search opportunities..."
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#DFFF6C] transition-colors"
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
              </div>

              {/* Opportunities List */}
              <div className="grid gap-4">
                {opportunities.map((opp) => (
                  <motion.div
                    key={opp.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                            <Building2 className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900">{opp.role}</h3>
                            <p className="text-gray-600 mt-1">{opp.company}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{opp.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            <span>{opp.type}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{opp.postedDate}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1.5 bg-green-500/10 text-green-600 rounded-lg text-sm font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            {opp.eligibility}
                          </span>
                          <span className="text-sm text-gray-500">{opp.applicants} applications</span>
                        </div>
                      </div>

                      <Button className="bg-gradient-to-r from-[#DFFF6C] to-[#c9ea4f] hover:from-[#c9ea4f] hover:to-[#DFFF6C] text-black font-semibold">
                        Apply Now
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Applications Tab */}
          {activeTab === "applications" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {applications.map((app) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-md p-6 border border-gray-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900">{app.role}</h3>
                          <p className="text-gray-600 mt-1">{app.company}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className={`px-4 py-1.5 rounded-lg text-sm font-medium ${getApplicationStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                        <span className="text-sm text-gray-500">Applied {app.appliedDate}</span>
                      </div>

                      <div className="flex items-start gap-2 bg-blue-50 rounded-lg p-3">
                        <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-900">
                          <span className="font-medium">Next Step:</span> {app.nextStep}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {applications.length === 0 && (
                <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No applications yet</p>
                  <p className="text-sm text-gray-500 mt-2">Start applying to opportunities to see them here</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Interviews Tab */}
          {activeTab === "interviews" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {interviews.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Upcoming Interviews</h3>
                  {interviews.map((interview) => (
                    <motion.div
                      key={interview.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl shadow-md p-6 border border-gray-200"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900">{interview.role}</h3>
                          <p className="text-gray-600 mt-1">{interview.company}</p>
                          
                          <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <span>{interview.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span>{interview.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span>{interview.mode}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Award className="w-4 h-4" />
                              <span>{interview.round}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {interviews.length === 0 && (
                <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No interviews scheduled</p>
                  <p className="text-sm text-gray-500 mt-2">Interviews will appear here once scheduled</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-md p-6 border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {activities.map((activity, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                  <div className="w-2 h-2 rounded-full bg-[#DFFF6C] mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{activity.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
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
    </div>
  );
}
