import React, { useState } from 'react';
import { GALLERY_ITEMS, GalleryItem } from '../data/hotelData';
import { Camera, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'rooms' | 'dining' | 'business' | 'facilities'>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredItems.length);
  };

  return (
    <section id="gallery" className="py-20 bg-stone-100 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wider uppercase text-amber-700 mb-2 flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5" />
              <span>Visual Tour</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Explore Regency Hotel
            </h2>
            <p className="mt-3 text-base text-stone-600 font-normal leading-relaxed">
              View photos of our rooms, suites, interiors, dining areas and hotel facilities. Get an authentic look at your upcoming Mumbai stay.
            </p>
          </div>

          {/* CTA: View Photos */}
          <div>
            <button
              onClick={() => openLightbox(0)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-md bg-stone-900 text-white hover:bg-stone-800 transition-colors shadow-sm whitespace-nowrap"
            >
              <Camera className="w-4 h-4" />
              <span>View Photos (Fullscreen)</span>
            </button>
          </div>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/80 rounded-lg w-fit max-w-full overflow-x-auto mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            All Photos
          </button>
          <button
            onClick={() => setActiveCategory('rooms')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeCategory === 'rooms'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            Rooms & Suites
          </button>
          <button
            onClick={() => setActiveCategory('dining')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeCategory === 'dining'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            Dining & Kitchen
          </button>
          <button
            onClick={() => setActiveCategory('business')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeCategory === 'business'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            Business & Boardrooms
          </button>
          <button
            onClick={() => setActiveCategory('facilities')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeCategory === 'facilities'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            Lobby & Facilities
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-xl overflow-hidden bg-stone-200 aspect-[4/3] cursor-pointer border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
              
              <div className="absolute top-3 right-3 p-2 rounded-full bg-stone-900/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>

              <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                <h3 className="font-serif text-base font-bold mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-300 line-clamp-1 font-light">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedPhotoIndex !== null && filteredItems[selectedPhotoIndex] && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-5xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            {/* Top controls */}
            <div className="w-full flex items-center justify-between text-white pb-3">
              <div className="text-sm font-medium">
                {filteredItems[selectedPhotoIndex].title}
                <span className="text-stone-400 text-xs ml-3 tabular-nums">
                  {selectedPhotoIndex + 1} / {filteredItems.length}
                </span>
              </div>
              <button
                onClick={closeLightbox}
                className="p-1.5 rounded-full hover:bg-stone-800 text-stone-300 hover:text-white transition-colors"
                aria-label="Close Gallery Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Image with Prev / Next */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[75vh] rounded-lg overflow-hidden bg-stone-900 flex items-center justify-center border border-stone-800">
              <img
                src={filteredItems[selectedPhotoIndex].image}
                alt={filteredItems[selectedPhotoIndex].title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />

              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white transition-colors shadow-md border border-stone-700"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white transition-colors shadow-md border border-stone-700"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Caption */}
            <div className="w-full pt-3 text-center text-stone-300 text-xs font-light">
              {filteredItems[selectedPhotoIndex].caption}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
