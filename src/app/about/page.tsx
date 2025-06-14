
'use client';

import { useEffect } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { useThemeAwareLoader } from '../hooks/useThemeAwareLoader';

export default function AboutPage() {
  const { isLoading, progress, loadingTitle, loadingText, theme, toggleTheme, onDataLoad } = useThemeAwareLoader();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('bootstrap/dist/js/bootstrap.bundle.min.js');
    }

    const fetchData = async () => {
      try {
        await onDataLoad('About Information');
      } catch (err) {
        console.error('Error loading about data:', err);
      }
    };

    fetchData();
  }, [onDataLoad]);

  if (isLoading) {
    return (
      <div className={`loading-overlay ${isLoading ? '' : 'hidden'}`} role="alert" aria-label="Loading about information">
        <div className="loading-content">
          <h1 className="loading-title">{loadingTitle}</h1>
          <div className="loading-spinner"></div>
          <div className="loading-progress">
            <div className="loading-progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="loading-text">{loadingText}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar theme={theme} setTheme={toggleTheme} />
      <div className="container py-5">
        <div className="hero text-center mb-5">
          <h1><i className="fas fa-info-circle me-2"></i>About RETROMZ</h1>
          <p className="lead">The ultimate destination for retro gaming enthusiasts</p>
        </div>

        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="mb-4">Our Mission</h3>
                <p>
                  RETROMZ is dedicated to preserving and celebrating the golden age of gaming. We provide a platform 
                  where gamers can relive their childhood memories and discover classic titles that shaped the gaming industry.
                </p>
                
                <h3 className="mb-4 mt-5">What We Offer</h3>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-start">
                      <i className="fas fa-gamepad text-primary me-3 mt-1"></i>
                      <div>
                        <h5>Extensive Game Library</h5>
                        <p>Over 10,000+ retro games from various consoles and systems</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-start">
                      <i className="fas fa-users text-primary me-3 mt-1"></i>
                      <div>
                        <h5>Active Community</h5>
                        <p>Connect with fellow retro gaming enthusiasts</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-start">
                      <i className="fas fa-star text-primary me-3 mt-1"></i>
                      <div>
                        <h5>Game Reviews</h5>
                        <p>Read and write reviews for your favorite titles</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-start">
                      <i className="fas fa-cog text-primary me-3 mt-1"></i>
                      <div>
                        <h5>Easy to Use</h5>
                        <p>Play games directly in your browser with no downloads required</p>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="mb-4 mt-5">Our Story</h3>
                <p>
                  Founded by passionate gamers who grew up with classic consoles, RETROMZ was created to ensure 
                  that these timeless games remain accessible to future generations. We believe that retro games 
                  are not just entertainment, but cultural artifacts that deserve to be preserved and celebrated.
                </p>

                <div className="text-center mt-5">
                  <h4 className="mb-3">Join Our Community</h4>
                  <p>Ready to dive into the world of retro gaming?</p>
                  <a href="/games" className="btn btn-primary me-2">
                    <i className="fas fa-gamepad me-2"></i>Start Playing
                  </a>
                  <a href="/register" className="btn btn-outline-secondary">
                    <i className="fas fa-user-plus me-2"></i>Sign Up
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
