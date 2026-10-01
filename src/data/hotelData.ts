export interface Room {
  id: string;
  name: string;
  category: 'deluxe' | 'executive' | 'suite' | 'twin';
  tagline: string;
  pricePerNight: number;
  originalPrice: number;
  sizeSqFt: number;
  maxGuests: number;
  bedType: string;
  view: string;
  image: string;
  description: string;
  amenities: string[];
  popular?: boolean;
}

export interface Facility {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  highlight: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'rooms' | 'dining' | 'business' | 'facilities';
  image: string;
  caption: string;
}

export interface Testimonial {
  id: string;
  author: string;
  designation: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  quote: string;
  roomStayed: string;
  verified: boolean;
}

export const HOTEL_INFO = {
  name: "Regency Hotel Mumbai",
  tagline: "Comfortable Stay. Conveniently Located.",
  location: "Santacruz East, Mumbai, Maharashtra 400055, India",
  landmark: "Near Western Express Highway & Santacruz Station, Minutes from BKC & Airport",
  phone: "+91 22 2618 3000",
  altPhone: "+91 98200 45678",
  whatsapp: "+919820045678",
  whatsappMessage: "Hello Regency Hotel Mumbai, I would like to inquire about room availability and corporate booking rates.",
  email: "reservations@regencyhotelmumbai.com",
  inquiryEmail: "frontdesk@regencyhotelmumbai.com",
  checkInTime: "14:00 (2:00 PM)",
  checkOutTime: "11:00 (11:00 AM)",
  receptionHours: "24 Hours / 7 Days a week",
  distances: [
    { destination: "Chhatrapati Shivaji Maharaj International Airport (T2)", distance: "5.8 km", time: "12-15 mins" },
    { destination: "Mumbai Domestic Airport (T1 Santacruz)", distance: "3.2 km", time: "8-10 mins" },
    { destination: "Bandra Kurla Complex (BKC) Financial Hub", distance: "4.1 km", time: "10-12 mins" },
    { destination: "Santacruz Railway Station (Western Line)", distance: "0.9 km", time: "3 mins" },
    { destination: "Juhu Beach & Lifestyle Promenade", distance: "4.5 km", time: "15 mins" },
    { destination: "Western Express Highway (WEH)", distance: "300 meters", time: "1 min" },
  ]
};

export const ROOMS: Room[] = [
  {
    id: "deluxe-king",
    name: "Deluxe King Room",
    category: "deluxe",
    tagline: "Refined comfort with an executive work station",
    pricePerNight: 4200,
    originalPrice: 5200,
    sizeSqFt: 280,
    maxGuests: 2,
    bedType: "1 Plush King Bed",
    view: "City View",
    image: "/src/assets/images/regency_deluxe_room_1790838322677.jpg",
    description: "Designed for business travelers and couples seeking contemporary elegance. Features ergonomic desk, premium mattress, silent split air-conditioning, and high-speed Wi-Fi.",
    amenities: [
      "High-Speed Free Wi-Fi",
      "Individual Climate Control AC",
      "43\" Smart HD LED TV",
      "Ergonomic Business Work Desk",
      "Tea & Coffee Maker",
      "Rainfall Shower & Bath Toiletries",
      "Electronic Safe Box",
      "Daily Housekeeping & Mineral Water"
    ],
    popular: true
  },
  {
    id: "executive-suite",
    name: "Regency Executive Suite",
    category: "suite",
    tagline: "Expansive luxury with separate living & boardroom lounge",
    pricePerNight: 7500,
    originalPrice: 9500,
    sizeSqFt: 460,
    maxGuests: 3,
    bedType: "1 Master King Bed + Sofa Bed",
    view: "Panoramic Skyline View",
    image: "/src/assets/images/regency_executive_suite_1790838339243.jpg",
    description: "Our signature suite offering a generous separate living area, plush designer sofa, executive boardroom work table, walk-in closet, and VIP concierge services.",
    amenities: [
      "Separate Living Room & Master Bedroom",
      "Complimentary Airport Transfer Assistance",
      "55\" Smart 4K TV with Streaming",
      "Mini Bar & Nespresso Coffee Setup",
      "Bathtub & Rainfall Shower",
      "Complimentary Buffet Breakfast",
      "24/7 Dedicated Butler & Room Service",
      "Express Laundry & Pressing (2 pcs/day)"
    ],
    popular: false
  },
  {
    id: "premium-business",
    name: "Premium Business Room",
    category: "executive",
    tagline: "Optimized for corporate executives visiting BKC & Santacruz",
    pricePerNight: 5100,
    originalPrice: 6300,
    sizeSqFt: 340,
    maxGuests: 2,
    bedType: "1 King Bed or 2 Single Beds",
    view: "Skyline & Garden View",
    image: "/src/assets/images/regency_hotel_hero_1790838308415.jpg",
    description: "Equipped with high-speed fiber internet, executive workstation with universal power sockets, soundproof double-glazed windows, and complimentary gourmet breakfast.",
    amenities: [
      "High-Speed Fiber Wi-Fi (100 Mbps)",
      "Dedicated Workstation & Universal Plugs",
      "Soundproof Double Glazing Windows",
      "Complimentary Buffet Breakfast",
      "Ironing Board & Steam Press",
      "In-room Electronic Digital Safe",
      "24-Hour In-Room Dining Service",
      "Doctor on Call & Front Desk Concierge"
    ]
  },
  {
    id: "club-twin",
    name: "Club Twin Room",
    category: "twin",
    tagline: "Comfortable twin accommodations for colleagues or friends",
    pricePerNight: 3900,
    originalPrice: 4800,
    sizeSqFt: 270,
    maxGuests: 2,
    bedType: "2 Cozy Single Beds",
    view: "City View",
    image: "/src/assets/images/regency_deluxe_room_1790838322677.jpg",
    description: "Thoughtfully configured with two twin single beds, personalized reading lamps, en-suite glass shower cubicle, and fast Wi-Fi for seamless connectivity.",
    amenities: [
      "Two Separate Single Beds",
      "Split Air-Conditioner",
      "High-Speed Wi-Fi",
      "Compact Work Desk",
      "Satellite Cable LED TV",
      "Private En-suite Bathroom",
      "Fresh Towels & Premium Linens",
      "Complimentary Tea/Coffee Tray"
    ]
  }
];

export const FACILITIES: Facility[] = [
  {
    id: "wifi",
    title: "Free Wi-Fi",
    shortDesc: "High-speed optical fiber wireless network across all rooms and public spaces.",
    fullDesc: "Stay seamlessly connected with complimentary 100 Mbps dedicated optical fiber Wi-Fi. Ideal for uninterrupted video conferences, streaming, and business email exchange throughout the hotel premises.",
    icon: "Wifi",
    highlight: "100 Mbps Speed"
  },
  {
    id: "ac",
    title: "Air-Conditioned Rooms",
    shortDesc: "Individual climate-controlled air-conditioning with quiet compressor technology.",
    fullDesc: "Every room and suite is equipped with independent modern split air conditioning, allowing you to personalize the room temperature to your exact comfort 24/7.",
    icon: "Wind",
    highlight: "Individual Climate Control"
  },
  {
    id: "restaurant",
    title: "Restaurant",
    shortDesc: "All-day dining multi-cuisine restaurant serving authentic Indian and global cuisine.",
    fullDesc: "The Regency Kitchen offers wholesome breakfast spreads, traditional Mumbai delicacies, authentic North & South Indian dishes, plus Continental and Asian comfort food prepared fresh by seasoned chefs.",
    icon: "Utensils",
    highlight: "Multi-Cuisine & Buffet"
  },
  {
    id: "room-service",
    title: "Room Service",
    shortDesc: "Round-the-clock 24/7 in-room culinary service delivered to your door.",
    fullDesc: "Enjoy warm meals, fresh snacks, hot coffee, and late-night supper from our extensive in-room dining menu, delivered right to your bed or work desk at any hour of the night.",
    icon: "Bell",
    highlight: "24/7 In-Room Dining"
  },
  {
    id: "parking",
    title: "Parking",
    shortDesc: "Complimentary secure valet and self-parking for all registered guests.",
    fullDesc: "Travel with peace of mind. Our property offers on-site private parking with 24/7 CCTV surveillance, security guards, and professional valet service upon arrival.",
    icon: "Car",
    highlight: "Free Secure Valet"
  },
  {
    id: "business",
    title: "Business Facilities",
    shortDesc: "Conference boardroom, high-speed printing, scanning, and corporate meeting setups.",
    fullDesc: "Tailored for the BKC corporate corridor. Access conference facilities, video presentation screens, executive meeting rooms, printing, scanning, and high-speed internet support.",
    icon: "Briefcase",
    highlight: "Meeting & Boardroom"
  },
  {
    id: "laundry",
    title: "Laundry Service",
    shortDesc: "Express same-day laundry, steam pressing, and dry cleaning service.",
    fullDesc: "Keep your suits, shirts, and garments crisp. We offer express laundry and dry cleaning options with same-day turnaround for busy corporate executives on tight schedules.",
    icon: "Shirt",
    highlight: "Same-Day Express"
  },
  {
    id: "front-desk",
    title: "24/7 Front Desk",
    shortDesc: "Continuous reception, late check-in assistance, concierge, and luggage storage.",
    fullDesc: "Whether your flight arrives at 2:00 AM or departs at dawn, our front desk team is on duty 24 hours a day to assist with swift check-in, wake-up calls, travel tips, and luggage keeping.",
    icon: "Clock",
    highlight: "24/7 Multilingual Staff"
  },
  {
    id: "fitness",
    title: "Fitness Facilities",
    shortDesc: "Well-appointed fitness center equipped with cardio and strength training equipment.",
    fullDesc: "Maintain your daily wellness routine while traveling. Features modern treadmills, elliptical trainers, free weights, resistance bands, and stretching mats open daily.",
    icon: "Dumbbell",
    highlight: "Daily 6 AM – 10 PM"
  },
  {
    id: "airport",
    title: "Airport Connectivity",
    shortDesc: "Effortless 10-minute access to Mumbai T1 & T2 with dedicated chauffeur transfers.",
    fullDesc: "Strategically located in Santacruz East right off Western Express Highway. We arrange hassle-free airport pickups, drops, and point-to-point business cabs to BKC and South Mumbai.",
    icon: "Plane",
    highlight: "10 Mins to Airport"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-hero",
    title: "Hotel Entrance & Facade",
    category: "facilities",
    image: "/src/assets/images/regency_hotel_hero_1790838308415.jpg",
    caption: "Modern facade and arrival portico of Regency Hotel Mumbai in Santacruz East."
  },
  {
    id: "gal-deluxe",
    title: "Deluxe King Room",
    category: "rooms",
    image: "/src/assets/images/regency_deluxe_room_1790838322677.jpg",
    caption: "Plush king bed, warm architectural lighting, and executive work desk."
  },
  {
    id: "gal-suite",
    title: "Regency Executive Suite Living Room",
    category: "rooms",
    image: "/src/assets/images/regency_executive_suite_1790838339243.jpg",
    caption: "Spacious suite living area with city views and contemporary furnishings."
  },
  {
    id: "gal-dining",
    title: "Regency Kitchen & Dining",
    category: "dining",
    image: "/src/assets/images/regency_dining_restaurant_1790838355113.jpg",
    caption: "Multi-cuisine restaurant offering breakfast buffet, Indian specialties, and global cuisine."
  },
  {
    id: "gal-business",
    title: "Executive Business Lounge & Meeting Space",
    category: "business",
    image: "/src/assets/images/regency_business_lounge_1790838366654.jpg",
    caption: "State-of-the-art conference facilities and boardroom for business meetings."
  },
  {
    id: "gal-deluxe-detail",
    title: "Premium Room Comfort",
    category: "rooms",
    image: "/src/assets/images/regency_deluxe_room_1790838322677.jpg",
    caption: "Soundproofed quiet rooms tailored for restful nights after demanding business days."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    author: "Arjun Singhania",
    designation: "Managing Director, FinTech Advisory",
    city: "Bengaluru",
    rating: 5,
    date: "September 2026",
    title: "Unbeatable location for BKC meetings and red-eye flights",
    quote: "I visit Mumbai twice a month for client discussions at BKC. Regency Hotel's location in Santacruz East is unbeatable. I reached BKC in 12 minutes during morning peak hours. The room was spotlessly clean, soundproofing was top notch, and the high-speed Wi-Fi let me take international Zoom calls with zero lag.",
    roomStayed: "Deluxe King Room",
    verified: true
  },
  {
    id: "test-2",
    author: "Dr. Sunita Kulkarni",
    designation: "Keynote Speaker & Medical Researcher",
    city: "Pune",
    rating: 5,
    date: "August 2026",
    title: "Warm hospitality and seamless 24/7 check-in",
    quote: "My flight landed past 1:30 AM at Terminal 2. The front desk was swift and welcoming. The bed was exceptionally comfortable with crisp linens, and the hot breakfast spread at The Regency Kitchen the next morning was delicious with authentic South Indian and poha options.",
    roomStayed: "Premium Business Room",
    verified: true
  },
  {
    id: "test-3",
    author: "Marc Van Der Meer",
    designation: "Supply Chain Director",
    city: "Amsterdam / Global Transit",
    rating: 5,
    date: "July 2026",
    title: "The Executive Suite exceeded all expectations",
    quote: "Booked the Regency Executive Suite for a 4-day corporate delegation. The separate meeting lounge allowed us to host mini briefings comfortably. Dedicated chauffeur pickup from Mumbai airport was completely stress-free. Courteous staff who genuinely care.",
    roomStayed: "Regency Executive Suite",
    verified: true
  },
  {
    id: "test-4",
    author: "Pooja & Neeraj Verma",
    designation: "Leisure Travelers",
    city: "New Delhi",
    rating: 5,
    date: "September 2026",
    title: "Comfortable, safe, and conveniently connected",
    quote: "We stayed here for a family wedding in Santacruz. The staff accommodated an early check-in and helped arrange local cabs effortlessly. The rooms are spacious, air conditioning is whisper-quiet, and room service food was fresh and piping hot.",
    roomStayed: "Club Twin Room",
    verified: true
  }
];

