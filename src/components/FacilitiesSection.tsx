import React from 'react';
import { FACILITIES, Facility } from '../data/hotelData';
import {
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
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface FacilitiesSectionProps {
  onOpenAllFacilities: () => void;
  onFacilityClick?: (facility: Facility) => void;
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({
  onOpenAllFacilities,
  onFacilityClick,
}) => {
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
    <section id="facilities" className="py-20 bg-stone-50 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wider uppercase text-amber-700 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Service Hospitality</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Hotel Facilities
            </h2>
            <p className="mt-3 text-base text-stone-600 font-normal leading-relaxed">
              Designed to cater to corporate executives, international transit travelers, and families visiting Mumbai. Every facility is maintained to high hospitality standards.
            </p>
          </div>

          <div>
            <button
              onClick={onOpenAllFacilities}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-md bg-stone-900 text-white hover:bg-stone-800 transition-colors shadow-sm whitespace-nowrap"
            >
              <span>View All Facilities</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Facilities Grid: 10 facilities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {FACILITIES.map((facility, index) => (
            <div
              key={facility.id}
              onClick={() => onFacilityClick && onFacilityClick(facility)}
              className="bg-white p-5 rounded-xl border border-stone-200 hover:border-amber-300 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors">
                  {getIcon(facility.icon)}
                </div>

                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h3 className="font-serif text-base font-bold text-stone-900 leading-snug">
                    {facility.title}
                  </h3>
                  <span className="text-[10px] font-mono text-stone-400">
                    0{index + 1}
                  </span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {facility.shortDesc}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px]">
                <span className="font-medium text-amber-800">{facility.highlight}</span>
                <span className="text-stone-400 group-hover:text-stone-700 transition-colors">Details →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Banner: Dining & Business Hub */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-stone-900 text-white rounded-xl overflow-hidden flex flex-col sm:flex-row items-center border border-stone-800">
            <div className="sm:w-1/2 w-full h-48 sm:h-full relative overflow-hidden">
              <img
                src="/src/assets/images/regency_dining_restaurant_1790838355113.jpg"
                alt="Regency Kitchen Restaurant Mumbai"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-stone-950/20" />
            </div>
            <div className="p-6 sm:w-1/2 flex flex-col justify-center">
              <div className="text-xs uppercase tracking-wider text-amber-400 font-medium mb-1">
                All-Day Dining
              </div>
              <h4 className="font-serif text-lg font-bold text-white mb-2">
                The Regency Kitchen
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed mb-4">
                Fresh daily breakfast buffet, Mughlai curries, local Mumbai street flavors, and global comfort food. Open for breakfast, lunch, and dinner.
              </p>
              <div className="text-xs text-stone-400">
                <span>Breakfast: 7:00 AM – 10:30 AM</span>
                <br />
                <span>Room Service: 24/7 Available</span>
              </div>
            </div>
          </div>

          <div className="bg-stone-900 text-white rounded-xl overflow-hidden flex flex-col sm:flex-row items-center border border-stone-800">
            <div className="sm:w-1/2 w-full h-48 sm:h-full relative overflow-hidden">
              <img
                src="/src/assets/images/regency_business_lounge_1790838366654.jpg"
                alt="Regency Hotel Mumbai Business Facilities"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-stone-950/20" />
            </div>
            <div className="p-6 sm:w-1/2 flex flex-col justify-center">
              <div className="text-xs uppercase tracking-wider text-amber-400 font-medium mb-1">
                Corporate Hub
              </div>
              <h4 className="font-serif text-lg font-bold text-white mb-2">
                Business & Boardrooms
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed mb-4">
                High-speed optical fiber, video presentation equipment, ergonomic conference seating, and printing services just 10 mins from BKC.
              </p>
              <div className="text-xs text-stone-400">
                <span>Boardroom: Up to 14 Seats</span>
                <br />
                <span>Audio/Visual Setup Included</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
