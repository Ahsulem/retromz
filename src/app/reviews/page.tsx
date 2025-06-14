
'use client';

import { useEffect } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { useThemeAwareLoader } from '../hooks/useThemeAwareLoader';

export default function ReviewsPage() {
  const { isLoading, progress, loadingTitle, loadingText, theme, toggleTheme, onDataLoad } = useThemeAwareLoader();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('bootstrap/dist/js/bootstrap.bundle.min.js');
    }

    const fetchData = async () => {
      try {
        await onDataLoad('Reviews Information');
      } catch (err) {
        console.error('Error loading reviews data:', err);
      }
    };

    fetchData();
  }, [onDataLoad]);

  if (isLoading) {
    return (
      <div className={`loading-overlay ${isLoading ? '' : 'hidden'}`} role="alert" aria-label="Loading reviews information">
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
          <h1><i className="fas fa-star me-2"></i>Game Reviews</h1>
          <p className="lead">Read and write reviews for your favorite retro games</p>
        </div>

        <div className="row">
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-header">
                <h3>Featured Reviews</h3>
              </div>
              <div className="card-body">
                <div className="text-center py-5">
                  <i className="fas fa-star fa-3x text-muted mb-3"></i>
                  <h4 className="text-muted">Coming Soon</h4>
                  <p className="text-muted">Game reviews feature is under development</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <h4>Top Rated Games</h4>
              </div>
              <div className="card-body">
                <div className="text-center py-3">
                  <i className="fas fa-trophy fa-2x text-muted mb-2"></i>
                  <p className="text-muted">Ratings coming soon</p>
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
