import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupForm from "./components/Auth/Signup";
import LoginForm from "./components/Auth/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminDashboard from "./components/Admin/Dashboard";
import Logout from "./components/Logout";
import ReportCase from "./components/Public/ReportCase";
import AllReports from "./components/Public/AllReports";
import Home from "./pages/Home";
import Donation from "./components/Public/Donation";
import NGOContact from "./components/NGO/NGOContact";
import VolunteerNavbar from "./components/Volunteer/VolunteerNavbar";

// Import the new components
import NgoReports from "./components/NGO/NgoReports";
import NgoTasks from "./components/NGO/NgoTasks";
import BadgeAssignment from "./components/Admin/BadgeAssignment";
import AddSuccessStory from "./components/NGO/AddSuccessStory";
import SuccessStories from "./components/NGO/SuccesssStories";
import NgoHome from "./components/NGO/NgoHome";
import AdminHome from "./components/Admin/AdminHome";
import ViewSuccessStories from "./components/Public/ViewSuccessStories";
import VolunteerAssignedTasks from "./components/Volunteer/VolunteerAssignedTasks";
import VolunteerBadges from "./components/Volunteer/VolunteerBadges";
import VolunteerBadgesWithLeaderboard from "./components/Volunteer/VolunteerBadgesWithLeaderboard";
import VolunteerAvailabilityCalendar from "./components/Volunteer/VolunteerAvailabilityCalendar";
import VolunteerHomepage from "./components/Volunteer/VolunteerHomepage";
import AdminDonations from "./components/Admin/AdminDonations";
import AdminSuccessStories from "./components/Admin/AdminSuccessStories";

function App() {
  
  return (
    <Router>
      <Routes>
        
        {/* Authentication */}
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<LoginForm />} />
        <Route path="/logout" element={<Logout />} />
      
        {/* Public */}
        <Route path="/report-case" element={<ReportCase />} />
        <Route path="/get-reports" element={<AllReports />} />
        <Route path="/home" element={<Home />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/success-stories" element={<ViewSuccessStories />} />
        
        {/* NGO */}
        <Route path="/ngo-home" element={<NgoHome />} />
        <Route path="/ngo-reports" element={<NgoReports />} />
        <Route path="/ngo-tasks" element={<NgoTasks />} />
        <Route path="/ngo-add-story" element={<AddSuccessStory />} />
        <Route path="/ngo-view-story" element={<SuccessStories />} />
        <Route path="/ngo-contact" element={<NGOContact />} />



        {/* Volunteer */}
        <Route path="/volunteer-tasks" element={<VolunteerAssignedTasks />} />
        <Route path="/volunteer-badges" element={<VolunteerBadges />} />
        <Route path="/volunteer-home" element={<VolunteerHomepage />} />
        <Route path="/volunteer-leaderboards" element={<VolunteerBadgesWithLeaderboard />} />
        <Route path="/volunteer-navbar" element={<VolunteerNavbar />} />
        <Route path="/volunteer-calendar" element={<VolunteerAvailabilityCalendar />} />

        {/* Admin */}
        <Route path="/badges" element={<BadgeAssignment />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-home" element={<AdminHome />} />       
        <Route path="/admin-success-stories" element={<AdminSuccessStories />} />
        <Route path="/admin-donations" element={<AdminDonations />} />
      </Routes>
    </Router>
  );
}

export default App;
