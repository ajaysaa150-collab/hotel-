import React, { useState } from 'react';
import { Testimonial, ROOMS } from '../data/hotelData';
import { X, Star, CheckCircle2, MessageSquarePlus } from 'lucide-react';

interface SubmitReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: Testimonial) => void;
}

export const SubmitReviewModal: React.FC<SubmitReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview,
}) => {
  if (!isOpen) return null;

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState('');
  const [city, setCity] = useState('');
  const [designation, setDesignation] = useState('');
  const [roomStayed, setRoomStayed] = useState(ROOMS[0].name);
  const [title, setTitle] = useState('');
  const [quote, setQuote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !quote || !title) return;

    const newReview: Testimonial = {
      id: `user-rev-${Date.now()}`,
      author,
      designation: designation || 'Verified Guest',
      city: city || 'Mumbai',
      rating,
      date: 'Just now',
      title,
      quote,
      roomStayed,
      verified: true,
    };

    onSubmitReview(newReview);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setAuthor('');
    setCity('');
    setDesignation('');
    setTitle('');
    setQuote('');
    setRating(5);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-stone-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div>
            <h3 className="font-serif text-lg font-bold">
              Submit Your Review
            </h3>
            <p className="text-xs text-stone-300">
              Share your stay experience at Regency Hotel Mumbai
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            aria-label="Close review dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 text-stone-800">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-serif text-xl font-bold text-stone-900">
                Thank You for Your Review!
              </h4>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                Your feedback helps us maintain exceptional hospitality standards in Santacruz East, Mumbai. Your review has been added to our guest board.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-4 px-5 py-2 text-xs font-semibold rounded-md bg-stone-900 text-white hover:bg-stone-800"
              >
                Close & View Reviews
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Star Rating Picker */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1.5">
                  Overall Rating *
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 focus:outline-none transition-transform hover:scale-110"
                      aria-label={`Rate ${star} star`}
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= (hoverRating || rating)
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-medium text-stone-600 ml-2">
                    {rating === 5 ? '5.0 - Exceptional' : `${rating}.0 Stars`}
                  </span>
                </div>
              </div>

              {/* Guest Identity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="rev-author" className="block text-xs font-medium text-stone-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    id="rev-author"
                    type="text"
                    required
                    placeholder="e.g. Ananya Sen"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label htmlFor="rev-city" className="block text-xs font-medium text-stone-700 mb-1">
                    City / Country
                  </label>
                  <input
                    id="rev-city"
                    type="text"
                    placeholder="e.g. Hyderabad / Dubai"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="rev-designation" className="block text-xs font-medium text-stone-700 mb-1">
                    Role / Purpose (Optional)
                  </label>
                  <input
                    id="rev-designation"
                    type="text"
                    placeholder="e.g. Business Executive / Transit Passenger"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label htmlFor="rev-room" className="block text-xs font-medium text-stone-700 mb-1">
                    Room Stayed
                  </label>
                  <select
                    id="rev-room"
                    value={roomStayed}
                    onChange={(e) => setRoomStayed(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  >
                    {ROOMS.map(r => (
                      <option key={r.id} value={r.name}>{r.name}</option>
                    ))}
                    <option value="General Hotel Stay">General Hotel Stay</option>
                  </select>
                </div>
              </div>

              {/* Review Headline */}
              <div>
                <label htmlFor="rev-title" className="block text-xs font-medium text-stone-700 mb-1">
                  Review Headline *
                </label>
                <input
                  id="rev-title"
                  type="text"
                  required
                  placeholder="e.g. Perfect transit stay with great breakfast and fast Wi-Fi"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              {/* Review Quote Body */}
              <div>
                <label htmlFor="rev-quote" className="block text-xs font-medium text-stone-700 mb-1">
                  Your Review / Experience *
                </label>
                <textarea
                  id="rev-quote"
                  rows={4}
                  required
                  placeholder="Tell other travelers about room comfort, airport connectivity, cleanliness, front desk service, or food..."
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold rounded-md bg-amber-600 text-white hover:bg-amber-500 transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <MessageSquarePlus className="w-3.5 h-3.5" />
                  <span>Publish Review</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
