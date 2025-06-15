
'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ScrollProgressBar from '../../../components/ScrollProgressBar';

const Music = () => {
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

  return (
    <>
      <ScrollProgressBar />
      <Navbar theme={theme} setTheme={toggleTheme} />
      
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 mb-3">
            <i className="fas fa-music me-3 text-success"></i>
            Famous Game Music
          </h1>
          <p className="lead text-muted">Iconic soundtracks that defined generations</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-lg">
              <div className="card-body text-center py-5">
                <div className="mb-4">
                  <i className="fas fa-headphones fa-5x text-success mb-3"></i>
                </div>
                <h2 className="h3 mb-3">Coming Soon!</h2>
                <p className="text-muted mb-4">
                  We're curating the most memorable video game soundtracks from the golden age of gaming. 
                  Get ready to experience the music that made these games legendary!
                </p>
                
                <div className="row text-center mb-4">
                  <div className="col-md-4 mb-3">
                    <div className="p-3">
                      <i className="fas fa-play-circle fa-2x text-primary mb-2"></i>
                      <h5>Audio Player</h5>
                      <small className="text-muted">Stream classic tracks</small>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="p-3">
                      <i className="fas fa-list fa-2x text-warning mb-2"></i>
                      <h5>Curated Playlists</h5>
                      <small className="text-muted">By game and genre</small>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="p-3">
                      <i className="fas fa-info-circle fa-2x text-success mb-2"></i>
                      <h5>Composer Info</h5>
                      <small className="text-muted">Learn about the creators</small>
                    </div>
                  </div>
                </div>

                <div className="alert alert-info" role="alert">
                  <h6>Sneak Peek: What to Expect</h6>
                  <div className="row text-start">
                    <div className="col-md-6">
                      <ul className="list-unstyled">
                        <li><i className="fas fa-check text-success me-2"></i>Super Mario Bros Theme</li>
                        <li><i className="fas fa-check text-success me-2"></i>Legend of Zelda Overworld</li>
                        <li><i className="fas fa-check text-success me-2"></i>Tetris Theme (Korobeiniki)</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="list-unstyled">
                        <li><i className="fas fa-check text-success me-2"></i>Mega Man 2 Soundtrack</li>
                        <li><i className="fas fa-check text-success me-2"></i>Pokemon Battle Themes</li>
                        <li><i className="fas fa-check text-success me-2"></i>Final Fantasy Battle Music</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button className="btn btn-success btn-lg mt-3" disabled>
                  <i className="fas fa-bell me-2"></i>
                  Notify Me When Available
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Fun Facts Section */}
        <div className="row mt-5">
          <div className="col-md-6 mb-4">
            <div className="card border-0 bg-primary text-white">
              <div className="card-body text-center">
                <i className="fas fa-clock fa-3x mb-3"></i>
                <h4>8-bit Era</h4>
                <p>Composers had only 3-4 audio channels to work with</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card border-0 bg-success text-white">
              <div className="card-body text-center">
                <i className="fas fa-memory fa-3x mb-3"></i>
                <h4>Memory Limits</h4>
                <p>Entire soundtracks fit in just a few kilobytes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Music;
