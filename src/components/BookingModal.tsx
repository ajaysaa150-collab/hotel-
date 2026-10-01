import React, { useState } from 'react';
import { Room, ROOMS, HOTEL_INFO } from '../data/hotelData';
import { 
  X, 
  CheckCircle2, 
  Calendar, 
  Users, 
  ShieldCheck, 
  Plane, 
  CreditCard, 
  Coffee,
  MessageSquare,
  Printer
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedRoom?: Room | null;
  initialDates?: { checkIn: string; checkOut: string; guests: number; nights?: number };
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedRoom,
  initialDates,
}) => {
  if (!isOpen) return null;

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    preSelectedRoom?.id || ROOMS[0].id
  );
  const [checkIn, setCheckIn] = useState(initialDates?.checkIn || today);
  const [checkOut, setCheckOut] = useState(initialDates?.checkOut || tomorrow);
  const [guests, setGuests] = useState(initialDates?.guests || 2);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Add-ons
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [addAirportPickup, setAddAirportPickup] = useState(false);
  const [flightNumber, setFlightNumber] = useState('');

  // Guest Details
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [bookingRef, setBookingRef] = useState('');

  // Calculate nights
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const diffDays = Math.max(1, Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)));
  const nights = isNaN(diffDays) ? 1 : diffDays;

  const selectedRoom = ROOMS.find(r => r.id === selectedRoomId) || ROOMS[0];

  const baseTariff = selectedRoom.pricePerNight * nights;
  const breakfastTotal = addBreakfast ? 450 * guests * nights : 0;
  const airportPickupCost = addAirportPickup ? 1200 : 0;
  const discount = couponApplied ? Math.round(baseTariff * 0.10) : 0;
  const subtotal = baseTariff + breakfastTotal + airportPickupCost - discount;
  const taxes = Math.round(subtotal * 0.12);
  const grandTotal = subtotal + taxes;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'REGENCYBKC' || couponCode.trim().toUpperCase() === 'AIRPORT5' || couponCode.trim().toUpperCase() === 'WELCOME10') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon. Try "REGENCYBKC" for 10% off');
    }
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) return;
    const ref = `RGM-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setStep(3);

    // Automatically send the complete booking details to the hotel and customer
    try {
      const payload = {
        bookingId: ref,
        guestName,
        guestEmail,
        guestPhone,
        roomType: selectedRoom.name,
        numberOfRooms: 1,
        numberOfGuests: guests,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        nights,
        specialRequests: specialRequests || 'None',
        totalAmount: `₹${grandTotal.toLocaleString('en-IN')}`,
        bookingDateTime: new Date().toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
          dateStyle: 'full',
          timeStyle: 'short',
        }),
        addOns: {
          breakfast: addBreakfast,
          airportPickup: addAirportPickup,
          flightNumber,
        },
      };

      await fetch('/api/send-booking-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error('Failed to dispatch booking notification emails:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-stone-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div>
            <h3 className="font-serif text-lg font-bold">
              {step === 3 ? 'Reservation Confirmed' : 'Make Online Booking'}
            </h3>
            <p className="text-xs text-stone-300">
              {HOTEL_INFO.name} · Santacruz East, Mumbai
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 text-stone-800">
          
          {/* STEP 1: Dates, Room, and Add-ons */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Room Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
                  1. Select Your Room
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ROOMS.map((room) => (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoomId(room.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selectedRoomId === room.id
                          ? 'border-amber-600 bg-amber-50/50 shadow-xs'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-serif text-sm font-bold text-stone-900">
                          {room.name}
                        </span>
                        <span className="text-xs font-bold text-amber-800 tabular-nums">
                          ₹{room.pricePerNight.toLocaleString('en-IN')}/nt
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1">{room.bedType} · {room.sizeSqFt} sq ft</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dates & Guests */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
                  2. Stay Dates & Guests
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="modal-checkin" className="block text-[11px] text-stone-500 mb-1">Check-in</label>
                    <input
                      id="modal-checkin"
                      type="date"
                      min={today}
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="modal-checkout" className="block text-[11px] text-stone-500 mb-1">Check-out</label>
                    <input
                      id="modal-checkout"
                      type="date"
                      min={checkIn}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="modal-guests" className="block text-[11px] text-stone-500 mb-1">Guests</label>
                    <select
                      id="modal-guests"
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
                  3. Optional Enhancements
                </label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 rounded-xl border border-stone-200 hover:bg-stone-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addBreakfast}
                        onChange={(e) => setAddBreakfast(e.target.checked)}
                        className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                      />
                      <div>
                        <div className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
                          <Coffee className="w-3.5 h-3.5 text-amber-700" />
                          <span>Gourmet Buffet Breakfast</span>
                        </div>
                        <p className="text-[11px] text-stone-500">Fresh fruit, Indian delicacies & hot eggs served daily</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-stone-800">
                      ₹450 / guest / night
                    </span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-stone-200 hover:bg-stone-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addAirportPickup}
                        onChange={(e) => setAddAirportPickup(e.target.checked)}
                        className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                      />
                      <div>
                        <div className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
                          <Plane className="w-3.5 h-3.5 text-amber-700" />
                          <span>Airport Chauffeur Pickup (T1 or T2)</span>
                        </div>
                        <p className="text-[11px] text-stone-500">Chauffeur meets you at arrival terminal with your name placard</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-stone-800">
                      ₹1,200 fixed
                    </span>
                  </label>
                </div>
              </div>

              {/* Price Overview Banner */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-500 block">Stay: {nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                  <span className="font-serif text-xl font-bold text-stone-900 tabular-nums">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-stone-500 ml-1.5">incl. taxes</span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 text-xs font-semibold rounded-md bg-amber-600 text-white hover:bg-amber-500 transition-colors shadow-sm"
                >
                  Continue to Guest Details →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Guest Information & Confirmation */}
          {step === 2 && (
            <form onSubmit={handleConfirmBooking} className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div>
                  <h4 className="font-serif text-base font-bold text-stone-900">{selectedRoom.name}</h4>
                  <p className="text-xs text-stone-500">{checkIn} to {checkOut} · {nights} {nights === 1 ? 'Night' : 'Nights'} · {guests} Guests</p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-amber-700 hover:underline"
                >
                  Edit Dates/Room
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="booking-name" className="block text-xs font-medium text-stone-700 mb-1">
                    Primary Guest Name *
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    required
                    placeholder="Full Name as on Govt ID"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label htmlFor="booking-email" className="block text-xs font-medium text-stone-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    required
                    placeholder="For booking voucher & invoice"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label htmlFor="booking-phone" className="block text-xs font-medium text-stone-700 mb-1">
                    Mobile Phone / WhatsApp *
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    required
                    placeholder="+91 98200 12345"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                {addAirportPickup && (
                  <div>
                    <label htmlFor="booking-flight" className="block text-xs font-medium text-stone-700 mb-1">
                      Flight Number / Arrival Time
                    </label>
                    <input
                      id="booking-flight"
                      type="text"
                      placeholder="e.g. 6E 5212 at 4:30 PM"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                    />
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="booking-special" className="block text-xs font-medium text-stone-700 mb-1">
                  Special Requests (Optional)
                </label>
                <input
                  id="booking-special"
                  type="text"
                  placeholder="e.g. Quiet floor, early check-in, twin bed setup"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              {/* Coupon Code section */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g. REGENCYBKC)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={couponApplied}
                    className="flex-1 uppercase bg-white border border-stone-300 rounded-md px-3 py-1.5 text-xs font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={couponApplied || !couponCode}
                    className="px-3 py-1.5 text-xs font-medium rounded-md bg-stone-800 text-white hover:bg-stone-700 disabled:opacity-50"
                  >
                    {couponApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-[11px] text-emerald-600 mt-1 font-medium">✓ Promo code REGENCYBKC applied: 10% discount!</p>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-600 mt-1">{couponError}</p>
                )}
              </div>

              {/* Price breakdown summary */}
              <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200 pt-3">
                <div className="flex justify-between">
                  <span>Room Tariff ({nights} nights × ₹{selectedRoom.pricePerNight})</span>
                  <span className="tabular-nums">₹{baseTariff.toLocaleString('en-IN')}</span>
                </div>
                {addBreakfast && (
                  <div className="flex justify-between">
                    <span>Buffet Breakfast ({guests} guests × {nights} days)</span>
                    <span className="tabular-nums">₹{breakfastTotal.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {addAirportPickup && (
                  <div className="flex justify-between">
                    <span>Airport Chauffeur Transfer</span>
                    <span className="tabular-nums">₹{airportPickupCost.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {couponApplied && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Promotional Discount (10%)</span>
                    <span className="tabular-nums">-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Taxes & GST (12%)</span>
                  <span className="tabular-nums">₹{taxes.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 border-t border-stone-200 pt-2">
                  <span>Grand Total to Pay at Check-in</span>
                  <span className="tabular-nums">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                >
                  ← Back
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold rounded-md bg-amber-600 text-white hover:bg-amber-500 transition-colors shadow-sm"
                >
                  Confirm Booking (Pay at Hotel)
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Booking Success Voucher */}
          {step === 3 && (
            <div className="text-center py-4 space-y-5">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <h4 className="font-serif text-2xl font-bold text-stone-900">
                  Booking Confirmed!
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  A confirmation voucher has been generated and sent to <strong>{guestEmail}</strong>.
                </p>
              </div>

              {/* Voucher Ticket Card */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 text-left text-xs space-y-3 font-sans">
                <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Booking Reference</span>
                  <span className="font-mono font-bold text-amber-800 text-sm">{bookingRef}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-stone-400 block text-[10px]">Guest Name</span>
                    <span className="font-semibold text-stone-800">{guestName}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Contact</span>
                    <span className="font-semibold text-stone-800">{guestPhone}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Room Type</span>
                    <span className="font-semibold text-stone-800">{selectedRoom.name}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Dates & Stay</span>
                    <span className="font-semibold text-stone-800">{checkIn} to {checkOut} ({nights} nt)</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Total Amount</span>
                    <span className="font-bold text-stone-900">₹{grandTotal.toLocaleString('en-IN')} (Pay at Hotel)</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Payment Policy</span>
                    <span className="font-medium text-emerald-700">Zero Advance Required</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/${HOTEL_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hello Regency Hotel, I have booked room ${selectedRoom.name} with reference ${bookingRef} for guest ${guestName} (${checkIn} to ${checkOut}). Please confirm airport reception.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md bg-emerald-600 text-white hover:bg-emerald-500"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Send Confirmation on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md bg-stone-200 text-stone-800 hover:bg-stone-300"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Voucher</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold rounded-md bg-stone-900 text-white hover:bg-stone-800"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
