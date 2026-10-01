import React from 'react';
import { Room } from '../data/hotelData';
import { X, Check, Bed, Users, Maximize2, ShieldCheck, CalendarCheck } from 'lucide-react';

interface RoomDetailModalProps {
  room: Room | null;
  onClose: () => void;
  onBookRoom: (room: Room) => void;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({
  room,
  onClose,
  onBookRoom,
}) => {
  if (!room) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-stone-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold">
              {room.name}
            </h3>
            <p className="text-xs text-stone-300">
              {room.tagline}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            aria-label="Close room details dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-stone-800">
          
          {/* Main Photo */}
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
            <img
              src={room.image}
              alt={room.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-3 left-4 bg-stone-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-white">
              <span className="font-serif text-lg font-bold tabular-nums">₹{room.pricePerNight.toLocaleString('en-IN')}</span>
              <span className="text-xs text-stone-300 font-light"> / night + taxes</span>
            </div>
          </div>

          {/* Quick Specs */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600 bg-stone-50 p-3.5 rounded-xl border border-stone-200">
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4 text-amber-700" />
              <span>Room Size: <strong>{room.sizeSqFt} sq. ft</strong></span>
            </div>
            <span className="text-stone-300">·</span>
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-amber-700" />
              <span>Bed: <strong>{room.bedType}</strong></span>
            </div>
            <span className="text-stone-300">·</span>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-700" />
              <span>Occupancy: <strong>Up to {room.maxGuests} Guests</strong></span>
            </div>
            <span className="text-stone-300">·</span>
            <span>View: <strong>{room.view}</strong></span>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-serif text-sm font-bold text-stone-900 mb-1.5">
              Room Overview
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {room.description}
            </p>
          </div>

          {/* Full Amenities */}
          <div>
            <h4 className="font-serif text-sm font-bold text-stone-900 mb-3">
              Room Amenities & Features
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {room.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stay policies & guarantees */}
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-stone-700 space-y-1.5">
            <div className="font-semibold text-amber-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>Stay Policies & Guarantees</span>
            </div>
            <p>• Check-in: 2:00 PM | Check-out: 11:00 AM (Early check-in subject to availability).</p>
            <p>• Valid government photo ID (Aadhaar / Passport / Driving License) required at check-in.</p>
            <p>• Free cancellation up to 24 hours prior to check-in date.</p>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-500 block">Direct Booking Tariff</span>
            <span className="font-serif text-lg font-bold text-stone-900 tabular-nums">
              ₹{room.pricePerNight.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-stone-500"> / night</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookRoom(room);
              }}
              className="px-5 py-2 text-xs font-semibold rounded-md bg-amber-600 text-white hover:bg-amber-500 transition-colors shadow-sm flex items-center gap-1.5"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Book This Room</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
