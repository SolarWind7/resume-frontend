// src/components/Resume.js

import React from 'react';
import ContactInfo from './ContactInfo';
import SelfIntro from './SelfIntro';
import Education from './Education';
import Experience from './Experience';
import Skills from './Skills';

function Resume() {
  return (
    <div>
      <ContactInfo />
      <SelfIntro />
      <Education />
      <Experience />
      <Skills />
    </div>
  );
}

export default Resume;
