
'use client';

import { useEffect } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { useThemeAwareLoader } from '../hooks/useThemeAwareLoader';

export default function RequestsPage() {
  const { isLoading, progress, loadingTitle, loadingText, theme, toggleTheme, onDataLoad } = useThemeAwareLoader();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('bootstrap/dist/js/bootstrap.bundle.min.js');
    }

    const fetchData = async () => {
      try {
        await onDataLoad('Requests Information');
      } catch (err) {
        console.error('Error loading requests data:', err);
      }
    };

    fetchData();
  }, [onDataLoad]);

  if (isLoading) {
    return (
      <div className={`loading-overlay ${isLoading ? '' : 'hidden'}`} role="alert" aria-label="Loading requests information">
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
          <h1><i className="fas fa-plus-circle me-2"></i>Game Requests</h1>
          <p className="lead">Request your favorite retro games to be added to our collection</p>
        </div>

        <div className="row">
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-header">
                <h3>Submit a Game Request</h3>
              </div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="gameTitle" className="form-label">Game Title</label>
                    <input type="text" className="form-control" id="gameTitle" placeholder="Enter game title" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="gameSystem" className="form-label">System/Console</label>
                    <select className="form-select" id="gameSystem">
                      <option value="">Select a system</option>
                      <option value="nes">Nintendo Entertainment System (NES)</option>
                      <option value="snes">Super Nintendo (SNES)</option>
                      <option value="gameboy">Game Boy</option>
                      <option value="gba">Game Boy Advance</option>
                      <option value="n64">Nintendo 64</option>
                      <option value="genesis">Sega Genesis</option>
                      <option value="ps1">PlayStation 1</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="gameDescription" className="form-label">Why do you want this game?</label>
                    <textarea className="form-control" id="gameDescription" rows={3} placeholder="Tell us why this game should be added"></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-paper-plane me-2"></i>Submit Request
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <h4>Recent Requests</h4>
              </div>
              <div className="card-body">
                <div className="text-center py-3">
                  <i className="fas fa-clock fa-2x text-muted mb-2"></i>
                  <p className="text-muted">No recent requests</p>
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
