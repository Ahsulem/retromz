
'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ScrollProgressBar from '../../../components/ScrollProgressBar';

const Streamers = () => {
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

  const streamerQuotes = [
    {
      name: "PewDiePie",
      quote: "Classic games have this timeless charm that modern games sometimes lack. There's something pure about the gameplay that just works.",
      game: "Super Mario Bros",
      platform: "YouTube",
      followers: "111M",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Markiplier",
      quote: "Retro horror games were terrifying because they relied on atmosphere and imagination rather than just jump scares.",
      game: "Castlevania",
      platform: "YouTube",
      followers: "36M",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Pokimane",
      quote: "Pokemon games taught me about strategy and patience. They're not just games, they're life lessons wrapped in fun.",
      game: "Pokemon Red/Blue",
      platform: "Twitch",
      followers: "9.3M",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b9c1?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Ninja",
      quote: "The skill ceiling in classic fighting games is insane. Street Fighter II still has one of the most competitive scenes ever.",
      game: "Street Fighter II",
      platform: "Twitch",
      followers: "18.5M",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Jacksepticeye",
      quote: "Retro games prove that you don't need cutting-edge graphics to create memorable experiences. Gameplay is king!",
      game: "Mega Man X",
      platform: "YouTube",
      followers: "30M",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Shroud",
      quote: "Classic shooters like Contra taught me precision and timing. Those games were unforgiving but incredibly rewarding.",
      game: "Contra",
      platform: "Twitch",
      followers: "10.1M",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <>
      <ScrollProgressBar />
      <Navbar theme={theme} setTheme={toggleTheme} />
      
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 mb-3">
            <i className="fas fa-video me-3 text-danger"></i>
            Famous Streamers on Classic Games
          </h1>
          <p className="lead text-muted">What top content creators say about retro gaming</p>
        </div>

        <div className="row">
          {streamerQuotes.map((streamer, index) => (
            <div key={index} className="col-lg-6 mb-4">
              <div className="card h-100 border-0 shadow-lg">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <img 
                      src={streamer.avatar} 
                      alt={streamer.name}
                      className="rounded-circle me-3"
                      width="60" 
                      height="60"
                      style={{ objectFit: 'cover' }}
                    />
                    <div>
                      <h5 className="mb-1">{streamer.name}</h5>
                      <div className="d-flex align-items-center">
                        <span className="badge bg-primary me-2">{streamer.platform}</span>
                        <small className="text-muted">
                          <i className="fas fa-users me-1"></i>
                          {streamer.followers} followers
                        </small>
                      </div>
                    </div>
                  </div>
                  
                  <blockquote className="blockquote mb-3">
                    <p className="mb-0">"{streamer.quote}"</p>
                  </blockquote>
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-secondary">
                      <i className="fas fa-gamepad me-1"></i>
                      {streamer.game}
                    </span>
                    <div className="text-warning">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="row mt-5 text-center">
          <div className="col-md-3 mb-4">
            <div className="card border-0 bg-primary text-white">
              <div className="card-body">
                <i className="fas fa-eye fa-3x mb-3"></i>
                <h3>2.8B+</h3>
                <p>Total retro game views</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card border-0 bg-success text-white">
              <div className="card-body">
                <i className="fas fa-users fa-3x mb-3"></i>
                <h3>500M+</h3>
                <p>Retro gaming fans</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card border-0 bg-warning text-white">
              <div className="card-body">
                <i className="fas fa-trophy fa-3x mb-3"></i>
                <h3>10K+</h3>
                <p>Speedrun records</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card border-0 bg-danger text-white">
              <div className="card-body">
                <i className="fas fa-heart fa-3x mb-3"></i>
                <h3>95%</h3>
                <p>Positive sentiment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-5">
          <div className="card border-0 bg-light">
            <div className="card-body py-5">
              <h3 className="mb-3">Join the Retro Gaming Community</h3>
              <p className="text-muted mb-4">
                Connect with streamers, speedrunners, and fellow retro gaming enthusiasts
              </p>
              <button className="btn btn-primary btn-lg me-3">
                <i className="fab fa-twitch me-2"></i>
                Follow on Twitch
              </button>
              <button className="btn btn-danger btn-lg">
                <i className="fab fa-youtube me-2"></i>
                Subscribe on YouTube
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Streamers;
