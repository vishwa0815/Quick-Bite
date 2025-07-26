import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const InfoCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [foodItem, setFoodItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isOrdering, setIsOrdering] = useState(false);

  const defaultCustomizations = {
    size: ['Small', 'Medium', 'Large'],
    doneness: ['Rare', 'Medium Rare', 'Medium', 'Well Done'],
    sides: ['Fries', 'Salad', 'Mashed Potatoes', 'Vegetables'],
    sauce: ['BBQ', 'Garlic', 'Spicy', 'Teriyaki', 'None'],
    extras: ['Extra Cheese', 'Bacon', 'Avocado', 'Mushrooms', 'None']
  };

  useEffect(() => {
    const fetchFoodItem = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/fooditems/food/${id}`);
        const mergedCustomizations = {
          ...defaultCustomizations,
          ...(data.data.customizations || {})
        };
        
        // Filter out empty customization categories
        const validCustomizations = Object.fromEntries(
          Object.entries(mergedCustomizations).filter(([_, options]) => options && options.length > 0)
        );

        setFoodItem({
          ...data.data,
          customizations: validCustomizations
        });
      } catch (error) {
        console.error('Error fetching food item:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItem();
  }, [id]);

  const generateRandomPrice = () => (Math.random() * 5 + 5).toFixed(2);

  const handleOptionChange = (category, value) => {
    setSelectedOptions(prev => ({ 
      ...prev, 
      [category]: value 
    }));
  };

  const handleOrder = async () => {
    setIsOrdering(true);
    const orderData = {
      foodItem: {
        name: foodItem.name,
        image: foodItem.image,
        price: parseFloat(generateRandomPrice())
      },
      customizations: selectedOptions
    };

    try {
      const response = await axios.post('http://localhost:3000/success/order', orderData, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing delay
      
      navigate('/order-success', {
        state: {
          order: {
            ...response.data,
            foodItem: {
              ...response.data.foodItem,
              cuisine: foodItem.cuisine
            }
          }
        }
      });
    } catch (error) {
      console.error('Order Error:', error.response?.data || error.message);
      setIsOrdering(false);
      alert(`Order failed: ${error.response?.data?.message || 'Please try again'}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { 
                duration: 2, 
                repeat: Infinity, 
                ease: "linear" 
              },
              scale: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
            className="w-20 h-20 rounded-full border-4 border-amber-500 border-t-transparent"
          />
          <motion.p 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-gray-600 font-medium"
          >
            Preparing your delicious meal...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (!foodItem) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-amber-50 to-gray-50 p-6 text-center"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="max-w-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-amber-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Item not found</h2>
          <p className="text-gray-600 mb-8">We couldn't find the dish you're looking for. Maybe try something else from our menu?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
          >
            Browse Our Menu
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-amber-50 to-gray-50"
    >
      {/* Floating Back Button */}
      <motion.button
        whileHover={{ x: -2 }}
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 z-20 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </motion.button>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div 
          layout
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Food Image - Full height on desktop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:w-1/2 h-96 lg:h-auto relative"
            >
              <img
                src={foodItem.image}
                alt={foodItem.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <motion.h1 
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  className="text-4xl font-bold text-white mb-2"
                >
                  {foodItem.name}
                </motion.h1>
                <motion.p 
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-amber-300 font-medium text-lg"
                >
                  {foodItem.cuisine}
                </motion.p>
              </div>
            </motion.div>

            {/* Details Section */}
            <div className="lg:w-1/2 p-8">
              {/* Meta Info */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-3 mb-8"
              >
                <motion.div 
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium">{foodItem.prepTimeMinutes + foodItem.cookTimeMinutes} mins</span>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-sm font-medium">{foodItem.servings} {foodItem.servings > 1 ? 'servings' : 'serving'}</span>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm font-medium">{foodItem.caloriesPerServing} cal</span>
                </motion.div>
              </motion.div>

              {/* Price */}
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="mb-8"
              >
                <div className="text-4xl font-bold text-amber-600 inline-flex items-baseline">
                  ${generateRandomPrice()}
                  <span className="text-sm font-normal text-gray-500 ml-2">+ tax</span>
                </div>
              </motion.div>

              {/* Ingredients */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Ingredients
                </h2>
                <ul className="grid grid-cols-2 gap-3">
                  {foodItem.ingredients.map((ingredient, index) => (
                    <motion.li 
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-start gap-2 text-gray-700"
                    >
                      <span className="text-amber-500 mt-1">•</span>
                      <span>{ingredient}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Customizations - Only shown if they exist */}
              {Object.keys(foodItem.customizations).length > 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mb-8"
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Customize Your Meal
                  </h2>
                  
                  <div className="space-y-6">
                    {Object.entries(foodItem.customizations).map(([category, options]) => (
                      <motion.div 
                        key={category}
                        layout
                        className="space-y-3"
                      >
                        <h4 className="capitalize text-sm font-medium text-gray-700">
                          {category.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {options.map(option => (
                            <motion.button
                              key={option}
                              layout
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleOptionChange(category, option)}
                              className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 font-medium
                                ${selectedOptions[category] === option
                                  ? 'bg-amber-600 text-white shadow-md'
                                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-amber-50 hover:border-amber-200'}
                              `}
                            >
                              {option}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Order Button */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12"
              >
                <AnimatePresence>
                  {isOrdering ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-center"
                    >
                      <motion.div
                        animate={{ 
                          rotate: 360,
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          rotate: { 
                            duration: 1.5, 
                            repeat: Infinity, 
                            ease: "linear" 
                          },
                          scale: {
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }
                        }}
                        className="w-12 h-12 rounded-full border-4 border-amber-500 border-t-transparent"
                      />
                    </motion.div>
                  ) : (
                    <motion.button
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.4)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleOrder}
                      className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-3"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add to Order
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InfoCard;