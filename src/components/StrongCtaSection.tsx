import React from 'react';
import { HOTEL_INFO } from '../data/hotelData';
import { MessageSquare, CalendarCheck, Phone, ShieldCheck, Sparkles, Check } from 'lucide-react';

interface StrongCtaSectionProps {
  onOpenBooking: () => void;
  onOpenInquiry: () => void;
}

export const StrongCtaSection: React.FC<StrongCtaSectionProps> = ({
  onOpenBooking,
  onOpenInquiry,
}) => {
  return (
    <section className="py-20 bg-stone-900 text-white relative overflow-hidden">
      {/* Decorative backdrop glow */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-amber-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-stone-800/40 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Kicker */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-300 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Direct Guest Privileges</span>
        </div>

        {/* Strong CTA Headline */}
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          Planning Your Stay in Mumbai?
        </h2>

        {/* Strong CTA Body text */}
        <p className="mt-5 text-base sm:text-lg text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
          Book your stay directly with Regency Hotel and get in touch with our team for availability, room details and booking assistance.
        </p>

        {/* Benefits bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-stone-300">
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-amber-400" />
            <span>Best Rate Guaranteed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-amber-400" />
            <span>Complimentary High-Speed Wi-Fi</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-amber-400" />
            <span>Flexible Free Cancellation</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-amber-400" />
            <span>Airport Pickup Assistance</span>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold rounded-md bg-amber-600 text-white hover:bg-amber-500 shadow-lg shadow-amber-950/50 transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Make Online Booking</span>
          </button>

          <a
            href={`https://wa.me/${HOTEL_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(HOTEL_INFO.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-md bg-emerald-600 text-white hover:bg-emerald-500 shadow-md transition-colors whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp the Hotel</span>
          </a>

          <a
            href={`tel:${HOTEL_INFO.phone}`}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-md bg-stone-800 text-stone-200 hover:bg-stone-700 border border-stone-700 transition-colors whitespace-nowrap"
          >
            <Phone className="w-4 h-4" />
            <span>Call {HOTEL_INFO.phone}</span>
          </a>
        </div>

        {/* Quiet assurance note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-stone-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>No credit card required for room inquiry · Instant WhatsApp booking assistance</span>
        </div>

      </div>
    </section>
  );
};
