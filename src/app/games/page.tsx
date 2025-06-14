
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gamesData from '../../../public/games.json';

const Games = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedSystem, setSelectedSystem] = useState('All');

  // Get popular games for slider (you can modify this logic)
  const popularGames = Object.entries(gamesData).slice(0, 3).map(([key, game]) => ({
    id: key,
    ...game
  }));

  // Get all games for catalog
  const allGames = Object.entries(gamesData).map(([key, game]) => ({
    id: key,
    ...game
  }));

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % popularGames.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [popularGames.length]);

  // Filter games
  const filteredGames = allGames.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || game.genre === selectedGenre;
    const matchesSystem = selectedSystem === 'All' || game.system === selectedSystem;
    return matchesSearch && matchesGenre && matchesSystem;
  });

  // Get unique genres and systems for filters
  const genres = ['All', ...new Set(allGames.map(game => game.genre))];
  const systems = ['All', ...new Set(allGames.map(game => game.system))];

  return (
    <div className="container-fluid p-0">
      {/* Hero Slider Section */}
      <div className="hero-slider position-relative" style={{ height: '60vh', overflow: 'hidden' }}>
        {popularGames.map((game, index) => (
          <div
            key={game.id}
            className={`slide position-absolute w-100 h-100 transition-all duration-1000 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-30 scale-95'
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${game.coverImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: index === currentSlide ? 10 : 1,
              transform: index === currentSlide ? 'scale(1)' : 'scale(0.95)',
              transition: 'all 1s ease-in-out'
            }}
          >
            <div className="position-absolute bottom-0 start-0 p-5 text-white">
              <h1 className="display-4 fw-bold mb-3">{game.title}</h1>
              <p className="lead mb-3">{game.description}</p>
              <div className="d-flex align-items-center mb-4">
                <span className="badge bg-primary me-3">{game.system}</span>
                <span className="badge bg-secondary me-3">{game.genre}</span>
                <span className="badge bg-warning text-dark">{game.year}</span>
              </div>
              <div className="d-flex align-items-center mb-4">
                <div className="d-flex me-4">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fas fa-star ${i < Math.floor(game.rating) ? 'text-warning' : 'text-muted'}`}
                    ></i>
                  ))}
                  <span className="ms-2">{game.rating}</span>
                </div>
                <span className="text-light">
                  <i className="fas fa-eye me-1"></i>
                  {game.viewCount} views
                </span>
              </div>
              <Link
                href={`/games/${encodeURIComponent(game.title.toLowerCase().replace(/\s+/g, '-'))}`}
                className="btn btn-primary btn-lg me-3"
              >
                <i className="fas fa-play me-2"></i>
                Play Now
              </Link>
              <button className="btn btn-outline-light btn-lg">
                <i className="fas fa-info-circle me-2"></i>
                Learn More
              </button>
            </div>
          </div>
        ))}
        
        {/* Slider Navigation Dots */}
        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3">
          <div className="d-flex gap-2">
            {popularGames.map((_, index) => (
              <button
                key={index}
                className={`btn rounded-circle p-0 ${
                  index === currentSlide ? 'btn-primary' : 'btn-outline-light'
                }`}
                style={{ width: '12px', height: '12px' }}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Games Catalog Section */}
      <div className="container py-5">
        <div className="row mb-4">
          <div className="col-12">
            <h2 className="mb-4">
              <i className="fas fa-gamepad me-2 text-primary"></i>
              Game Library
            </h2>
            
            {/* Filters */}
            <div className="row mb-4">
              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search games..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="col-md-4 mb-3">
                <select
                  className="form-select"
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                >
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <select
                  className="form-select"
                  value={selectedSystem}
                  onChange={(e) => setSelectedSystem(e.target.value)}
                >
                  {systems.map(system => (
                    <option key={system} value={system}>{system}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="row">
          {filteredGames.map((game) => (
            <div key={game.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card game-card h-100 border-0 shadow-sm">
                <div className="position-relative overflow-hidden">
                  <Image
                    src={game.coverImage || '/api/placeholder/300/400'}
                    width={300}
                    height={400}
                    className="card-img-top"
                    style={{ objectFit: 'cover', height: '250px' }}
                    alt={`${game.title} cover`}
                  />
                  <div className="position-absolute top-0 end-0 p-2">
                    <span className="badge bg-primary">{game.system}</span>
                  </div>
                  <div className="position-absolute bottom-0 start-0 end-0 bg-gradient-to-t from-black to-transparent p-3">
                    <div className="d-flex align-items-center">
                      <div className="d-flex me-2">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fas fa-star ${i < Math.floor(game.rating) ? 'text-warning' : 'text-muted'}`}
                            style={{ fontSize: '0.8rem' }}
                          ></i>
                        ))}
                      </div>
                      <small className="text-white">{game.rating}</small>
                    </div>
                  </div>
                </div>
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title mb-2">{game.title}</h6>
                  <p className="card-text text-muted small flex-grow-1">
                    {game.description?.substring(0, 80)}...
                  </p>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge bg-secondary">{game.genre}</span>
                    <small className="text-muted">{game.year}</small>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      <i className="fas fa-users me-1"></i>
                      {game.playingCount} playing
                    </small>
                    <Link
                      href={`/games/${encodeURIComponent(game.title.toLowerCase().replace(/\s+/g, '-'))}`}
                      className="btn btn-primary btn-sm"
                    >
                      <i className="fas fa-play me-1"></i>
                      Play
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-5">
            <i className="fas fa-search fa-3x text-muted mb-3"></i>
            <h4 className="text-muted">No games found</h4>
            <p className="text-muted">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Games;
