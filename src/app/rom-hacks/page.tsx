
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ScrollProgressBar from '../../../components/ScrollProgressBar';

const RomHacks = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
      setTheme(initialTheme);
      document.documentElement.setAttribute('data-bs-theme', initialTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-bs-theme', newTheme);
  };

  const bestPractices = [
    {
      title: "Legal Considerations",
      icon: "fas fa-gavel",
      content: "Always ensure you own the original game before using ROM hacks. Respect intellectual property rights and only use legally obtained ROMs."
    },
    {
      title: "Quality Sources",
      icon: "fas fa-shield-alt",
      content: "Download ROM hacks from reputable sources like ROMhacking.net. Verify file integrity and scan for malware before use."
    },
    {
      title: "Backup Original Saves",
      icon: "fas fa-save",
      content: "Always backup your original save files before applying patches. Some hacks may be incompatible with existing saves."
    },
    {
      title: "Read Documentation",
      icon: "fas fa-book",
      content: "Check readme files and documentation for specific installation instructions, known issues, and compatibility information."
    },
    {
      title: "Use Proper Tools",
      icon: "fas fa-tools",
      content: "Use appropriate patching tools like Lunar IPS, xdelta, or specific tools recommended by the hack creator."
    },
    {
      title: "Community Support",
      icon: "fas fa-users",
      content: "Join ROM hacking communities for support, troubleshooting, and to discover new quality hacks from experienced creators."
    }
  ];

  const popularHackTypes = [
    {
      name: "Difficulty Hacks",
      description: "Enhanced challenge versions of classic games",
      examples: ["Kaizo Mario", "Pokemon Nuzlocke variants"]
    },
    {
      name: "Story Modifications",
      description: "New storylines and characters in familiar worlds",
      examples: ["Pokemon ROM hacks", "Zelda quest mods"]
    },
    {
      name: "Quality of Life",
      description: "Improvements to game mechanics and interface",
      examples: ["Fast text speed", "Modern controls"]
    },
    {
      name: "Complete Overhauls",
      description: "Entirely new games using existing engines",
      examples: ["Super Mario Land 2 DX", "Metroid: Rogue Dawn"]
    }
  ];

  return (
    <>
      <ScrollProgressBar />
      <Navbar theme={theme} setTheme={toggleTheme} />
      
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 mb-3">
            <i className="fas fa-code-branch me-3 text-primary"></i>
            ROM Hacks
          </h1>
          <p className="lead text-muted">Best practices for enjoying modified retro games</p>
        </div>

        {/* Best Practices Section */}
        <div className="mb-5">
          <h2 className="mb-4">
            <i className="fas fa-star me-2 text-warning"></i>
            Best Practices
          </h2>
          <div className="row">
            {bestPractices.map((practice, index) => (
              <div key={index} className="col-lg-6 mb-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-start">
                      <div className="me-3">
                        <i className={`${practice.icon} fa-2x text-primary`}></i>
                      </div>
                      <div>
                        <h5 className="card-title">{practice.title}</h5>
                        <p className="card-text text-muted">{practice.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Hack Types */}
        <div className="mb-5">
          <h2 className="mb-4">
            <i className="fas fa-gamepad me-2 text-success"></i>
            Popular Hack Types
          </h2>
          <div className="row">
            {popularHackTypes.map((type, index) => (
              <div key={index} className="col-lg-3 col-md-6 mb-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title text-primary">{type.name}</h5>
                    <p className="card-text">{type.description}</p>
                    <div className="mt-3">
                      <h6 className="text-muted">Examples:</h6>
                      {type.examples.map((example, i) => (
                        <span key={i} className="badge bg-secondary me-1 mb-1">{example}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Notice */}
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">
            <i className="fas fa-exclamation-triangle me-2"></i>
            Important Notice
          </h4>
          <p>
            RetroMZ does not host or distribute ROM files or ROM hacks. We only provide information 
            about best practices for those who legally own games and wish to modify them.
          </p>
          <hr />
          <p className="mb-0">
            Always ensure you have legal rights to any ROMs you use and respect the intellectual 
            property of game developers and publishers.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link href="/games" className="btn btn-primary btn-lg">
            <i className="fas fa-gamepad me-2"></i>
            Browse Our Game Library
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default RomHacks;
