import React, { useState } from 'react';
import HeroSection from './HeroSection';
import ProjectsSection from './ProjectsSection';
import AboutSection from './AboutSection';

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  const handleOpenContact = () => {
    setContactOpen(true);
  };

  const handleOpenResume = () => {
    setResumeOpen(true);
  };

  return (
    <div className="app-root">
      <HeroSection
        onOpenContact={handleOpenContact}
        onOpenResume={handleOpenResume}
      >
        <ProjectsSection onOpenContact={handleOpenContact} />
        <AboutSection
          onOpenResume={handleOpenResume}
          onOpenContact={handleOpenContact}
        />
      </HeroSection>
    </div>
  );
}
