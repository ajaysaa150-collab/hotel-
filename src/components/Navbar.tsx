import React, { useState, useEffect } from 'react';
import { HOTEL_INFO } from '../data/hotelData';
import { Phone, MessageSquare, Menu, X, CalendarCheck } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenInquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenInquiry }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Rooms', href: '#rooms' },
    { name: 'Facilities', href: '#facilities' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Availability', href: '#availability' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-stone-900/95 backdrop-blur-md text-stone-100 shadow-md py-3 border-b border-stone-800'
          : 'bg-stone-950/80 backdrop-blur-sm text-stone-100 py-4 border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-white hover:text-amber-200 transition-colors"
          >
            {HOTEL_INFO.name}
          </a>

          {/* Zone 2: 4-6 nav links, single-line */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium tracking-wide">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-stone-300 hover:text-amber-300 transition-colors relative py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`https://wa.me/${HOTEL_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(HOTEL_INFO.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-md text-emerald-300 bg-emerald-950/70 border border-emerald-700/50 hover:bg-emerald-900/80 transition-colors whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md bg-amber-600 text-white hover:bg-amber-500 shadow-sm transition-colors whitespace-nowrap"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Book Online</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="sm:hidden px-3 py-1.5 text-xs font-semibold rounded bg-amber-600 text-white"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-stone-300 hover:text-white hover:bg-stone-800 transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-900 border-b border-stone-800 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-stone-300 hover:text-amber-300 py-1.5 text-sm font-medium border-b border-stone-800/60"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 px-4 text-center text-sm font-semibold rounded-md bg-amber-600 text-white hover:bg-amber-500 transition-colors"
            >
              Make Online Booking
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`https://wa.me/${HOTEL_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(HOTEL_INFO.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded-md bg-emerald-900/60 text-emerald-200 border border-emerald-700/60"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${HOTEL_INFO.phone}`}
                className="inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded-md bg-stone-800 text-stone-200 border border-stone-700"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Hotel</span>
              </a>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="w-full py-2 text-xs font-medium rounded text-stone-400 hover:text-stone-200"
            >
              Send an Inquiry
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
