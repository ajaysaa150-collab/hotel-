import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RoomsSection } from './components/RoomsSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { GallerySection } from './components/GallerySection';
import { AvailabilityBookingSection } from './components/AvailabilityBookingSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { StrongCtaSection } from './components/StrongCtaSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { InquiryModal } from './components/InquiryModal';
import { AllFacilitiesModal } from './components/AllFacilitiesModal';
import { RoomDetailModal } from './components/RoomDetailModal';
import { SubmitReviewModal } from './components/SubmitReviewModal';
import { Room, HOTEL_INFO, TESTIMONIALS, Testimonial } from './data/hotelData';
import { MessageSquare, Phone } from 'lucide-react';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [allFacilitiesModalOpen, setAllFacilitiesModalOpen] = useState(false);
  const [submitReviewModalOpen, setSubmitReviewModalOpen] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);
  const [selectedRoomForDetails, setSelectedRoomForDetails] = useState<Room | null>(null);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(null);
  const [bookingDates, setBookingDates] = useState<{
    checkIn: string;
    checkOut: string;
    guests: number;
    nights?: number;
  }>({
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    guests: 2,
    nights: 1,
  });

  const handleOpenBooking = () => {
    setSelectedRoomForBooking(null);
    setBookingModalOpen(true);
  };

  const handleSelectRoomToBook = (room: Room) => {
    setSelectedRoomForBooking(room);
    setBookingModalOpen(true);
  };

  const handleBookWithDates = (data: {
    room: Room;
    checkIn: string;
    checkOut: string;
    guests: number;
    nights: number;
  }) => {
    setSelectedRoomForBooking(data.room);
    setBookingDates({
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guests: data.guests,
      nights: data.nights,
    });
    setBookingModalOpen(true);
  };

  const handleViewRooms = () => {
    const el = document.getElementById('rooms');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHeroCheckAvailability = (dates?: { checkIn: string; checkOut: string; guests: number }) => {
    if (dates) {
      setBookingDates({
        checkIn: dates.checkIn,
        checkOut: dates.checkOut,
        guests: dates.guests,
      });
    }
  };

  const handleAddReview = (newReview: Testimonial) => {
    setTestimonials((prev) => [newReview, ...prev]);
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-amber-800 selection:text-white">
      {/* Navigation */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenInquiry={() => setInquiryModalOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        onViewRooms={handleViewRooms}
        onCheckAvailability={handleHeroCheckAvailability}
        onMakeOnlineBooking={handleOpenBooking}
        onSendInquiry={() => setInquiryModalOpen(true)}
      />

      {/* 🛏️ Explore Our Rooms */}
      <RoomsSection
        onSelectRoomToBook={handleSelectRoomToBook}
        onOpenRoomDetails={(room) => setSelectedRoomForDetails(room)}
        onOpenFacilitiesModal={() => setAllFacilitiesModalOpen(true)}
      />

      {/* ✨ Hotel Facilities */}
      <FacilitiesSection
        onOpenAllFacilities={() => setAllFacilitiesModalOpen(true)}
        onFacilityClick={() => setAllFacilitiesModalOpen(true)}
      />

      {/* 📸 Hotel Gallery */}
      <GallerySection />

      {/* 📅 Check Availability & Book */}
      <AvailabilityBookingSection
        onBookOnline={handleBookWithDates}
        initialDates={bookingDates}
      />

      {/* ⭐ Testimonials & Reviews */}
      <TestimonialsSection
        testimonials={testimonials}
        onOpenSubmitReview={() => setSubmitReviewModalOpen(true)}
      />

      {/* 💬 Contact the Hotel Directly & Location */}
      <ContactSection
        onOpenInquiryModal={() => setInquiryModalOpen(true)}
      />

      {/* 📲 Strong CTA */}
      <StrongCtaSection
        onOpenBooking={handleOpenBooking}
        onOpenInquiry={() => setInquiryModalOpen(true)}
      />

      {/* Footer */}
      <Footer
        onOpenBooking={handleOpenBooking}
        onOpenInquiry={() => setInquiryModalOpen(true)}
      />

      {/* Floating Quick Action Widget for Instant Assistance */}
      <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-2.5">
        <a
          href={`https://wa.me/${HOTEL_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(HOTEL_INFO.whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-500 transition-all hover:scale-105 group border border-emerald-400/40"
          aria-label="WhatsApp Hotel Reservations Desk"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-xs font-semibold hidden sm:inline whitespace-nowrap">
            Chat on WhatsApp
          </span>
        </a>

        <a
          href={`tel:${HOTEL_INFO.phone}`}
          className="sm:hidden flex items-center justify-center w-11 h-11 rounded-full bg-stone-900 text-white shadow-lg hover:bg-stone-800 transition-transform"
          aria-label="Call Hotel Desk"
        >
          <Phone className="w-5 h-5 text-amber-400" />
        </a>
      </div>

      {/* Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preSelectedRoom={selectedRoomForBooking}
        initialDates={bookingDates}
      />

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
      />

      <AllFacilitiesModal
        isOpen={allFacilitiesModalOpen}
        onClose={() => setAllFacilitiesModalOpen(false)}
      />

      <RoomDetailModal
        room={selectedRoomForDetails}
        onClose={() => setSelectedRoomForDetails(null)}
        onBookRoom={handleSelectRoomToBook}
      />

      <SubmitReviewModal
        isOpen={submitReviewModalOpen}
        onClose={() => setSubmitReviewModalOpen(false)}
        onSubmitReview={handleAddReview}
      />
    </div>
  );
}

