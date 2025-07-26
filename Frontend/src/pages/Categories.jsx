import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
    FaUtensils,
    FaCoffee,
    FaHamburger,
    FaPizzaSlice,
    FaIceCream,
    FaLeaf,
    FaDrumstickBite,
    FaAppleAlt,
} from "react-icons/fa";

const Categories = ({ Item, setItem }) => {
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef(null);

    const category = [
        { name: "Breakfast", icon: <FaCoffee /> },
        { name: "Lunch", icon: <FaUtensils /> },
        { name: "Dinner", icon: <FaDrumstickBite /> },
        { name: "Snack", icon: <FaAppleAlt /> },
        { name: "Dessert", icon: <FaIceCream /> },
        { name: "Appetizer", icon: <FaPizzaSlice /> },
        { name: "Side Dish", icon: <FaLeaf /> },
        { name: "Main Course", icon: <FaHamburger /> },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
            },
        },
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    return (
        <>
            {/* Trigger visibility when this tiny 20px height section is visible */}
            <div ref={sectionRef} className="h-[20px] w-full" />

            {visible && (
                <div className="fixed bottom-6 left-0 right-0 flex justify-center z-40">
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: "spring", damping: 20 }}
                        className="bg-white/30 backdrop-blur-xl border border-white/20 w-[90vw] max-w-6xl h-[70px] rounded-full shadow-2xl flex items-center justify-evenly px-2"
                    >
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="flex h-full w-full gap-4 justify-center"
                        >
                            {category.map((cat) => (
                                <motion.div
                                    key={cat.name}
                                    variants={item}
                                    onClick={() => setItem(cat.name)}
                                    className="relative group w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-300"
                                >
                                    {Item === cat.name && (
                                        <motion.div
                                            layoutId="activeCategory"
                                            className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full z-0 shadow-lg"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}

                                    <span
                                        className={`relative z-10 text-xl sm:text-2xl ${Item === cat.name
                                                ? "text-black"
                                                : "text-white group-hover:text-yellow-300"
                                            }`}
                                    >
                                        {cat.icon}
                                    </span>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileHover={{ opacity: 1, y: -30 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute bottom-full mb-2 px-2 py-1 bg-black text-white text-xs rounded-md whitespace-nowrap pointer-events-none z-10"
                                    >
                                        {cat.name}
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </>
    );
};

export default Categories;