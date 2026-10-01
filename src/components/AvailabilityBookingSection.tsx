import React, { useState } from 'react';
import { ROOMS, Room } from '../data/hotelData';
import { Calendar, Users, CheckCircle2, Bed, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

interface AvailabilityBookingSectionProps {
  onBookOnline: (bookingData: {
    room: Room;
    checkIn: string;
    checkOut: string;
    guests: number;
    nights: number;
  }) => void;
  initialDates?: { checkIn: string; checkOut: string; guests: number };
}

export const AvailabilityBookingSection: React.FC<AvailabilityBookingSectionProps> = ({
  onBookOnline,
  initialDates,
}) => {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(initialDates?.checkIn || today);
  const [checkOut, setCheckOut] = useState(initialDates?.checkOut || tomorrow);
  const [guests, setGuests] = useState(initialDates?.guests || 2);
  const [selectedRoomCategory, setSelectedRoomCategory] = useState<string>('all');
  const [hasSearched, setHasSearched] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  // Calculate nights
  const calculateNights = (start: string, end: string) => {
    const d1 = new Date(start);
    const d2 = new Date(end);
    const diffTime = d2.getTime() - d1.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nights = calculateNights(checkIn, checkOut);

  const handleCheckAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 300);
  };

  const availableRooms = selectedRoomCategory === 'all'
    ? ROOMS
    : ROOMS.filter(r => r.category === selectedRoomCategory);

  return (
    <section id="availability" className="py-20 bg-white text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold tracking-wider uppercase text-amber-700 mb-2 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Direct Reservations</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Check Availability & Book
          </h2>
          <p className="mt-3 text-base text-stone-600 font-normal leading-relaxed">
            Check Room Availability. Enter your Check-in date, Check-out date and number of guests to find available rooms. Instant booking confirmation with zero booking fees.
          </p>
        </div>

        {/* Interactive Availability Form Card */}
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm mb-12">
          <form onSubmit={handleCheckAvailability}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              
              {/* Check-in */}
              <div>
                <label htmlFor="avail-checkin" className="block text-xs font-medium text-stone-700 mb-1.5">
                  Check-in Date
                </label>
                <div className="relative">
                  <input
                    id="avail-checkin"
                    type="date"
                    min={today}
                    value={checkIn}
                    onChange={(e) => {
                      setCheckIn(e.target.value);
                      if (e.target.value >= checkOut) {
                        const nextDay = new Date(new Date(e.target.value).getTime() + 86400000).toISOString().split('T')[0];
                        setCheckOut(nextDay);
                      }
                    }}
                    className="w-full bg-white border border-stone-300 rounded-lg px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 font-sans shadow-xs"
                    required
                  />
                </div>
              </div>

              {/* Check-out */}
              <div>
                <label htmlFor="avail-checkout" className="block text-xs font-medium text-stone-700 mb-1.5">
                  Check-out Date
                </label>
                <div className="relative">
                  <input
                    id="avail-checkout"
                    type="date"
                    min={checkIn}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-lg px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 font-sans shadow-xs"
                    required
                  />
                </div>
              </div>

              {/* Guests */}
              <div>
                <label htmlFor="avail-guests" className="block text-xs font-medium text-stone-700 mb-1.5">
                  Number of Guests
                </label>
                <div className="relative">
                  <select
                    id="avail-guests"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-white border border-stone-300 rounded-lg px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 font-sans shadow-xs"
                  >
                    <option value={1}>1 Guest (Solo / Executive)</option>
                    <option value={2}>2 Guests (Double)</option>
                    <option value={3}>3 Guests (Triple / Extra Bed)</option>
                    <option value={4}>4 Guests (Family / Suite)</option>
                  </select>
                </div>
              </div>

              {/* Room Type */}
              <div>
                <label htmlFor="avail-category" className="block text-xs font-medium text-stone-700 mb-1.5">
                  Room Category
                </label>
                <div className="relative">
                  <select
                    id="avail-category"
                    value={selectedRoomCategory}
                    onChange={(e) => setSelectedRoomCategory(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-lg px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 font-sans shadow-xs"
                  >
                    <option value="all">All Room Categories</option>
                    <option value="deluxe">Deluxe Rooms</option>
                    <option value="suite">Executive Suites</option>
                    <option value="executive">Business Executive</option>
                    <option value="twin">Twin Sharing</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Primary Action Buttons: Check Availability & Book Online */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-200">
              <div className="flex items-center gap-2 text-xs text-stone-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Stay Duration: <strong>{nights} {nights === 1 ? 'Night' : 'Nights'}</strong></span>
                <span className="text-stone-300">·</span>
                <span>Guests: <strong>{guests}</strong></span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isSearching}
                  className="px-6 py-2.5 text-xs font-semibold rounded-md bg-stone-900 text-white hover:bg-stone-800 transition-colors shadow-sm whitespace-nowrap"
                >
                  {isSearching ? 'Checking Rooms...' : 'Check Availability'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const firstRoom = availableRooms[0] || ROOMS[0];
                    onBookOnline({ room: firstRoom, checkIn, checkOut, guests, nights });
                  }}
                  className="px-6 py-2.5 text-xs font-semibold rounded-md bg-amber-600 text-white hover:bg-amber-500 transition-colors shadow-sm whitespace-nowrap"
                >
                  Book Online
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Results of Availability Check */}
        {hasSearched && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Rooms available for {checkIn} to {checkOut} ({nights} {nights === 1 ? 'Night' : 'Nights'})</span>
              </div>
              <span className="text-stone-400">Tariff displayed in INR (₹)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableRooms.map((room) => {
                const totalTariff = room.pricePerNight * nights;
                const estimatedTaxes = Math.round(totalTariff * 0.12);
                const grandTotal = totalTariff + estimatedTaxes;

                return (
                  <div
                    key={room.id}
                    className="border border-stone-200 rounded-xl p-5 hover:border-amber-400 transition-all bg-white flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <h3 className="font-serif text-lg font-bold text-stone-900">
                            {room.name}
                          </h3>
                          <p className="text-xs text-stone-500">{room.bedType} · {room.view}</p>
                        </div>
                        <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Instant Confirmation
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 my-4 bg-stone-50 p-3 rounded-lg">
                        <div>
                          <span className="text-stone-400 block text-[10px]">Per Night Tariff</span>
                          <span className="font-bold text-stone-900 tabular-nums">₹{room.pricePerNight.toLocaleString('en-IN')}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 block text-[10px]">Total for {nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                          <span className="font-bold text-stone-900 tabular-nums">₹{grandTotal.toLocaleString('en-IN')}</span>
                          <span className="text-[10px] text-stone-500 block">incl. 12% GST</span>
                        </div>
                      </div>

                      <div className="space-y-1 mb-5">
                        <div className="flex items-center gap-1.5 text-xs text-stone-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Complimentary High-Speed Wi-Fi</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-stone-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Free cancellation up to 24 hrs prior to check-in</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-stone-600">
                          <Tag className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>Special corporate tariff applied</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[11px] text-stone-500">Max Guests:</span>
                        <span className="text-xs font-semibold text-stone-800 ml-1">{room.maxGuests} Adults</span>
                      </div>

                      <button
                        onClick={() => onBookOnline({ room, checkIn, checkOut, guests, nights })}
                        className="px-4 py-2 text-xs font-semibold rounded-md bg-amber-600 text-white hover:bg-amber-500 transition-colors shadow-sm flex items-center gap-1.5"
                      >
                        <span>Book Online</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
