import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { SignupFlow } from "./components/SignupFlow";
import { SignIn } from "./components/SignIn";
import { UniversityDashboard } from "./components/UniversityDashboard";
import { EmployerLandingPage } from "./components/employer/EmployerLandingPage";
import { EmployerSignupFlow } from "./components/employer/EmployerSignupFlow";
import { EmployerDashboard } from "./components/employer/EmployerDashboard";
import { StudentLandingPage } from "./components/student/StudentLandingPage";
import { StudentSignIn } from "./components/student/StudentSignIn";
import { StudentSignupFlow } from "./components/student/StudentSignupFlow";
import { StudentDashboard } from "./components/student/StudentDashboard";

type Screen = 
  | "landing" 
  | "signup" 
  | "signin" 
  | "dashboard" 
  | "employer_landing" 
  | "employer_signup" 
  | "employer_dashboard"
  | "student_landing"
  | "student_signin"
  | "student_signup"
  | "student_dashboard";

interface UniversityData {
  name: string;
  email: string;
  universityName: string;
  designation: string;
}

interface EmployerData {
  companyName: string;
  email: string;
  role: string;
}

interface StudentData {
  name: string;
  email: string;
  college: string;
  course: string;
  year: string;
  skills: string[];
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("student_landing");
  const [universityData, setUniversityData] = useState<UniversityData | null>(null);
  const [employerData, setEmployerData] = useState<EmployerData | null>(null);
  const [studentData, setStudentData] = useState<StudentData | null>(null);

  const handleGetStarted = () => {
    setCurrentScreen("signup");
  };

  const handleBookDemo = () => {
    // In a real app, this would open a demo booking form
    alert("Demo booking coming soon! For now, try the Get Started flow.");
  };

  const handleEmployers = () => {
    setCurrentScreen("employer_landing");
  };

  const handleSignupComplete = (data: UniversityData) => {
    setUniversityData(data);
    setCurrentScreen("dashboard");
  };

  const handleSignIn = (data: { email: string; password: string }) => {
    // Mock sign in - in real app, this would verify credentials
    setUniversityData({
      name: "Dr. Rajesh Kumar",
      email: data.email,
      universityName: "Indian Institute of Technology, Delhi",
      designation: "Placement Officer"
    });
    setCurrentScreen("dashboard");
  };

  const handleSwitchToSignIn = () => {
    setCurrentScreen("signin");
  };

  const handleSwitchToSignup = () => {
    setCurrentScreen("signup");
  };

  const handleEmployerPostJob = () => {
    setCurrentScreen("employer_signup");
  };

  const handleEmployerRequestDemo = () => {
    alert("Employer demo booking coming soon!");
  };

  const handleEmployerSignupComplete = (data: { companyName: string; email: string; role: string; jobPosted: boolean }) => {
    setEmployerData({
      companyName: data.companyName,
      email: data.email,
      role: data.role
    });
    setCurrentScreen("employer_dashboard");
  };

  const handleStudentJoin = () => {
    setCurrentScreen("student_signup");
  };

  const handleStudentSignIn = (data: { email: string; password: string; college: string }) => {
    // Mock sign in - in real app, this would verify credentials
    setStudentData({
      name: "Priya Sharma",
      email: data.email,
      college: data.college,
      course: "B.Tech Computer Science",
      year: "4th Year / Final Year",
      skills: ["Python", "Java", "React"]
    });
    setCurrentScreen("student_dashboard");
  };

  const handleStudentSignupComplete = (data: {
    name: string;
    email: string;
    college: string;
    course: string;
    year: string;
    skills: string[];
    resume: string;
  }) => {
    setStudentData({
      name: data.name,
      email: data.email,
      college: data.college,
      course: data.course,
      year: data.year,
      skills: data.skills
    });
    setCurrentScreen("student_dashboard");
  };

  const handleSwitchToStudentSignIn = () => {
    setCurrentScreen("student_signin");
  };

  const handleSwitchToStudentSignup = () => {
    setCurrentScreen("student_signup");
  };

  return (
    <>
      {currentScreen === "landing" && (
        <LandingPage 
          onGetStarted={handleGetStarted}
          onBookDemo={handleBookDemo}
          onEmployers={handleEmployers}
        />
      )}
      
      {currentScreen === "signup" && (
        <SignupFlow 
          onComplete={handleSignupComplete}
          onSwitchToSignIn={handleSwitchToSignIn}
        />
      )}
      
      {currentScreen === "signin" && (
        <SignIn 
          onSignIn={handleSignIn}
          onSwitchToSignup={handleSwitchToSignup}
        />
      )}
      
      {currentScreen === "dashboard" && universityData && (
        <UniversityDashboard 
          universityName={universityData.universityName}
          userName={universityData.name}
        />
      )}

      {currentScreen === "employer_landing" && (
        <EmployerLandingPage
          onPostJob={handleEmployerPostJob}
          onRequestDemo={handleEmployerRequestDemo}
        />
      )}

      {currentScreen === "employer_signup" && (
        <EmployerSignupFlow
          onComplete={handleEmployerSignupComplete}
        />
      )}

      {currentScreen === "employer_dashboard" && employerData && (
        <EmployerDashboard
          companyName={employerData.companyName}
        />
      )}

      {currentScreen === "student_landing" && (
        <StudentLandingPage
          onJoin={handleStudentJoin}
        />
      )}

      {currentScreen === "student_signin" && (
        <StudentSignIn
          onSignIn={handleStudentSignIn}
          onSwitchToSignup={handleSwitchToStudentSignup}
        />
      )}

      {currentScreen === "student_signup" && (
        <StudentSignupFlow
          onComplete={handleStudentSignupComplete}
          onSwitchToSignIn={handleSwitchToStudentSignIn}
        />
      )}

      {currentScreen === "student_dashboard" && studentData && (
        <StudentDashboard
          studentName={studentData.name}
          collegeName={studentData.college}
        />
      )}
    </>
  );
}