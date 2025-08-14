import {
    FiHome,
    FiTrendingUp,
    FiKey,
    FiBarChart2,
    FiSettings,
    FiFileText,
    FiDollarSign,
    FiCreditCard,
    FiCamera,
    FiVideo,
    FiShare2,
    FiEdit3,
    FiUsers,
    FiPhone,
    FiMessageSquare,
    FiCheckCircle,
    FiCalendar,
    FiThumbsUp
} from "react-icons/fi";

export const realEstateServices = [
    {
        icon: FiHome,
        title: "Property Buying",
        description: "Expert assistance in finding and purchasing your dream property with comprehensive market analysis and personalized guidance.",
        features: ["Market Research", "Property Inspection", "Negotiation Support", "Documentation Help", "Legal Verification"],
        color: "from-blue-600 to-blue-400",
        category: "real_estate"
    },
    {
        icon: FiTrendingUp,
        title: "Property Selling",
        description: "Maximize your property value with our strategic selling approach and extensive buyer network for quick, profitable sales.",
        features: ["Property Valuation", "Marketing Strategy", "Buyer Matching", "Sale Coordination", "Price Optimization"],
        color: "from-emerald-600 to-emerald-400",
        category: "real_estate"
    },
    {
        icon: FiKey,
        title: "Property Rental",
        description: "Hassle-free rental services for both landlords and tenants with complete documentation support and ongoing management.",
        features: ["Tenant Verification", "Rent Collection", "Maintenance Coordination", "Legal Support", "Property Inspection"],
        color: "from-purple-600 to-purple-400",
        category: "real_estate"
    },
    {
        icon: FiBarChart2,
        title: "Investment Advisory",
        description: "Strategic real estate investment guidance to build wealth through smart property investments with data-driven insights.",
        features: ["ROI Analysis", "Market Trends", "Portfolio Planning", "Risk Assessment", "Investment Strategy"],
        color: "from-orange-600 to-orange-400",
        category: "real_estate"
    },
    {
        icon: FiSettings,
        title: "Property Management",
        description: "Complete property management solutions including maintenance, tenant relations, and comprehensive financial reporting.",
        features: ["Maintenance Services", "Tenant Management", "Financial Reporting", "Legal Compliance", "24/7 Support"],
        color: "from-indigo-600 to-indigo-400",
        category: "real_estate"
    },
    {
        icon: FiFileText,
        title: "Legal Services",
        description: "Comprehensive legal support for all property transactions with expert documentation, compliance, and dispute resolution.",
        features: ["Document Verification", "Title Search", "Registration Support", "Legal Consultation", "Dispute Resolution"],
        color: "from-teal-600 to-teal-400",
        category: "real_estate"
    },
    {
        icon: FiDollarSign,
        title: "Property Valuation",
        description: "Accurate property valuation services using advanced analytics and market data for informed investment decisions.",
        features: ["Market Analysis", "Comparative Study", "Valuation Report", "Expert Opinion", "Investment Guidance"],
        color: "from-amber-600 to-amber-400",
        category: "real_estate"
    },
    {
        icon: FiCreditCard,
        title: "Home Loans",
        description: "Simplified home loan process with competitive rates, quick approvals, and personalized assistance from trusted lenders.",
        features: ["Loan Consultation", "Documentation Help", "Rate Comparison", "Quick Processing", "EMI Planning"],
        color: "from-rose-600 to-rose-400",
        category: "real_estate"
    }
];

export const marketingServices = [
    {
        icon: FiCamera,
        title: "Professional Photography",
        description: "High-quality property photography that captures every detail and highlights the best features of your property.",
        features: ["HD Photography", "Multiple Angles", "Interior & Exterior", "Same Day Delivery"],
        color: "from-blue-500 to-cyan-500",
        category: "marketing"
    },
    {
        icon: FiVideo,
        title: "Property Videos",
        description: "Engaging property walkthrough videos that give potential buyers a complete tour experience.",
        features: ["HD Video", "Professional Editing", "Walkthrough Tours", "Social Media Ready"],
        color: "from-purple-500 to-pink-500",
        category: "marketing"
    },
    {
        icon: FiShare2,
        title: "Social Media Marketing",
        description: "Strategic social media campaigns to showcase your properties across all major platforms.",
        features: ["Facebook Ads", "Instagram Posts", "WhatsApp Marketing", "Content Creation"],
        color: "from-green-500 to-emerald-500",
        category: "marketing"
    },
    {
        icon: FiEdit3,
        title: "Property Brochures",
        description: "Professional brochures and flyers designed to highlight your property's unique selling points.",
        features: ["Custom Design", "Print Ready", "Digital Format", "Quick Turnaround"],
        color: "from-orange-500 to-red-500",
        category: "marketing"
    },
    {
        icon: FiUsers,
        title: "Lead Generation",
        description: "Targeted marketing campaigns to generate qualified leads and connect with serious buyers.",
        features: ["Buyer Database", "Lead Qualification", "Follow-up System", "ROI Tracking"],
        color: "from-indigo-500 to-purple-500",
        category: "marketing"
    },
    {
        icon: FiPhone,
        title: "Customer Support",
        description: "Dedicated customer support to handle inquiries and coordinate property viewings.",
        features: ["24/7 Support", "Inquiry Management", "Viewing Coordination", "Client Communication"],
        color: "from-teal-500 to-blue-500",
        category: "marketing"
    }
];

export const customService = {
    title: 'Custom Consultation',
    description: 'Personalized consultation for custom real estate solutions tailored to your specific needs and requirements.',
    features: ['Custom Solutions', 'Expert Consultation', 'Tailored Approach', 'Dedicated Support', 'Flexible Pricing'],
    color: 'from-gradient-to-r from-blue-600 to-purple-600',
    category: 'consultation'
};

export const serviceStats = [
    {
        value: '500+',
        label: 'Properties Sold',
        description: 'Successfully completed transactions',
        color: 'from-blue-600 to-blue-400'
    },
    {
        value: '1000+',
        label: 'Happy Clients',
        description: 'Satisfied customers nationwide',
        color: 'from-emerald-600 to-emerald-400'
    },
    {
        value: '50+',
        label: 'Expert Agents',
        description: 'Professional real estate experts',
        color: 'from-purple-600 to-purple-400'
    },
    {
        value: '24/7',
        label: 'Support Available',
        description: 'Round-the-clock customer service',
        color: 'from-orange-600 to-orange-400'
    }
];

export const serviceTestimonials = [
    {
        name: 'Rajesh Kumar',
        service: 'Property Buying',
        text: 'Excellent service! They helped me find my dream home within my budget. The team was professional and guided me through every step of the process.',
        rating: 5
    },
    {
        name: 'Priya Sharma',
        service: 'Property Selling',
        text: 'Sold my property in just 2 weeks! Their marketing strategy and buyer network is impressive. Highly recommend their services.',
        rating: 5
    },
    {
        name: 'Amit Patel',
        service: 'Investment Advisory',
        text: 'Great investment advice that helped me build a profitable property portfolio. Their market analysis is spot-on and very detailed.',
        rating: 5
    },
    {
        name: 'Sneha Reddy',
        service: 'Property Management',
        text: 'They manage my rental properties perfectly. No hassles with tenants, timely rent collection, and excellent maintenance services.',
        rating: 5
    },
    {
        name: 'Vikram Singh',
        service: 'Home Loans',
        text: 'Got the best loan rates through their network. The documentation process was smooth and they handled everything professionally.',
        rating: 5
    },
    {
        name: 'Kavya Nair',
        service: 'Professional Photography',
        text: 'Amazing property photography that showcased my home beautifully. The photos were instrumental in getting quick buyer interest.',
        rating: 5
    }
];

export const serviceProcess = [
    {
        title: 'Initial Consultation',
        description: 'Share your requirements and get personalized advice from our experts.',
        icon: FiMessageSquare,
        color: 'from-blue-600 to-blue-400'
    },
    {
        title: 'Service Planning',
        description: 'We create a customized plan tailored to your specific needs and budget.',
        icon: FiCalendar,
        color: 'from-emerald-600 to-emerald-400'
    },
    {
        title: 'Implementation',
        description: 'Our team executes the plan with precision and keeps you updated throughout.',
        icon: FiCheckCircle,
        color: 'from-purple-600 to-purple-400'
    },
    {
        title: 'Success & Support',
        description: 'Achieve your goals with our ongoing support and satisfaction guarantee.',
        icon: FiThumbsUp,
        color: 'from-orange-600 to-orange-400'
    }
];