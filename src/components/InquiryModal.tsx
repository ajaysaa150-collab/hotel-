import React, { useState } from 'react';
import { HOTEL_INFO } from '../data/hotelData';
import { X, Send, CheckCircle2, MessageSquare, Phone, Mail } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [inquiryType, setInquiryType] = useState('Room Booking & Rates');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [travelDates, setTravelDates] = useState('');
  const [guestsOrRooms, setGuestsOrRooms] = useState('1 Room (2 Guests)');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);

    try {
      const payload = {
        name,
        email,
        phone,
        inquiryType,
        travelDates,
        guestsOrRooms,
        message: notes,
        inquiryDateTime: new Date().toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
          dateStyle: 'full',
          timeStyle: 'short',
        }),
      };

      const response = await fetch('/api/send-inquiry-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        console.error('Server returned non-200 status when sending inquiry email:', response.status, errJson);
      } else {
        const data = await response.json().catch(() => ({}));
        console.log('Inquiry email dispatch completed:', data);
      }
    } catch (err) {
      console.error('Failed to dispatch inquiry notification email:', err);
    }
  };

  const handleWhatsAppSend = () => {
    const text = `Inquiry from ${name}: Type: ${inquiryType}, Dates: ${travelDates}, Requirement: ${guestsOrRooms}, Phone: ${phone}, Note: ${notes}`;
    window.open(`https://wa.me/${HOTEL_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-stone-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div>
            <h3 className="font-serif text-lg font-bold">
              Send an Inquiry
            </h3>
            <p className="text-xs text-stone-300">
              Regency Hotel Mumbai · Reservations Desk
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            aria-label="Close inquiry dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1 text-stone-800">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-serif text-xl font-bold text-stone-900">
                Inquiry Successfully Sent!
              </h4>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                Thank you, <strong>{name}</strong>. Our front office manager has received your inquiry for <em>{inquiryType}</em> and will email or call you within 2 hours.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md bg-emerald-600 text-white hover:bg-emerald-500"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Forward Details via WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold rounded-md bg-stone-900 text-white hover:bg-stone-800"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Inquiry Category
                </label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                >
                  <option value="Room Booking & Rates">Room Booking & Tariff Inquiry</option>
                  <option value="Corporate Tie-up & Long Stay">Corporate Tie-up / Long Stay Rates</option>
                  <option value="Airport Pickup Assistance">Airport Transit & Pickup Assistance</option>
                  <option value="Conference & Meeting Boardroom">Business Boardroom & Meeting Space</option>
                  <option value="Group / Wedding Delegation">Group Booking / Family Stay</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="inquiry-name" className="block text-xs font-medium text-stone-700 mb-1">Full Name *</label>
                  <input
                    id="inquiry-name"
                    type="text"
                    required
                    placeholder="e.g. Rahul Mehta"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label htmlFor="inquiry-email" className="block text-xs font-medium text-stone-700 mb-1">Email Address *</label>
                  <input
                    id="inquiry-email"
                    type="email"
                    required
                    placeholder="rahul@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="inquiry-phone" className="block text-xs font-medium text-stone-700 mb-1">Mobile / WhatsApp *</label>
                  <input
                    id="inquiry-phone"
                    type="tel"
                    required
                    placeholder="+91 98200 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label htmlFor="inquiry-dates" className="block text-xs font-medium text-stone-700 mb-1">Expected Dates</label>
                  <input
                    id="inquiry-dates"
                    type="text"
                    placeholder="e.g. Next weekend or Oct 20-24"
                    value={travelDates}
                    onChange={(e) => setTravelDates(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="inquiry-notes" className="block text-xs font-medium text-stone-700 mb-1">
                  Message / Details
                </label>
                <textarea
                  id="inquiry-notes"
                  rows={3}
                  placeholder="Share details about your requirements, company name, or questions..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-semibold rounded-md bg-stone-900 text-white hover:bg-stone-800 transition-colors shadow-sm flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
