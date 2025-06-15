
'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '../../firebase/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, updateDoc, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import PacmanLoader from '../../../components/PacmanLoader';
import ScrollProgressBar from '../../../components/ScrollProgressBar';

export default function ReviewsPage() {
  const [theme, setTheme] = useState('dark');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [games, setGames] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedGame, setSelectedGame] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const initializePage = async () => {
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        setTheme(initialTheme);
        document.documentElement.setAttribute('data-bs-theme', initialTheme);

        await import('bootstrap/dist/js/bootstrap.bundle.min.js');
        
        // Load games
        try {
          const response = await fetch('/games.json');
          const gamesData = await response.json();
          setGames(gamesData);
        } catch (error) {
          console.error('Error loading games:', error);
        }

        setIsLoading(false);
      }
    };

    initializePage();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const reviewsRef = collection(db, 'reviews');
    const q = query(reviewsRef, orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reviewsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReviews(reviewsData);
    });

    return () => unsubscribe();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-bs-theme', newTheme);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user || !selectedGame) return;

    setIsSubmitting(true);
    try {
      const selectedGameData = games.find(game => game.id === parseInt(selectedGame));
      
      await addDoc(collection(db, 'reviews'), {
        gameId: selectedGame,
        gameTitle: selectedGameData?.title || 'Unknown Game',
        userId: user.uid,
        userEmail: user.email,
        rating: rating,
        comment: comment,
        createdAt: new Date()
      });

      // Reset form
      setSelectedGame('');
      setRating(5);
      setComment('');
      setShowReviewForm(false);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
    setIsSubmitting(false);
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return [...Array(5)].map((_, i) => (
      <i
        key={i}
        className={`fas fa-star ${i < rating ? 'text-warning' : 'text-muted'} ${interactive ? 'star-interactive' : ''}`}
        onClick={interactive && onRatingChange ? () => onRatingChange(i + 1) : undefined}
        style={interactive ? { cursor: 'pointer' } : {}}
      ></i>
    ));
  };

  if (isLoading) {
    return <PacmanLoader message="Loading Reviews" />;
  }

  return (
    <>
      <ScrollProgressBar />
      <Navbar theme={theme} setTheme={toggleTheme} />
      <div className="container py-5">
        <div className="hero text-center mb-5">
          <h1><i className="fas fa-star me-2"></i>Game Reviews</h1>
          <p className="lead">Share your thoughts and read what others think about retro games</p>
        </div>

        {user && (
          <div className="mb-5">
            <button 
              className="btn btn-primary"
              onClick={() => setShowReviewForm(!showReviewForm)}
            >
              <i className="fas fa-plus me-2"></i>Add a Review
            </button>
          </div>
        )}

        {showReviewForm && user && (
          <div className="card mb-5">
            <div className="card-header">
              <h5 className="mb-0"><i className="fas fa-edit me-2"></i>Write a Review</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmitReview}>
                <div className="mb-3">
                  <label htmlFor="gameSelect" className="form-label">Select Game</label>
                  <select 
                    id="gameSelect"
                    className="form-select"
                    value={selectedGame}
                    onChange={(e) => setSelectedGame(e.target.value)}
                    required
                  >
                    <option value="">Choose a game...</option>
                    {games.map(game => (
                      <option key={game.id} value={game.id}>
                        {game.title} ({game.console})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Rating</label>
                  <div className="d-flex align-items-center">
                    {renderStars(rating, true, setRating)}
                    <span className="ms-2">({rating}/5)</span>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="comment" className="form-label">Comment (Optional)</label>
                  <textarea
                    id="comment"
                    className="form-control"
                    rows="4"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts about this game..."
                  ></textarea>
                </div>
                <div className="d-flex gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-success"
                    disabled={isSubmitting || !selectedGame}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane me-2"></i>Submit Review
                      </>
                    )}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowReviewForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {!user && (
          <div className="alert alert-info mb-5">
            <i className="fas fa-info-circle me-2"></i>
            <a href="/login" className="alert-link">Sign in</a> to write reviews and share your thoughts about games.
          </div>
        )}

        <div className="row">
          {reviews.length === 0 ? (
            <div className="col-12 text-center">
              <div className="card">
                <div className="card-body">
                  <i className="fas fa-comments fa-3x text-muted mb-3"></i>
                  <h5>No reviews yet</h5>
                  <p className="text-muted">Be the first to review a game!</p>
                </div>
              </div>
            </div>
          ) : (
            reviews.map(review => (
              <div key={review.id} className="col-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h5 className="card-title mb-1">{review.gameTitle}</h5>
                        <small className="text-muted">
                          by {review.userEmail} • {new Date(review.createdAt?.toDate()).toLocaleDateString()}
                        </small>
                      </div>
                      <div className="d-flex align-items-center">
                        {renderStars(review.rating)}
                        <span className="ms-2">({review.rating}/5)</span>
                      </div>
                    </div>
                    {review.comment && (
                      <p className="card-text">{review.comment}</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
      
      <style jsx>{`
        .star-interactive:hover {
          transform: scale(1.2);
          transition: transform 0.2s ease;
        }
      `}</style>
    </>
  );
}
