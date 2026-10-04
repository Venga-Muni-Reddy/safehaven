import React, { useState } from 'react';
import Navbar from "./PublicNavbar";
import HeroFeatureSection from './HeroFeatureSection';
import SuccessStoriesSection from './SuccessStoriesSection';
import StatsSection from './StatsSection';
import TestimonialsSection from './TestimonialsSection';
import Footer from './Footer';
import "bootstrap/dist/css/bootstrap.min.css";
import AllReports from '../components/Public/AllReports';
import Profile from './Profile';

const Home = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <div>
      {/* Pass the onProfileClick function to Navbar */}
      <Navbar onProfileClick={() => setShowProfileModal(true)} />

      <HeroFeatureSection />
      <SuccessStoriesSection />
      <StatsSection />
      <AllReports />
      <TestimonialsSection />
      <Footer />
      
      {/* Profile Modal */}
      <Profile show={showProfileModal} handleClose={() => setShowProfileModal(false)} />
    </div>
  );
}

export default Home;
