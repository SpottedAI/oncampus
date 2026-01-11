import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, Bell, User, Users, Briefcase, TrendingUp, 
  Plus, ChevronRight, Building2, Calendar, CheckCircle2,
  Clock, Mail, ExternalLink, Settings, LogOut, MessageSquare,
  Share2, BarChart3, ThumbsUp, MessageCircle, Eye
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle 
} from "./ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { CommunityPostModal } from "./CommunityPostModal";

interface Student {
  id: string;
  name: string;
  course: string;
  year: string;
  status: "not_applied" | "applied" | "interviewing" | "offer_received" | "placed";
  appliedJobs: number;
  interviewsScheduled: number;
  offers: number;
}

interface Job {
  id: string;
  company: string;
  role: string;
  eligibleStudents: number;
  applications: number;
  interviewing: number;
  offers: number;
}

interface Activity {
  id: string;
  type: string;
  message: string;
  timestamp: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "offer" | "interview" | "application" | "system";
}

interface CommunityPost {
  id: string;
  author: string;
  type: "message" | "poll";
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  pollOptions?: { option: string; votes: number }[];
}

interface UniversityDashboardProps {
  universityName: string;
  userName: string;
}

export function UniversityDashboard({ universityName, userName }: UniversityDashboardProps) {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showAddOfflineDialog, setShowAddOfflineDialog] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: "1", title: "New Offer Received", message: "Priya Sharma received offer from TechCorp", time: "2 hours ago", read: false, type: "offer" },
    { id: "2", title: "Interview Scheduled", message: "5 students have interviews scheduled for tomorrow", time: "4 hours ago", read: false, type: "interview" },
    { id: "3", title: "New Applications", message: "15 students applied to CloudSys positions", time: "6 hours ago", read: true, type: "application" },
    { id: "4", title: "System Update", message: "Dashboard analytics have been updated", time: "1 day ago", read: true, type: "system" }
  ]);
  
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([
    {
      id: "1",
      author: "Dr. Rajesh Kumar",
      type: "message",
      content: "Great news! We've partnered with 3 new companies this month. More opportunities for our students! 🎉",
      timestamp: "3 hours ago",
      likes: 24,
      comments: 8
    },
    {
      id: "2",
      author: "Prof. Anita Desai",
      type: "poll",
      content: "Which technical skill should we prioritize for upcoming placements?",
      timestamp: "1 day ago",
      likes: 15,
      comments: 12,
      pollOptions: [
        { option: "Full Stack Development", votes: 45 },
        { option: "Data Science & ML", votes: 38 },
        { option: "Cloud Computing", votes: 28 },
        { option: "Cybersecurity", votes: 19 }
      ]
    }
  ]);
  
  const [offlineFormData, setOfflineFormData] = useState({
    companyName: "",
    role: "",
    studentName: "",
    offerType: "full-time",
    ctc: ""
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  // Mock data
  const metrics = {
    totalStudents: 847,
    studentsApplied: 342,
    studentsInterviewing: 156,
    studentsWithOffers: 89
  };

  const students: Student[] = [
    { id: "1", name: "Priya Sharma", course: "B.Tech CSE", year: "2024", status: "offer_received", appliedJobs: 12, interviewsScheduled: 5, offers: 2 },
    { id: "2", name: "Rahul Verma", course: "B.Tech ECE", year: "2024", status: "interviewing", appliedJobs: 8, interviewsScheduled: 3, offers: 0 },
    { id: "3", name: "Ananya Roy", course: "MBA", year: "2025", status: "applied", appliedJobs: 5, interviewsScheduled: 1, offers: 0 },
    { id: "4", name: "Arjun Patel", course: "B.Tech ME", year: "2024", status: "placed", appliedJobs: 10, interviewsScheduled: 4, offers: 1 },
    { id: "5", name: "Sneha Reddy", course: "M.Tech CS", year: "2025", status: "not_applied", appliedJobs: 0, interviewsScheduled: 0, offers: 0 }
  ];

  const jobs: Job[] = [
    { id: "1", company: "TechCorp", role: "Software Engineer", eligibleStudents: 234, applications: 89, interviewing: 23, offers: 8 },
    { id: "2", company: "Innovate Labs", role: "Data Analyst", eligibleStudents: 156, applications: 67, interviewing: 18, offers: 5 },
    { id: "3", company: "CloudSys", role: "Product Manager", eligibleStudents: 89, applications: 34, interviewing: 12, offers: 3 },
    { id: "4", company: "FinTech Solutions", role: "Backend Developer", eligibleStudents: 198, applications: 76, interviewing: 21, offers: 6 }
  ];

  const activities: Activity[] = [
    { id: "1", type: "offer", message: "Priya Sharma received offer from TechCorp", timestamp: "2 hours ago" },
    { id: "2", type: "interview", message: "Rahul Verma scheduled for interview at Innovate Labs", timestamp: "4 hours ago" },
    { id: "3", type: "application", message: "Ananya Roy applied to CloudSys - Product Manager", timestamp: "6 hours ago" },
    { id: "4", type: "placed", message: "Arjun Patel marked as placed at FinTech Solutions", timestamp: "1 day ago" },
    { id: "5", type: "invite", message: "25 new students joined OnCampus", timestamp: "2 days ago" }
  ];

  const getStatusBadge = (status: Student["status"]) => {
    const variants: Record<Student["status"], { label: string; className: string }> = {
      not_applied: { label: "Not Applied", className: "bg-gray-100 text-gray-700" },
      applied: { label: "Applied", className: "bg-blue-100 text-blue-700" },
      interviewing: { label: "Interviewing", className: "bg-orange-100 text-orange-700" },
      offer_received: { label: "Offer Received", className: "bg-green-100 text-green-700" },
      placed: { label: "Placed", className: "bg-purple-100 text-purple-700" }
    };
    return variants[status];
  };

  const handleAddOfflinePlacement = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Offline placement added:", offlineFormData);
    setShowAddOfflineDialog(false);
    setOfflineFormData({
      companyName: "",
      role: "",
      studentName: "",
      offerType: "full-time",
      ctc: ""
    });
  };

  const handleCommunityPost = (post: { type: "message" | "poll"; content: string; pollOptions?: string[] }) => {
    const newPost: CommunityPost = {
      id: String(communityPosts.length + 1),
      author: userName,
      type: post.type,
      content: post.content,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      ...(post.pollOptions && {
        pollOptions: post.pollOptions.map(option => ({ option, votes: 0 }))
      })
    };
    setCommunityPosts([newPost, ...communityPosts]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "offer":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case "interview":
        return <Calendar className="h-5 w-5 text-blue-600" />;
      case "application":
        return <Briefcase className="h-5 w-5 text-orange-600" />;
      case "system":
        return <MessageSquare className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Sophisticated uniform background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 -z-10"></div>
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40 -z-10"></div>
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#DFFF6C]/10 via-[#DFFF6C]/5 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-50/50 via-purple-50/30 to-transparent rounded-full blur-3xl -z-10"></div>

      {/* Top Bar */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-40 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#DFFF6C] to-[#c9ea4f] flex items-center justify-center shadow-lg shadow-[#DFFF6C]/20">
                <span className="font-bold text-lg text-black">OC</span>
              </div>
              <div>
                <h1 className="font-semibold text-lg tracking-tight">{universityName}</h1>
                <p className="text-xs text-gray-500">Placement Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search students..."
                  className="pl-10 w-80 bg-gray-50/50 border-gray-200 focus:bg-white transition-colors"
                />
              </div>
              
              {/* Notifications Dropdown */}
              <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative hover:bg-gray-100 rounded-xl">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold"
                      >
                        {unreadCount}
                      </motion.span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-96 p-0">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Notifications</h3>
                      {unreadCount > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={markAllAsRead}
                          className="h-auto py-1 px-2 text-xs"
                        >
                          Mark all as read
                        </Button>
                      )}
                    </div>
                  </div>
                  <ScrollArea className="h-96">
                    <div className="p-2">
                      {notifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
                            notification.read ? "hover:bg-gray-50" : "bg-blue-50/50 hover:bg-blue-50"
                          }`}
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 mt-1">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <p className="font-medium text-sm">{notification.title}</p>
                                {!notification.read && (
                                  <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1"></div>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Profile Dropdown */}
              <DropdownMenu open={showProfile} onOpenChange={setShowProfile}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-xl">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                      {userName.substring(0, 2).toUpperCase()}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <div className="p-3 border-b border-gray-100">
                    <p className="font-semibold">{userName}</p>
                    <p className="text-sm text-gray-500">{universityName}</p>
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
              <TabsTrigger value="students" className="px-6 py-3">
                <Users className="h-4 w-4 mr-2" />
                Students
              </TabsTrigger>
              <TabsTrigger value="jobs" className="px-6 py-3">
                <Briefcase className="h-4 w-4 mr-2" />
                Jobs
              </TabsTrigger>
              <TabsTrigger value="community" className="px-6 py-3">
                <MessageSquare className="h-4 w-4 mr-2" />
                Community
              </TabsTrigger>
            </TabsList>

            <Button
              onClick={() => setShowCommunityModal(true)}
              className="bg-gradient-to-r from-[#DFFF6C] to-[#c9ea4f] hover:from-[#c9ea4f] hover:to-[#DFFF6C] text-black font-semibold shadow-lg"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share with Community
            </Button>
          </div>

          <TabsContent value="overview" className="space-y-8">
            {/* Overview Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-transparent rounded-bl-full opacity-50"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <Users className="h-8 w-8 text-gray-700" />
                    <div className="text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full">Total</div>
                  </div>
                  <div className="text-4xl font-bold mb-2">{metrics.totalStudents}</div>
                  <div className="text-sm text-gray-600">Students Onboarded</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-transparent rounded-bl-full opacity-50"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <Briefcase className="h-8 w-8 text-blue-600" />
                    <div className="text-xs font-medium text-blue-700 bg-blue-50 px-3 py-1 rounded-full">Active</div>
                  </div>
                  <div className="text-4xl font-bold mb-2">{metrics.studentsApplied}</div>
                  <div className="text-sm text-gray-600">Students Applied</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-100 to-transparent rounded-bl-full opacity-50"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <Clock className="h-8 w-8 text-orange-600" />
                    <div className="text-xs font-medium text-orange-700 bg-orange-50 px-3 py-1 rounded-full">In Progress</div>
                  </div>
                  <div className="text-4xl font-bold mb-2">{metrics.studentsInterviewing}</div>
                  <div className="text-sm text-gray-600">Students Interviewing</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="relative bg-gradient-to-br from-green-50/80 to-emerald-50/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-200 to-transparent rounded-bl-full opacity-30"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                    <div className="text-xs font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">Success</div>
                  </div>
                  <div className="text-4xl font-bold mb-2 text-green-700">{metrics.studentsWithOffers}</div>
                  <div className="text-sm text-green-700">Students with Offers</div>
                </div>
              </motion.div>
            </div>

            {/* Activity Timeline */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-2xl font-semibold tracking-tight">Recent Activity</h2>
                <p className="text-sm text-gray-500 mt-1">Latest updates and events</p>
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
                        {activity.type === "offer" && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                        {activity.type === "interview" && <Calendar className="h-4 w-4 text-blue-600" />}
                        {activity.type === "application" && <Briefcase className="h-4 w-4 text-gray-600" />}
                        {activity.type === "placed" && <TrendingUp className="h-4 w-4 text-purple-600" />}
                        {activity.type === "invite" && <Mail className="h-4 w-4 text-orange-600" />}
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

          <TabsContent value="students">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight">Students</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage and track student placements</p>
                  </div>
                  <Button variant="default" size="sm" className="bg-black hover:bg-gray-800">
                    <Plus className="h-4 w-4 mr-2" />
                    Invite More
                  </Button>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {students.map((student, index) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 hover:bg-gray-50/50 transition-all duration-200 cursor-pointer group"
                    onClick={() => setSelectedStudent(student)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold shadow-md">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 group-hover:text-black transition-colors">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.course} • {student.year}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-sm text-right hidden md:block">
                          <div className="text-gray-500">
                            <span className="font-medium text-gray-700">{student.appliedJobs}</span> applied
                          </div>
                          <div className="text-gray-500">
                            <span className="font-medium text-gray-700">{student.interviewsScheduled}</span> interviews
                          </div>
                        </div>
                        <div className={`px-3 py-1.5 rounded-lg text-sm font-medium ${getStatusBadge(student.status).className}`}>
                          {getStatusBadge(student.status).label}
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="jobs">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">Jobs & Opportunities</h2>
                  <p className="text-sm text-gray-500 mt-1">Companies hiring through OnCampus</p>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {jobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                          <Building2 className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{job.role}</div>
                          <div className="text-sm text-gray-500">{job.company}</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-4 gap-4 text-sm mt-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-500 mb-1">Eligible</div>
                        <div className="font-semibold text-gray-900">{job.eligibleStudents}</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-xs text-blue-600 mb-1">Applied</div>
                        <div className="font-semibold text-blue-700">{job.applications}</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3">
                        <div className="text-xs text-orange-600 mb-1">Interviewing</div>
                        <div className="font-semibold text-orange-700">{job.interviewing}</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-xs text-green-600 mb-1">Offers</div>
                        <div className="font-semibold text-green-700">{job.offers}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            {communityPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {post.author.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{post.author}</h3>
                        <p className="text-sm text-gray-500">{post.timestamp}</p>
                      </div>
                      {post.type === "poll" && (
                        <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0">
                          <BarChart3 className="h-3 w-3 mr-1" />
                          Poll
                        </Badge>
                      )}
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

                    {post.type === "poll" && post.pollOptions && (
                      <div className="space-y-2 mb-4">
                        {post.pollOptions.map((option, i) => {
                          const totalVotes = post.pollOptions!.reduce((sum, opt) => sum + opt.votes, 0);
                          const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                          return (
                            <div key={i} className="relative">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium">{option.option}</span>
                                <span className="text-sm text-gray-500">{option.votes} votes ({percentage.toFixed(0)}%)</span>
                              </div>
                              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${percentage}%` }}
                                  transition={{ duration: 0.8, delay: 0.2 }}
                                  className="h-full bg-gradient-to-r from-[#DFFF6C] to-[#c9ea4f]"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div className="flex items-center gap-6 pt-3 border-t border-gray-100">
                      <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors">
                        <Eye className="h-4 w-4" />
                        <span>Views</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Community Post Modal */}
      <CommunityPostModal
        isOpen={showCommunityModal}
        onClose={() => setShowCommunityModal(false)}
        onPost={handleCommunityPost}
      />

      {/* Student Detail Slide-in */}
      <AnimatePresence>
        {selectedStudent && (
          <Sheet open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
            <SheetContent className="w-full sm:max-w-lg overflow-y-auto bg-white/95 backdrop-blur-xl">
              <SheetHeader>
                <SheetTitle>Student Profile</SheetTitle>
              </SheetHeader>
              
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-semibold shadow-lg">
                    {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{selectedStudent.name}</h3>
                    <p className="text-gray-600">{selectedStudent.course} • {selectedStudent.year}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4 text-center border border-blue-200">
                    <div className="text-2xl font-bold text-blue-700">{selectedStudent.appliedJobs}</div>
                    <div className="text-xs text-blue-600 mt-1">Applied</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-4 text-center border border-orange-200">
                    <div className="text-2xl font-bold text-orange-700">{selectedStudent.interviewsScheduled}</div>
                    <div className="text-xs text-orange-600 mt-1">Interviews</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-4 text-center border border-green-200">
                    <div className="text-2xl font-bold text-green-700">{selectedStudent.offers}</div>
                    <div className="text-xs text-green-600 mt-1">Offers</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Current Status</h4>
                  <div className={`inline-block px-4 py-2 rounded-lg text-sm font-medium ${getStatusBadge(selectedStudent.status).className}`}>
                    {getStatusBadge(selectedStudent.status).label}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Jobs Applied</h4>
                  <div className="space-y-3">
                    {[
                      { company: "TechCorp", role: "Software Engineer", status: "Interview Scheduled", statusColor: "text-blue-600 bg-blue-50" },
                      { company: "Innovate Labs", role: "Data Analyst", status: "Offer Received", statusColor: "text-green-600 bg-green-50" }
                    ].map((job, i) => (
                      <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-gray-300 transition-colors">
                        <div className="font-medium">{job.role}</div>
                        <div className="text-sm text-gray-600 mt-1">{job.company}</div>
                        <div className={`text-xs font-medium mt-3 inline-block px-3 py-1 rounded-full ${job.statusColor}`}>
                          {job.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedStudent.offers > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Offer Details</h4>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-green-900">TechCorp - Software Engineer</div>
                          <div className="text-sm text-green-700 mt-1">Package: 15 LPA</div>
                          <div className="text-xs text-green-600 mt-2">Offer received 2 days ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        )}
      </AnimatePresence>

      {/* Offline Placement Dialog */}
      <Dialog open={showAddOfflineDialog} onOpenChange={setShowAddOfflineDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Record Offline Placement</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddOfflinePlacement} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={offlineFormData.companyName}
                onChange={(e) => setOfflineFormData({ ...offlineFormData, companyName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={offlineFormData.role}
                onChange={(e) => setOfflineFormData({ ...offlineFormData, role: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentName">Student Name</Label>
              <Input
                id="studentName"
                value={offlineFormData.studentName}
                onChange={(e) => setOfflineFormData({ ...offlineFormData, studentName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ctc">CTC (Optional)</Label>
              <Input
                id="ctc"
                placeholder="e.g., 12 LPA"
                value={offlineFormData.ctc}
                onChange={(e) => setOfflineFormData({ ...offlineFormData, ctc: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full bg-black hover:bg-gray-800">
              Record Placement
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
