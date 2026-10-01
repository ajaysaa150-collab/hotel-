import React from 'react';
import { Testimonial } from '../data/hotelData';
import { Star, CheckCircle2, MessageSquarePlus, Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  onOpenSubmitReview: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  onOpenSubmitReview,
}) => {
  return (
    <section id="testimonials" className="py-20 bg-stone-50 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wider uppercase text-amber-700 mb-2">
              Guest Experiences & Ratings
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              What Our Guests Say
            </h2>
            <p className="mt-3 text-base text-stone-600 font-normal leading-relaxed">
              Read authentic feedback from corporate executives, airport transit guests, and families who stayed at Regency Hotel Mumbai in Santacruz East.
            </p>
          </div>

          {/* CTA: Submit Your Review */}
          <div>
            <button
              onClick={onOpenSubmitReview}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-md bg-stone-900 text-white hover:bg-stone-800 transition-colors shadow-sm whitespace-nowrap"
            >
              <MessageSquarePlus className="w-4 h-4 text-amber-400" />
              <span>Submit Your Review</span>
            </button>
          </div>
        </div>

        {/* Rating Trust Bar (Clean typographic social proof, no candy pills) */}
        <div className="bg-white border border-stone-200 rounded-xl p-5 mb-10 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-3xl font-bold text-stone-900 tabular-nums">4.9</span>
              <span className="text-xs text-stone-400 font-light">/ 5.0</span>
            </div>
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <div className="text-xs text-stone-600">
              Based on <strong>480+ Verified Guest Stays</strong>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500">
            <span>Cleanliness: <strong>4.9/5</strong></span>
            <span aria-hidden="true">·</span>
            <span>Airport & BKC Proximity: <strong>5.0/5</strong></span>
            <span aria-hidden="true">·</span>
            <span>Staff Hospitality: <strong>4.9/5</strong></span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Stars & Room / Date */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>

                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span>{item.roomStayed}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.date}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif text-base font-bold text-stone-900 mb-2 leading-snug">
                  "{item.title}"
                </h3>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6 font-normal">
                  {item.quote}
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-serif font-bold text-xs shrink-0">
                    {item.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
                      <span>{item.author}</span>
                      {item.verified && (
                        <span title="Verified Stay" className="inline-flex items-center text-emerald-600">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      {item.designation} · {item.city}
                    </p>
                  </div>
                </div>

                <div className="text-stone-300">
                  <Quote className="w-5 h-5 text-stone-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action for Review Submissions */}
        <div className="mt-12 bg-stone-100 border border-stone-200 rounded-xl p-6 sm:p-8 text-center max-w-3xl mx-auto">
          <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
            Stayed with Regency Hotel Mumbai Recently?
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mb-5 max-w-xl mx-auto">
            Your impressions help other travelers choose their ideal Santacruz stay. Share your review on room comfort, breakfast, or airport assistance.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenSubmitReview}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold rounded-md bg-amber-600 text-white hover:bg-amber-500 transition-colors shadow-sm"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write a Guest Review</span>
            </button>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Regency+Hotel+Santacruz+East+Mumbai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-md bg-white border border-stone-300 text-stone-800 hover:bg-stone-50 transition-colors"
            >
              <span>Review on Google Maps</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
