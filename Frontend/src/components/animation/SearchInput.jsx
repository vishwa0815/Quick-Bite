import { useState, useCallback } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API_KEY = "50813686-ada5bb2af73bf0cc921e4583e";

const SearchInput = ({ setImageData }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);

    const fetchImages = async (query) => {
        setIsLoading(true);
        setActiveCategory(query);
        try {
            const res = await axios.get("https://pixabay.com/api/", {
                params: {
                    key: API_KEY,
                    q: encodeURIComponent(query),
                    image_type: "photo",
                    per_page: 54,
                    orientation: "horizontal",
                    safesearch: true,
                },
            });
            const urls = res.data.hits.map((item) => item.webformatURL);
            setImageData(urls);
        } catch (error) {
            console.error("Image fetch failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRecipeClick = useCallback((recipe) => {
        fetchImages(recipe);
    }, []);

    const recipeItems = [
        { name: "Pizza", emoji: "🍕" },
        { name: "Pasta", emoji: "🍝" },
        { name: "Burger", emoji: "🍔" },
        { name: "Salad", emoji: "🥗" },
        { name: "Sushi", emoji: "🍣" },
        { name: "Steak", emoji: "🥩" },
        { name: "Soup", emoji: "🍲" },
        { name: "Tacos", emoji: "🌮" },
        { name: "Curry", emoji: "🍛" },
        { name: "Dessert", emoji: "🍰" },
        { name: "Pancakes", emoji: "🥞" },
        { name: "Smoothie", emoji: "🥤" },
    ];

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto mt-8">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
                🍽️ Pick a Recipe
            </h2>

            <div className="flex flex-wrap justify-center gap-3">
                {recipeItems.map((item) => (
                    <motion.button
                        key={item.name}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRecipeClick(item.name)}
                        className={`px-4 py-2 rounded-full flex items-center gap-2 font-medium text-sm transition-all duration-200 
                        ${activeCategory === item.name
                                ? "bg-purple-100 text-purple-700 border border-purple-200 shadow"
                                : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-purple-50 hover:border-purple-200"
                            }`}
                    >
                        <span className="text-xl">{item.emoji}</span>
                        <span>{item.name}</span>
                    </motion.button>
                ))}
            </div>

            {isLoading && (
                <div className="flex justify-center mt-8">
                    <div className="h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
};

export default SearchInput;
