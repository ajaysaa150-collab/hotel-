import React, { useState } from 'react';
import { HOTEL_INFO } from '../data/hotelData';
import { 
  BedDouble, 
  CalendarSearch, 
  CreditCard, 
  Send, 
  MessageSquare, 
  MapPin, 
  Plane, 
  Building2, 
  ShieldCheck,
  Clock
} from 'lucide-react';

interface HeroProps {
  onViewRooms: () => void;
  onCheckAvailability: (dates?: { checkIn: string; checkOut: string; guests: number }) => void;
  onMakeOnlineBooking: () => void;
  onSendInquiry: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onViewRooms,
  onCheckAvailability,
  onMakeOnlineBooking,
  onSendInquiry,
}) => {
  // Default to today and tomorrow
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState(2);

  const handleHeroCheck = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckAvailability({ checkIn, checkOut, guests });
    const target = document.getElementById('availability');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-stone-950">
      {/* Background Hero Image with Luxury Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/regency_hotel_hero_1790838308415.jpg"
          alt="Regency Hotel Mumbai Entrance & Architecture in Santacruz East"
          className="w-full h-full object-cover object-center filter brightness-[0.45] scale-[1.02]"
          referrerPolicy="no-referrer"
        />
        {/* Measured Scrim for WCAG AA compliance */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/40" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white my-auto">
        {/* Subtle Location & Trust Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900/80 border border-stone-700/60 text-xs font-medium text-amber-300 mb-6 backdrop-blur-sm">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>Santacruz East, Mumbai</span>
          <span className="text-stone-500">·</span>
          <span>10 Mins from Airport</span>
          <span className="text-stone-500">·</span>
          <span>Close to BKC</span>
        </div>

        {/* Primary Headline with balanced wrap */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-tight">
          Comfortable Stay. Conveniently Located.
        </h1>

        {/* Narrative Value Proposition */}
        <p className="mt-5 text-base sm:text-lg text-stone-300 max-w-3xl mx-auto font-normal leading-relaxed">
          Experience a comfortable and convenient stay in Santacruz East, Mumbai, with easy access to the airport, BKC and major business destinations.
        </p>

        {/* Requested 5 Hero Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
          {/* Button 1: View Rooms */}
          <button
            onClick={onViewRooms}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-md bg-stone-800/90 text-stone-100 hover:bg-stone-700 border border-stone-600 shadow-sm transition-colors whitespace-nowrap"
          >
            <BedDouble className="w-4 h-4 text-amber-400" />
            <span>View Rooms</span>
          </button>

          {/* Button 2: Check Room Availability */}
          <button
            onClick={() => {
              const el = document.getElementById('availability');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-md bg-stone-800/90 text-stone-100 hover:bg-stone-700 border border-stone-600 shadow-sm transition-colors whitespace-nowrap"
          >
            <CalendarSearch className="w-4 h-4 text-amber-400" />
            <span>Check Room Availability</span>
          </button>

          {/* Button 3: Make Online Booking */}
          <button
            onClick={onMakeOnlineBooking}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-md bg-amber-600 text-white hover:bg-amber-500 shadow-md transition-colors whitespace-nowrap"
          >
            <CreditCard className="w-4 h-4" />
            <span>Make Online Booking</span>
          </button>

          {/* Button 4: Send an Inquiry */}
          <button
            onClick={onSendInquiry}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-md bg-stone-800/90 text-stone-100 hover:bg-stone-700 border border-stone-600 shadow-sm transition-colors whitespace-nowrap"
          >
            <Send className="w-4 h-4 text-stone-300" />
            <span>Send an Inquiry</span>
          </button>

          {/* Button 5: WhatsApp the Hotel */}
          <a
            href={`https://wa.me/${HOTEL_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(HOTEL_INFO.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-md bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm transition-colors whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp the Hotel</span>
          </a>
        </div>

        {/* Quick Instant Date Availability Bar */}
        <div className="mt-10 max-w-4xl mx-auto bg-stone-900/90 border border-stone-700/80 rounded-xl p-4 sm:p-5 shadow-2xl backdrop-blur-md">
          <form onSubmit={handleHeroCheck} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-left">
            <div>
              <label htmlFor="hero-checkin" className="block text-xs font-medium text-stone-400 mb-1">Check-in Date</label>
              <input
                id="hero-checkin"
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-stone-800/90 border border-stone-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 font-sans"
              />
            </div>

            <div>
              <label htmlFor="hero-checkout" className="block text-xs font-medium text-stone-400 mb-1">Check-out Date</label>
              <input
                id="hero-checkout"
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-stone-800/90 border border-stone-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 font-sans"
              />
            </div>

            <div>
              <label htmlFor="hero-guests" className="block text-xs font-medium text-stone-400 mb-1">Number of Guests</label>
              <select
                id="hero-guests"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-stone-800/90 border border-stone-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 font-sans"
              >
                <option value={1}>1 Guest (Single)</option>
                <option value={2}>2 Guests (Double)</option>
                <option value={3}>3 Guests (Triple)</option>
                <option value={4}>4+ Guests (Group)</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-md bg-amber-600 hover:bg-amber-500 text-white font-medium text-sm transition-colors flex items-center justify-center gap-1.5 h-[38px] whitespace-nowrap"
              >
                <CalendarSearch className="w-4 h-4" />
                <span>Search Rates</span>
              </button>
            </div>
          </form>
        </div>

        {/* Connectivity Highlights Micro-Grid */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-xs text-stone-400 border-t border-white/10 pt-6">
          <div className="flex items-center justify-center gap-2">
            <Plane className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-stone-300">10 Mins to Airport (T1/T2)</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-stone-300">12 Mins to BKC Hub</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-stone-300">24/7 Front Desk Check-in</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-stone-300">Direct Booking Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};
