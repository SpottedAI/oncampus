import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, Bell, User, Briefcase, TrendingUp, 
  Plus, ChevronRight, Building2, Calendar, CheckCircle2,
  Clock, ExternalLink, Settings, LogOut, X, Users,
  Eye, ThumbsUp, ThumbsDown, MessageSquare
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle 
} from "../ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface Application {
  id: string;
  studentName: string;
  college: string;
  course: string;
  year: string;
  skills: string[];
  status: "applied" | "shortlisted" | "interviewing" | "on_hold" | "offer_released" | "rejected";
  appliedDate: string;
}

interface Role {
  id: string;
  title: string;
  type: string;
  universities: number;
  applications: number;
  shortlisted: number;
  interviewing: number;
  offers: number;
}

interface Activity {
  id: string;
  type: string;
  message: string;
  timestamp: string;
}

interface EmployerDashboardProps {
  companyName: string;
}

export function EmployerDashboard({ companyName }: EmployerDashboardProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const metrics = {
    activeRoles: 12,
    applications: 247,
    shortlisted: 42,
    interviews: 18
  };

  const roles: Role[] = [
    { id: "1", title: "Software Development Intern", type: "Intern", universities: 23, applications: 156, shortlisted: 28, interviewing: 12, offers: 4 },
    { id: "2", title: "Data Analyst Intern", type: "Intern", universities: 18, applications: 89, shortlisted: 14, interviewing: 6, offers: 2 },
    { id: "3", title: "Product Manager", type: "Full-time", universities: 15, applications: 67, shortlisted: 10, interviewing: 4, offers: 1 },
    { id: "4", title: "Backend Developer", type: "Full-time", universities: 20, applications: 134, shortlisted: 22, interviewing: 8, offers: 3 }
  ];

  const applications: Application[] = [
    {
      id: "1",
      studentName: "Priya Sharma",
      college: "IIT Delhi",
      course: "B.Tech CSE",
      year: "2024",
      skills: ["React", "Node.js", "Python"],
      status: "shortlisted",
      appliedDate: "2 days ago"
    },
    {
      id: "2",
      studentName: "Rahul Verma",
      college: "BITS Pilani",
      course: "B.Tech ECE",
      year: "2024",
      skills: ["Java", "Spring Boot", "MySQL"],
      status: "applied",
      appliedDate: "1 day ago"
    },
    {
      id: "3",
      studentName: "Ananya Roy",
      college: "NIT Trichy",
      course: "B.Tech IT",
      year: "2025",
      skills: ["Python", "Data Analysis", "SQL"],
      status: "interviewing",
      appliedDate: "4 days ago"
    },
    {
      id: "4",
      studentName: "Arjun Patel",
      college: "IIT Bombay",
      course: "M.Tech CS",
      year: "2024",
      skills: ["AWS", "Docker", "Kubernetes"],
      status: "offer_released",
      appliedDate: "1 week ago"
    }
  ];

  const activities: Activity[] = [
    { id: "1", type: "application", message: "Priya Sharma applied to Software Development Intern", timestamp: "2 hours ago" },
    { id: "2", type: "shortlist", message: "You shortlisted Rahul Verma for Data Analyst role", timestamp: "5 hours ago" },
    { id: "3", type: "interview", message: "Interview scheduled with Ananya Roy", timestamp: "1 day ago" },
    { id: "4", type: "offer", message: "Offer released to Arjun Patel", timestamp: "2 days ago" }
  ];

  const getStatusBadge = (status: Application["status"]) => {
    const variants: Record<Application["status"], { label: string; className: string }> = {
      applied: { label: "Applied", className: "bg-blue-500/20 text-blue-400 border border-blue-500/30" },
      shortlisted: { label: "Shortlisted", className: "bg-green-500/20 text-green-400 border border-green-500/30" },
      interviewing: { label: "Interviewing", className: "bg-orange-500/20 text-orange-400 border border-orange-500/30" },
      on_hold: { label: "On Hold", className: "bg-gray-500/20 text-gray-400 border border-gray-500/30" },
      offer_released: { label: "Offer Released", className: "bg-purple-500/20 text-purple-400 border border-purple-500/30" },
      rejected: { label: "Rejected", className: "bg-red-500/20 text-red-400 border border-red-500/30" }
    };
    return variants[status];
  };

  const handleApplicationAction = (applicationId: string, action: "shortlist" | "reject" | "interview") => {
    console.log(`Action ${action} on application ${applicationId}`);
    // In real app, this would update the application status
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Sophisticated uniform background */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40 -z-10"></div>
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#DFFF6C]/10 via-[#DFFF6C]/5 to-transparent rounded-full blur-3xl -z-10"></div>

      {/* Top Bar */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-40 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#DFFF6C] to-[#c9ea4f] flex items-center justify-center shadow-lg shadow-[#DFFF6C]/20">
                <span className="font-bold text-lg text-black">OC</span>
              </div>
              <div>
                <h1 className="font-semibold text-lg tracking-tight">{companyName}</h1>
                <p className="text-xs text-gray-500">Employer Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search candidates..."
                  className="pl-10 w-80 bg-gray-50/50 border-gray-200 focus:bg-white transition-colors"
                />
              </div>
              
              <Button variant="ghost" size="icon" className="relative hover:bg-gray-100 rounded-xl">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                  3
                </span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-xl">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                      {companyName.substring(0, 2).toUpperCase()}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <div className="p-3 border-b border-gray-100">
                    <p className="font-semibold">{companyName}</p>
                    <p className="text-sm text-gray-500">Employer Account</p>
                  </div>
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="h-4 w-4 mr-3" />
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="h-4 w-4 mr-3" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                    <LogOut className="h-4 w-4 mr-3" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-10 max-w-7xl mx-auto">
        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="flex items-center justify-between">
            <TabsList className="bg-white/80 backdrop-blur-sm border border-gray-200/50 p-1 h-auto">
              <TabsTrigger value="overview" className="px-6 py-3">
                <TrendingUp className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="roles" className="px-6 py-3">
                <Briefcase className="h-4 w-4 mr-2" />
                Roles
              </TabsTrigger>
              <TabsTrigger value="applications" className="px-6 py-3">
                <Users className="h-4 w-4 mr-2" />
                Applications
              </TabsTrigger>
            </TabsList>

            <Button
              className="bg-gradient-to-r from-[#DFFF6C] to-[#c9ea4f] hover:from-[#c9ea4f] hover:to-[#DFFF6C] text-black font-semibold shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Post New Role
            </Button>
          </div>

          <TabsContent value="overview" className="space-y-8">
            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0 }}
                whileHover={{ y: -4 }}
                className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <Briefcase className="h-8 w-8 text-gray-700" />
                  <div className="text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full">Active</div>
                </div>
                <div className="text-4xl font-bold mb-2">{metrics.activeRoles}</div>
                <div className="text-sm text-gray-600">Active Roles</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -4 }}
                className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div className="text-xs font-medium text-blue-700 bg-blue-50 px-3 py-1 rounded-full">Total</div>
                </div>
                <div className="text-4xl font-bold mb-2">{metrics.applications}</div>
                <div className="text-sm text-gray-600">Applications Received</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -4 }}
                className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                  <div className="text-xs font-medium text-green-700 bg-green-50 px-3 py-1 rounded-full">Selected</div>
                </div>
                <div className="text-4xl font-bold mb-2">{metrics.shortlisted}</div>
                <div className="text-sm text-gray-600">Students Shortlisted</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -4 }}
                className="relative bg-gradient-to-br from-orange-50/80 to-red-50/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <Calendar className="h-8 w-8 text-orange-600" />
                  <div className="text-xs font-medium text-orange-700 bg-orange-100 px-3 py-1 rounded-full">Scheduled</div>
                </div>
                <div className="text-4xl font-bold mb-2 text-orange-700">{metrics.interviews}</div>
                <div className="text-sm text-orange-700">Interviews Scheduled</div>
              </motion.div>
            </div>

            {/* Activity Feed */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-2xl font-semibold tracking-tight">Recent Activity</h2>
                <p className="text-sm text-gray-500 mt-1">Live updates from your hiring pipeline</p>
              </div>
              <ScrollArea className="h-96 p-6">
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-3 group"
                    >
                      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-[#DFFF6C]/20 to-[#DFFF6C]/10 flex items-center justify-center group-hover:from-[#DFFF6C]/30 group-hover:to-[#DFFF6C]/20 transition-colors">
                        {activity.type === "application" && <Users className="h-4 w-4 text-blue-600" />}
                        {activity.type === "shortlist" && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                        {activity.type === "interview" && <Calendar className="h-4 w-4 text-orange-600" />}
                        {activity.type === "offer" && <TrendingUp className="h-4 w-4 text-purple-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 leading-relaxed">{activity.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="roles">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-2xl font-semibold tracking-tight">Active Roles</h2>
                <p className="text-sm text-gray-500 mt-1">Manage your job postings and track applications</p>
              </div>

              <div className="divide-y divide-gray-100">
                {roles.map((role, index) => (
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 hover:bg-gray-50/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{role.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{role.type} • Visible to {role.universities} universities</p>
                      </div>
                      <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-5 gap-4 text-sm">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-500 mb-1">Applications</div>
                        <div className="font-semibold text-gray-900">{role.applications}</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-xs text-blue-600 mb-1">Shortlisted</div>
                        <div className="font-semibold text-blue-700">{role.shortlisted}</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3">
                        <div className="text-xs text-orange-600 mb-1">Interviewing</div>
                        <div className="font-semibold text-orange-700">{role.interviewing}</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-xs text-green-600 mb-1">Offers</div>
                        <div className="font-semibold text-green-700">{role.offers}</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="text-xs text-purple-600 mb-1">Universities</div>
                        <div className="font-semibold text-purple-700">{role.universities}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="applications">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight">Applications</h2>
                    <p className="text-sm text-gray-500 mt-1">Review and manage candidate applications</p>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {applications.map((application, index) => (
                  <motion.div
                    key={application.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 hover:bg-gray-50/50 transition-all duration-200 cursor-pointer group"
                    onClick={() => setSelectedApplication(application)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg shadow-md">
                          {application.studentName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 group-hover:text-black transition-colors text-lg">
                            {application.studentName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {application.college} • {application.course} • {application.year}
                          </div>
                          <div className="flex gap-2 mt-2">
                            {application.skills.slice(0, 3).map((skill, i) => (
                              <span key={i} className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-700">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-500 text-right hidden md:block">
                          Applied {application.appliedDate}
                        </div>
                        <div className={`px-3 py-1.5 rounded-lg text-sm font-medium ${getStatusBadge(application.status).className}`}>
                          {getStatusBadge(application.status).label}
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Trust Message */}
      <div className="fixed bottom-6 right-6 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-4 border border-gray-200 max-w-sm">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#DFFF6C] flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="h-6 w-6 text-black" />
          </div>
          <div>
            <p className="text-sm text-gray-700 leading-relaxed italic">
              Students are verified through partnered colleges
            </p>
          </div>
        </div>
      </div>

      {/* Application Detail Slide-in */}
      <AnimatePresence>
        {selectedApplication && (
          <Sheet open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
            <SheetContent className="w-full sm:max-w-lg overflow-y-auto bg-white/95 backdrop-blur-xl">
              <SheetHeader>
                <SheetTitle>Application Details</SheetTitle>
              </SheetHeader>
              
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-semibold shadow-lg">
                    {selectedApplication.studentName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{selectedApplication.studentName}</h3>
                    <p className="text-gray-600">{selectedApplication.college}</p>
                    <p className="text-sm text-gray-500">{selectedApplication.course} • {selectedApplication.year}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedApplication.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1.5 bg-gradient-to-r from-[#DFFF6C]/20 to-[#c9ea4f]/20 border border-[#DFFF6C]/30 rounded-lg text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Current Status</h4>
                  <div className={`inline-block px-4 py-2 rounded-lg text-sm font-medium ${getStatusBadge(selectedApplication.status).className}`}>
                    {getStatusBadge(selectedApplication.status).label}
                  </div>
                </div>

                <div className="pt-4 space-y-3 border-t border-gray-200">
                  <Button
                    onClick={() => handleApplicationAction(selectedApplication.id, "shortlist")}
                    className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold"
                  >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Shortlist
                  </Button>
                  <Button
                    onClick={() => handleApplicationAction(selectedApplication.id, "interview")}
                    className="w-full h-12 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Request Interview
                  </Button>
                  <Button
                    onClick={() => handleApplicationAction(selectedApplication.id, "reject")}
                    variant="outline"
                    className="w-full h-12 border-2 border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </AnimatePresence>
    </div>
  );
}
