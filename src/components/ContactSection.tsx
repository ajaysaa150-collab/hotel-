import React, { useState } from 'react';
import { HOTEL_INFO } from '../data/hotelData';
import { 
  MessageSquare, 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Navigation, 
  Copy, 
  Check 
} from 'lucide-react';

interface ContactSectionProps {
  onOpenInquiryModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenInquiryModal }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelDates: '',
    guestCount: '2 Guests',
    message: '',
  });

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(HOTEL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(HOTEL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-stone-50 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-amber-700 mb-2">
            Direct Reservations & Support
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Contact the Hotel Directly
          </h2>
          <p className="mt-3 text-base text-stone-600 font-normal leading-relaxed">
            Have a question or special request? Contact the hotel team directly. We assist with room reservations, corporate tie-ups, airport transfers, and group bookings.
          </p>
        </div>

        {/* The 4 Requested Contact Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {/* Button 1: WhatsApp the Hotel */}
          <a
            href={`https://wa.me/${HOTEL_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(HOTEL_INFO.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-emerald-900">WhatsApp the Hotel</span>
            <span className="text-[10px] text-emerald-700 mt-0.5">Quick chat reply</span>
          </a>

          {/* Button 2: Send an Inquiry */}
          <button
            onClick={onOpenInquiryModal}
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-amber-50 border border-amber-200 hover:bg-amber-100 hover:border-amber-300 transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-full bg-amber-700 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
              <Send className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-amber-900">Send an Inquiry</span>
            <span className="text-[10px] text-amber-700 mt-0.5">Form / Quote request</span>
          </button>

          {/* Button 3: Call the Hotel */}
          <a
            href={`tel:${HOTEL_INFO.phone}`}
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-stone-100 border border-stone-200 hover:bg-stone-200 hover:border-stone-300 transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-stone-900">Call the Hotel</span>
            <span className="text-[10px] text-stone-600 mt-0.5">{HOTEL_INFO.phone}</span>
          </a>

          {/* Button 4: Email Us */}
          <a
            href={`mailto:${HOTEL_INFO.email}?subject=Reservation%20Inquiry%20-%20Regency%20Hotel%20Mumbai`}
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-stone-100 border border-stone-200 hover:bg-stone-200 hover:border-stone-300 transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-stone-900">Email Us</span>
            <span className="text-[10px] text-stone-600 mt-0.5">24h email support</span>
          </a>
        </div>

        {/* 2-Column Section: Inquiry Form & Location/Transit Info */}
        <div id="location" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Inquiry Form */}
          <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
              Send an Online Inquiry
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Our reservations manager will respond within 2 hours with availability, custom corporate discounts, or special event quotes.
            </p>

            {formSubmitted ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center py-10">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                <h4 className="font-serif text-lg font-bold text-emerald-900">Inquiry Received</h4>
                <p className="text-xs text-emerald-800 mt-1 max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Our reservations desk at Regency Hotel Mumbai has received your details and will contact you at <strong>{formData.email}</strong> promptly.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', travelDates: '', guestCount: '2 Guests', message: '' });
                  }}
                  className="mt-5 px-4 py-2 text-xs font-semibold rounded-md bg-emerald-700 text-white hover:bg-emerald-800 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Vikram Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-600 font-sans"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-stone-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="e.g. vikram@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-600 font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-medium text-stone-700 mb-1">
                      Phone / Mobile *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      placeholder="+91 98200 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-600 font-sans"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-dates" className="block text-xs font-medium text-stone-700 mb-1">
                      Expected Travel Dates
                    </label>
                    <input
                      id="contact-dates"
                      type="text"
                      placeholder="e.g. 15th to 18th Oct"
                      value={formData.travelDates}
                      onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-600 font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-stone-700 mb-1">
                    Your Requirements / Special Requests
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    placeholder="Tell us about room preferences, airport pickup requirements, corporate rates, or extra bedding..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-600 font-sans"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-stone-500">
                    We respond within 2 hours.
                  </span>

                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-semibold rounded-md bg-stone-900 text-white hover:bg-stone-800 transition-colors shadow-sm"
                  >
                    Submit Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Hotel Details & Distance Matrix */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Address Card */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <h4 className="font-serif text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-700 shrink-0" />
                <span>Hotel Address & Location</span>
              </h4>

              <p className="text-xs text-stone-700 leading-relaxed font-medium mb-1">
                {HOTEL_INFO.name}
              </p>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                {HOTEL_INFO.location}
                <br />
                <span className="text-stone-500">{HOTEL_INFO.landmark}</span>
              </p>

              <div className="space-y-2 pt-3 border-t border-stone-100 text-xs text-stone-600">
                <div className="flex items-center justify-between">
                  <span>Front Desk Direct:</span>
                  <div className="flex items-center gap-1.5 font-medium text-stone-900">
                    <span>{HOTEL_INFO.phone}</span>
                    <button
                      onClick={handleCopyPhone}
                      className="p-1 hover:text-amber-700 text-stone-400"
                      title="Copy Phone"
                      aria-label="Copy phone number"
                    >
                      {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span>Email:</span>
                  <div className="flex items-center gap-1.5 font-medium text-stone-900 truncate">
                    <span className="truncate">{HOTEL_INFO.email}</span>
                    <button
                      onClick={handleCopyEmail}
                      className="p-1 hover:text-amber-700 text-stone-400"
                      title="Copy Email"
                      aria-label="Copy email address"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span>Check-in / Check-out:</span>
                  <span className="font-medium text-stone-900">{HOTEL_INFO.checkInTime} / {HOTEL_INFO.checkOutTime}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Regency Hotel Santacruz East Mumbai")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-amber-700" />
                  <span>Open Directions on Google Maps</span>
                </a>
              </div>
            </div>

            {/* Travel Distances Matrix */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <h4 className="font-serif text-base font-bold text-stone-900 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Travel Time & Proximity</span>
              </h4>

              <div className="space-y-2.5">
                {HOTEL_INFO.distances.map((dist, i) => (
                  <div key={i} className="flex items-center justify-between text-xs pb-1.5 border-b border-stone-100 last:border-b-0">
                    <span className="text-stone-700 truncate mr-2">{dist.destination}</span>
                    <div className="text-right shrink-0">
                      <span className="font-semibold text-stone-900">{dist.time}</span>
                      <span className="text-[10px] text-stone-400 block">{dist.distance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
