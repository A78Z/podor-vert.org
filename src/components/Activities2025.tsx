import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronLeft, ChevronRight, Trees } from 'lucide-react';
import { cn } from '@/lib/utils';

// Data for the 2025 activities
const activities = [
    {
        id: 1,
        location: "Thioubalel",
        count: 200,
        image: "/images/2025/arbre-200.png",
        type: "Reboisement 2025"
    },
    {
        id: 2,
        location: "Souraye",
        count: 200,
        image: "/images/2025/arbre-200+.png",
        type: "Reboisement 2025"
    },
    {
        id: 3,
        location: "Dioudé",
        count: 150,
        image: "/images/2025/arbre-150.png",
        type: "Reboisement 2025"
    },
    {
        id: 4,
        location: "Pété",
        count: 140,
        image: "/images/2025/arbre-140.png",
        type: "Reboisement 2025"
    },
    {
        id: 5,
        location: "Darto Mauritanie",
        count: 130,
        image: "/images/2025/MAURI.png", 
        type: "Reboisement 2025"
    },
    {
        id: 6,
        location: "Siwré thiambé",
        count: 120,
        image: "/images/2025/arbre-120.png", 
        type: "Reboisement 2025"
    },
    {
        id: 7,
        location: "Bito",
        count: 120,
        image: "/images/2025/arbre-BITO120.png", 
        type: "Reboisement 2025"
    },
    {
        id: 8,
        location: "Fondé elimane",
        count: 118,
        image: "/images/2025/arbre-118.png", 
        type: "Reboisement 2025"
    },
     {
        id: 9,
        location: "Barangol",
        count: 115,
        image: "/images/2025/arbre-115.png", 
        type: "Reboisement 2025"
    },
     {
        id: 10,
        location: "Fondé dieri Mauritanie",
        count: 100,
        image: "/images/2025/FONDE-DIERI.png", 
        type: "Reboisement 2025"
    },
    {
        id: 11,
        location: "Meri",
        count: 100,
        image: "/images/2025/arbre-100.png", 
        type: "Reboisement 2025"
    },
    {
        id: 12,
        location: "Lougue",
        count: 100,
        image: "/images/2025/arbre-100L.png", 
        type: "Reboisement 2025"
    },
    {
        id: 13,
        location: "Toufndé gandé",
        count: 100,
        image: "/images/2025/arbre-100+.png", 
        type: "Reboisement 2025"
    },
    {
        id: 14,
        location: "Abdallah",
        count: 70,
        image: "/images/2025/arbre-70.png", 
        type: "Reboisement 2025"
    },
    {
        id: 15,
        location: "Theing-lé",
        count: 40,
        image: "/images/2025/arbre-40.png", 
        type: "Reboisement 2025"
    },
    {
        id: 15,
        location: "Sounnatou",
        count: 30,
        image: "/images/2025/arbre-30.png", 
        type: "Reboisement 2025"
    },
];

const Activities2025 = () => {
    const [startIndex, setStartIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3);

    // Responsive items per page
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setItemsPerPage(1);
            } else if (window.innerWidth < 1024) {
                setItemsPerPage(2);
            } else {
                setItemsPerPage(3);
            }
        };

        handleResize(); // Initial call
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = () => {
        setStartIndex((prev) =>
            prev + itemsPerPage >= activities.length ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setStartIndex((prev) =>
            prev === 0 ? activities.length - itemsPerPage : prev - 1
        );
    };

    const visibleActivities = [];
    for (let i = 0; i < itemsPerPage; i++) {
        const index = (startIndex + i) % activities.length;
        visibleActivities.push(activities[index]);
    }

    return (
        <section className="py-24 bg-gradient-to-b from-green-50/50 to-white relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-200 to-transparent opacity-50"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg mb-4">
                            🌿 Activités de reboisement et les dons 🌿
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            De mai à novembre 2025 – <span className="text-green-700 font-bold">Pépinière de Thioubalel</span>
                        </p>
                    </motion.div>
                </div>

                {/* Slider Container */}
                <div className="relative">
                    <div className="overflow-hidden py-10 -my-10 px-4 -mx-4">
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                            initial={false}
                        >
                            <AnimatePresence mode='popLayout'>
                                {visibleActivities.map((activity, idx) => (
                                    <motion.div
                                        key={`${activity.id}-${startIndex}`}
                                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: -50, scale: 0.9 }}
                                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                                        className="group relative h-[400px] rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
                                    >
                                        {/* Background Image */}
                                        <div className="absolute inset-0">
                                            <img
                                                src={activity.image}
                                                alt={`Reboisement à ${activity.location}`}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-black/20 to-transparent group-hover:from-green-900/95 transition-colors duration-500"></div>
                                        </div>

                                        {/* Badge */}
                                        <div className="absolute top-6 left-6">
                                            <span className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                                                {activity.type}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="flex items-center gap-2 mb-3 opacity-80">
                                                <MapPin className="w-4 h-4 text-green-400" />
                                                <span className="text-green-50 text-sm font-medium uppercase tracking-wide">
                                                    Pépinière de Thioubalel
                                                </span>
                                            </div>

                                            <h3 className="text-3xl font-black text-white mb-2 leading-tight">
                                                {activity.location}
                                            </h3>

                                            <div className="flex items-center gap-3 mt-4">
                                                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-900/30 group-hover:bg-white transition-colors duration-300">
                                                    <Trees className="w-6 h-6 text-white group-hover:text-green-600 transition-colors" />
                                                </div>
                                                <div>
                                                    <span className="block text-4xl font-black text-white tracking-tighter">
                                                        {activity.count}
                                                    </span>
                                                </div>
                                                <div className="h-px flex-1 bg-white/20 ml-2"></div>
                                                <span className="text-lg font-bold text-green-400">Arbres</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {/* Controls */}
                    <div className="flex justify-center items-center gap-4 mt-12">
                        <button
                            onClick={prevSlide}
                            className="p-4 rounded-full bg-white border border-gray-100 shadow-lg text-gray-700 hover:bg-green-600 hover:text-white hover:shadow-green-900/30 transition-all duration-300 disabled:opacity-50"
                            aria-label="Précédent"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        {/* Dots */}
                        <div className="flex gap-2">
                            {activities.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setStartIndex(idx)}
                                    className={cn(
                                        "w-2.5 h-2.5 rounded-full transition-all duration-300",
                                        idx === startIndex % activities.length
                                            ? "bg-green-600 w-8"
                                            : "bg-gray-300 hover:bg-green-400"
                                    )}
                                    aria-label={`Aller au slide ${idx + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextSlide}
                            className="p-4 rounded-full bg-white border border-gray-100 shadow-lg text-gray-700 hover:bg-green-600 hover:text-white hover:shadow-green-900/30 transition-all duration-300"
                            aria-label="Suivant"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Activities2025;
