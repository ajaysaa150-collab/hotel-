import React, { useState } from 'react';
import { ROOMS, Room } from '../data/hotelData';
import { Bed, Users, Maximize2, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface RoomsSectionProps {
  onSelectRoomToBook: (room: Room) => void;
  onOpenRoomDetails: (room: Room) => void;
  onOpenFacilitiesModal: () => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({
  onSelectRoomToBook,
  onOpenRoomDetails,
  onOpenFacilitiesModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'deluxe' | 'executive' | 'suite' | 'twin'>('all');

  const filteredRooms = activeCategory === 'all'
    ? ROOMS
    : ROOMS.filter(r => r.category === activeCategory);

  return (
    <section id="rooms" className="py-20 bg-stone-100 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-amber-700 mb-2">
            Comfort & Elegance in Santacruz East
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Explore Our Rooms
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600 font-normal leading-relaxed">
            Discover our comfortable rooms and suites, designed for business and leisure travellers. Equipped with modern comforts, ergonomic work desks, and quiet soundproofing.
          </p>
          
          <div className="mt-4 flex items-center gap-4 text-xs text-stone-500">
            <span>View Rooms & Facilities</span>
            <span aria-hidden="true">·</span>
            <span>Free High-Speed Wi-Fi</span>
            <span aria-hidden="true">·</span>
            <span>24/7 Room Service</span>
            <span aria-hidden="true">·</span>
            <span>Complimentary Mineral Water</span>
          </div>
        </div>

        {/* Interactive Filter Tabs (Segmented control) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-1.5 p-1 bg-stone-200/80 rounded-lg max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              All Rooms ({ROOMS.length})
            </button>
            <button
              onClick={() => setActiveCategory('deluxe')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeCategory === 'deluxe'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              Deluxe
            </button>
            <button
              onClick={() => setActiveCategory('suite')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeCategory === 'suite'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              Suites
            </button>
            <button
              onClick={() => setActiveCategory('executive')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeCategory === 'executive'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              Business Executive
            </button>
            <button
              onClick={() => setActiveCategory('twin')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeCategory === 'twin'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              Twin Sharing
            </button>
          </div>

          <button
            onClick={onOpenFacilitiesModal}
            className="text-xs font-semibold text-amber-800 hover:text-amber-900 flex items-center gap-1.5 underline underline-offset-4"
          >
            <span>View All Hotel Facilities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredRooms.map((room) => (
            <article
              key={room.id}
              className="bg-white rounded-xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Image slot with styled fallback container and ratio */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-200 group">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Price in image corner */}
                <div className="absolute bottom-3 left-4 text-white">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl font-bold text-white tabular-nums">
                      ₹{room.pricePerNight.toLocaleString('en-IN')}
                    </span>
                    <span className="text-stone-300 line-through text-xs tabular-nums">
                      ₹{room.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-stone-300 font-light">/ night + taxes</span>
                  </div>
                </div>

                {room.popular && (
                  <div className="absolute top-3 right-3 bg-amber-600 text-white text-[11px] font-semibold px-2.5 py-1 rounded shadow-sm">
                    Most Popular
                  </div>
                )}
              </div>

              {/* Room Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-stone-900 mb-1">
                    {room.name}
                  </h3>
                  <p className="text-xs text-amber-800 font-medium mb-3">
                    {room.tagline}
                  </p>

                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mb-4 pb-4 border-b border-stone-100">
                    <span className="inline-flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5 text-stone-400" />
                      <span>{room.sizeSqFt} sq.ft</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <Bed className="w-3.5 h-3.5 text-stone-400" />
                      <span>{room.bedType}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-stone-400" />
                      <span>Up to {room.maxGuests} Guests</span>
                    </span>
                  </div>

                  <p className="text-sm text-stone-600 leading-relaxed mb-4">
                    {room.description}
                  </p>

                  {/* Amenities Highlights (4 items) */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {room.amenities.slice(0, 4).map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Footprint */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onOpenRoomDetails(room)}
                    className="text-xs font-semibold text-stone-700 hover:text-stone-950 transition-colors py-2 px-3 rounded hover:bg-stone-50"
                  >
                    View Details & Photos
                  </button>

                  <button
                    onClick={() => onSelectRoomToBook(room)}
                    className="px-4 py-2 text-xs font-semibold rounded-md bg-stone-900 text-white hover:bg-stone-800 transition-colors shadow-sm whitespace-nowrap"
                  >
                    Book This Room
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA: View Rooms Footer strip */}
        <div className="mt-12 bg-white rounded-xl p-6 border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-900">Direct Booking Benefits</h4>
              <p className="text-xs text-stone-500">Guaranteed lowest tariff, complimentary Wi-Fi, flexible cancellation & priority check-in assistance.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                const el = document.getElementById('availability');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold rounded-md bg-amber-600 text-white hover:bg-amber-500 transition-colors whitespace-nowrap text-center"
            >
              Check Availability & Rates
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
