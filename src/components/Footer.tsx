import React from 'react';
import { HOTEL_INFO } from '../data/hotelData';
import { MapPin, Phone, Mail, MessageSquare } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenInquiry }) => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Col 1: Wordmark & Bio */}
          <div className="space-y-4 md:col-span-1">
            <a href="#" className="font-serif text-xl font-bold tracking-tight text-white block">
              {HOTEL_INFO.name}
            </a>
            <p className="text-stone-400 text-xs leading-relaxed">
              {HOTEL_INFO.tagline}
            </p>
            <p className="text-stone-400 text-xs leading-relaxed">
              Experience a comfortable and convenient stay in Santacruz East, Mumbai, with easy access to the airport, BKC and major business destinations.
            </p>
            <div className="pt-2">
              <span className="text-[11px] text-amber-400 font-medium">
                Direct Hotel Desk: 24/7 Available
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-white tracking-wide">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <a href="#rooms" className="hover:text-amber-300 transition-colors">
                  Explore Our Rooms
                </a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-amber-300 transition-colors">
                  Hotel Facilities
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-300 transition-colors">
                  Hotel Photo Gallery
                </a>
              </li>
              <li>
                <a href="#availability" className="hover:text-amber-300 transition-colors">
                  Check Room Availability
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-amber-300 transition-colors">
                  Guest Testimonials & Reviews
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-amber-300 transition-colors">
                  Location & Airport Distances
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-300 transition-colors">
                  Contact the Hotel Directly
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Booking & Guest Services */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-white tracking-wide">
              Guest Services
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Make Online Booking
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenInquiry}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Send Corporate Inquiry
                </button>
              </li>
              <li>
                <a
                  href={`https://wa.me/${HOTEL_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(HOTEL_INFO.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors inline-flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Concierge</span>
                </a>
              </li>
              <li>
                <span>Check-in: {HOTEL_INFO.checkInTime}</span>
              </li>
              <li>
                <span>Check-out: {HOTEL_INFO.checkOutTime}</span>
              </li>
              <li>
                <span>Airport Shuttle Assistance</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Address */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-white tracking-wide">
              Hotel Contact
            </h4>
            <div className="space-y-2 text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{HOTEL_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${HOTEL_INFO.phone}`} className="hover:text-white">
                  {HOTEL_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${HOTEL_INFO.email}`} className="hover:text-white truncate">
                  {HOTEL_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${HOTEL_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(HOTEL_INFO.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-md bg-stone-900 border border-stone-800 hover:border-emerald-600 text-stone-300 hover:text-emerald-400 flex items-center justify-center gap-2 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp the Hotel Team</span>
              </a>
            </div>
          </div>

        </div>

        {/* Quiet Bottom Legal Bar */}
        <div className="mt-12 pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} {HOTEL_INFO.name}. Santacruz East, Mumbai. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-stone-400 cursor-pointer">Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-stone-400 cursor-pointer">Terms of Stay</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-stone-400 cursor-pointer">Cancellation Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
