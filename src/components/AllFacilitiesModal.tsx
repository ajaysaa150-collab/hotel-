import React from 'react';
import { FACILITIES, Facility, HOTEL_INFO } from '../data/hotelData';
import { 
  X, 
  Wifi, 
  Wind, 
  Utensils, 
  Bell, 
  Car, 
  Briefcase, 
  Shirt, 
  Clock, 
  Dumbbell, 
  Plane,
  Sparkles,
  Phone,
  MessageSquare
} from 'lucide-react';

interface AllFacilitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFacility?: Facility | null;
}

export const AllFacilitiesModal: React.FC<AllFacilitiesModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wifi': return <Wifi className="w-5 h-5 text-amber-700" />;
      case 'Wind': return <Wind className="w-5 h-5 text-amber-700" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-amber-700" />;
      case 'Bell': return <Bell className="w-5 h-5 text-amber-700" />;
      case 'Car': return <Car className="w-5 h-5 text-amber-700" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-amber-700" />;
      case 'Shirt': return <Shirt className="w-5 h-5 text-amber-700" />;
      case 'Clock': return <Clock className="w-5 h-5 text-amber-700" />;
      case 'Dumbbell': return <Dumbbell className="w-5 h-5 text-amber-700" />;
      case 'Plane': return <Plane className="w-5 h-5 text-amber-700" />;
      default: return <Sparkles className="w-5 h-5 text-amber-700" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-stone-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold">
              Hotel Facilities & Amenities
            </h3>
            <p className="text-xs text-stone-300">
              Regency Hotel Mumbai · Santacruz East
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            aria-label="Close facilities dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <p className="text-xs text-stone-600 leading-relaxed">
            Every facility at Regency Hotel Mumbai has been configured for the modern traveler. Whether you are arriving late from Mumbai International Airport or setting off early for business meetings in BKC, our team and amenities provide uninterrupted support.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FACILITIES.map((facility, index) => (
              <div
                key={facility.id}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50 hover:bg-white hover:border-amber-300 transition-all flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                  {getIcon(facility.icon)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-serif text-sm font-bold text-stone-900">
                      {facility.title}
                    </h4>
                    <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {facility.highlight}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {facility.fullDesc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick concierge callout */}
          <div className="p-4 rounded-xl bg-stone-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h5 className="font-serif text-sm font-bold">Have a special facility request?</h5>
              <p className="text-xs text-stone-300">Contact our 24/7 concierge for late checkout, early breakfast boxes, or boardroom bookings.</p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`tel:${HOTEL_INFO.phone}`}
                className="px-3.5 py-2 text-xs font-semibold rounded-md bg-stone-800 text-stone-200 hover:bg-stone-700 flex items-center gap-1.5 whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Concierge</span>
              </a>
              <a
                href={`https://wa.me/${HOTEL_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  "Hello Regency Hotel, I would like to inquire about your business boardroom / facility bookings."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 text-xs font-semibold rounded-md bg-emerald-600 text-white hover:bg-emerald-500 flex items-center gap-1.5 whitespace-nowrap"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-stone-100 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-md bg-stone-900 text-white hover:bg-stone-800"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
