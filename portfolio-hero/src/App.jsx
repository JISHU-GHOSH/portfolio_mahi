import React, { useState } from 'react';
import HeroSection from './HeroSection';

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="app-root">
      <HeroSection
        onOpenContact={() => setContactOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
      >
        <div style={{ minHeight: '60vh', padding: '6rem 2rem', textAlign: 'center' }}>
          {/* Downstream portfolio sections mount here in Tasks 5-7 */}
        </div>
      </HeroSection>
    </div>
  );
}
