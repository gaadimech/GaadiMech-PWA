export interface CityData {
  name: string;
  slug: string;
  title: string;
  description: string;
  metaKeywords: string[];
  heroTitle: string;
  heroSubtitle: string;
  services: {
    title: string;
    description: string;
    image: string;
  }[];
  stats: {
    label: string;
    value: string;
  }[];
  reviews: {
    name: string;
    rating: number;
    comment: string;
    date: string;
    location: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const cities: Record<string, CityData> = {
  jaipur: {
    name: "Jaipur",
    slug: "jaipur",
    title: "Car Repair & Service in Jaipur | GaadiMech",
    description: "Expert car repair and service in Jaipur. Book online for doorstep car service, repair, and maintenance. Trusted by 10,000+ customers in Jaipur.",
    metaKeywords: ["car repair jaipur", "car service jaipur", "car mechanic jaipur", "car maintenance jaipur", "car repair shop jaipur"],
    heroTitle: "Expert Car Repair & Service in Jaipur",
    heroSubtitle: "Professional car service at your doorstep. Book online and get 20% off on your first service!",
    services: [
      {
        title: "General Service",
        description: "Complete car service including oil change, filter replacement, and general inspection",
        image: "/images/services/general-service.jpg"
      },
      {
        title: "AC Service",
        description: "Professional AC service and repair to keep your car cool in Jaipur's heat",
        image: "/images/services/ac-service.jpg"
      },
      {
        title: "Denting & Painting",
        description: "Expert car body repair and painting services",
        image: "/images/services/denting-painting.jpg"
      }
    ],
    stats: [
      { label: "Happy Customers", value: "10,000+" },
      { label: "Service Centers", value: "5+" },
      { label: "Expert Mechanics", value: "50+" },
      { label: "Cities Covered", value: "All over Jaipur" }
    ],
    reviews: [
      {
        name: "Rahul Sharma",
        rating: 5,
        comment: "Excellent service! The mechanic was very professional and completed the work on time. Highly recommended for car service in Jaipur.",
        date: "2024-03-15",
        location: "Malviya Nagar, Jaipur"
      },
      {
        name: "Priya Gupta",
        rating: 5,
        comment: "Best car repair service in Jaipur. They came to my doorstep and fixed my car's AC issue within 2 hours.",
        date: "2024-03-10",
        location: "Vaishali Nagar, Jaipur"
      }
    ],
    faqs: [
      {
        question: "How do I book a car service in Jaipur?",
        answer: "You can book a car service in Jaipur through our website or mobile app. Simply select your location, choose the service required, and schedule a convenient time slot."
      },
      {
        question: "What areas do you cover in Jaipur?",
        answer: "We cover all major areas in Jaipur including Malviya Nagar, Vaishali Nagar, C-Scheme, Bani Park, and surrounding areas."
      }
    ]
  },
  mumbai: {
    name: "Mumbai",
    slug: "mumbai",
    title: "Car Repair & Service in Mumbai | GaadiMech",
    description: "Expert car repair and service in Mumbai. Book online for doorstep car service, repair, and maintenance. Trusted by 15,000+ customers in Mumbai.",
    metaKeywords: ["car repair mumbai", "car service mumbai", "car mechanic mumbai", "car maintenance mumbai", "car repair shop mumbai"],
    heroTitle: "Expert Car Repair & Service in Mumbai",
    heroSubtitle: "Professional car service at your doorstep. Book online and get 20% off on your first service!",
    services: [
      {
        title: "General Service",
        description: "Complete car service including oil change, filter replacement, and general inspection",
        image: "/images/services/general-service.jpg"
      },
      {
        title: "AC Service",
        description: "Professional AC service and repair to keep your car cool in Mumbai's climate",
        image: "/images/services/ac-service.jpg"
      },
      {
        title: "Denting & Painting",
        description: "Expert car body repair and painting services",
        image: "/images/services/denting-painting.jpg"
      }
    ],
    stats: [
      { label: "Happy Customers", value: "15,000+" },
      { label: "Service Centers", value: "8+" },
      { label: "Expert Mechanics", value: "80+" },
      { label: "Areas Covered", value: "All over Mumbai" }
    ],
    reviews: [
      {
        name: "Amit Patel",
        rating: 5,
        comment: "Best car service in Mumbai! The mechanic was very professional and completed the work on time. Highly recommended!",
        date: "2024-03-15",
        location: "Andheri, Mumbai"
      },
      {
        name: "Neha Shah",
        rating: 5,
        comment: "Excellent doorstep service in Mumbai. They fixed my car's AC issue within 2 hours. Very reliable!",
        date: "2024-03-10",
        location: "Powai, Mumbai"
      }
    ],
    faqs: [
      {
        question: "How do I book a car service in Mumbai?",
        answer: "You can book a car service in Mumbai through our website or mobile app. Simply select your location, choose the service required, and schedule a convenient time slot."
      },
      {
        question: "What areas do you cover in Mumbai?",
        answer: "We cover all major areas in Mumbai including Andheri, Powai, Bandra, Thane, and surrounding areas."
      }
    ]
  },
  delhi: {
    name: "Delhi",
    slug: "delhi",
    title: "Car Repair & Service in Delhi | GaadiMech",
    description: "Expert car repair and service in Delhi. Book online for doorstep car service, repair, and maintenance. Trusted by 12,000+ customers in Delhi.",
    metaKeywords: ["car repair delhi", "car service delhi", "car mechanic delhi", "car maintenance delhi", "car repair shop delhi"],
    heroTitle: "Expert Car Repair & Service in Delhi",
    heroSubtitle: "Professional car service at your doorstep. Book online and get 20% off on your first service!",
    services: [
      {
        title: "General Service",
        description: "Complete car service including oil change, filter replacement, and general inspection",
        image: "/images/services/general-service.jpg"
      },
      {
        title: "AC Service",
        description: "Professional AC service and repair to keep your car cool in Delhi's extreme weather",
        image: "/images/services/ac-service.jpg"
      },
      {
        title: "Denting & Painting",
        description: "Expert car body repair and painting services",
        image: "/images/services/denting-painting.jpg"
      }
    ],
    stats: [
      { label: "Happy Customers", value: "12,000+" },
      { label: "Service Centers", value: "6+" },
      { label: "Expert Mechanics", value: "60+" },
      { label: "Areas Covered", value: "All over Delhi" }
    ],
    reviews: [
      {
        name: "Rajesh Kumar",
        rating: 5,
        comment: "Excellent service in Delhi! The mechanic was very professional and completed the work on time. Highly recommended!",
        date: "2024-03-15",
        location: "South Delhi"
      },
      {
        name: "Anjali Gupta",
        rating: 5,
        comment: "Best car repair service in Delhi. They came to my doorstep and fixed my car's AC issue within 2 hours.",
        date: "2024-03-10",
        location: "Noida"
      }
    ],
    faqs: [
      {
        question: "How do I book a car service in Delhi?",
        answer: "You can book a car service in Delhi through our website or mobile app. Simply select your location, choose the service required, and schedule a convenient time slot."
      },
      {
        question: "What areas do you cover in Delhi?",
        answer: "We cover all major areas in Delhi including South Delhi, North Delhi, Noida, Gurgaon, and surrounding areas."
      }
    ]
  },
  bangalore: {
    name: "Bangalore",
    slug: "bangalore",
    title: "Car Repair & Service in Bangalore | GaadiMech",
    description: "Expert car repair and service in Bangalore. Book online for doorstep car service, repair, and maintenance. Trusted by 10,000+ customers in Bangalore.",
    metaKeywords: ["car repair bangalore", "car service bangalore", "car mechanic bangalore", "car maintenance bangalore", "car repair shop bangalore"],
    heroTitle: "Expert Car Repair & Service in Bangalore",
    heroSubtitle: "Professional car service at your doorstep. Book online and get 20% off on your first service!",
    services: [
      {
        title: "General Service",
        description: "Complete car service including oil change, filter replacement, and general inspection",
        image: "/images/services/general-service.jpg"
      },
      {
        title: "AC Service",
        description: "Professional AC service and repair to keep your car cool in Bangalore's climate",
        image: "/images/services/ac-service.jpg"
      },
      {
        title: "Denting & Painting",
        description: "Expert car body repair and painting services",
        image: "/images/services/denting-painting.jpg"
      }
    ],
    stats: [
      { label: "Happy Customers", value: "10,000+" },
      { label: "Service Centers", value: "5+" },
      { label: "Expert Mechanics", value: "50+" },
      { label: "Areas Covered", value: "All over Bangalore" }
    ],
    reviews: [
      {
        name: "Suresh Reddy",
        rating: 5,
        comment: "Best car service in Bangalore! The mechanic was very professional and completed the work on time. Highly recommended!",
        date: "2024-03-15",
        location: "Indiranagar, Bangalore"
      },
      {
        name: "Priya Sharma",
        rating: 5,
        comment: "Excellent doorstep service in Bangalore. They fixed my car's AC issue within 2 hours. Very reliable!",
        date: "2024-03-10",
        location: "Koramangala, Bangalore"
      }
    ],
    faqs: [
      {
        question: "How do I book a car service in Bangalore?",
        answer: "You can book a car service in Bangalore through our website or mobile app. Simply select your location, choose the service required, and schedule a convenient time slot."
      },
      {
        question: "What areas do you cover in Bangalore?",
        answer: "We cover all major areas in Bangalore including Indiranagar, Koramangala, Whitefield, Electronic City, and surrounding areas."
      }
    ]
  },
  pune: {
    name: "Pune",
    slug: "pune",
    title: "Car Repair & Service in Pune | GaadiMech",
    description: "Expert car repair and service in Pune. Book online for doorstep car service, repair, and maintenance. Trusted by 8,000+ customers in Pune.",
    metaKeywords: ["car repair pune", "car service pune", "car mechanic pune", "car maintenance pune", "car repair shop pune"],
    heroTitle: "Expert Car Repair & Service in Pune",
    heroSubtitle: "Professional car service at your doorstep. Book online and get 20% off on your first service!",
    services: [
      {
        title: "General Service",
        description: "Complete car service including oil change, filter replacement, and general inspection",
        image: "/images/services/general-service.jpg"
      },
      {
        title: "AC Service",
        description: "Professional AC service and repair to keep your car cool in Pune's climate",
        image: "/images/services/ac-service.jpg"
      },
      {
        title: "Denting & Painting",
        description: "Expert car body repair and painting services",
        image: "/images/services/denting-painting.jpg"
      }
    ],
    stats: [
      { label: "Happy Customers", value: "8,000+" },
      { label: "Service Centers", value: "4+" },
      { label: "Expert Mechanics", value: "40+" },
      { label: "Areas Covered", value: "All over Pune" }
    ],
    reviews: [
      {
        name: "Rahul Deshmukh",
        rating: 5,
        comment: "Excellent service in Pune! The mechanic was very professional and completed the work on time. Highly recommended!",
        date: "2024-03-15",
        location: "Kothrud, Pune"
      },
      {
        name: "Anita Patil",
        rating: 5,
        comment: "Best car repair service in Pune. They came to my doorstep and fixed my car's AC issue within 2 hours.",
        date: "2024-03-10",
        location: "Hadapsar, Pune"
      }
    ],
    faqs: [
      {
        question: "How do I book a car service in Pune?",
        answer: "You can book a car service in Pune through our website or mobile app. Simply select your location, choose the service required, and schedule a convenient time slot."
      },
      {
        question: "What areas do you cover in Pune?",
        answer: "We cover all major areas in Pune including Kothrud, Hadapsar, Hinjewadi, Wakad, and surrounding areas."
      }
    ]
  }
}; 