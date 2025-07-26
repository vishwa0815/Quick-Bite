import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaUtensils, FaAward } from "react-icons/fa";

// ✅ New sample data
const branches = [
  { name: "Koramangala", deliveryTime: "20 mins" },
  { name: "Indiranagar", deliveryTime: "25 mins" },
  { name: "HSR Layout", deliveryTime: "30 mins" },
  { name: "Whitefield", deliveryTime: "35 mins" },
  { name: "Malleshwaram", deliveryTime: "40 mins" },
];

const certifications = [
  { name: "Michelin Guide", logo: "🍽️" },
  { name: "Zomato Pro", logo: "🌟" },
  { name: "Swiggy Preferred", logo: "🔥" },
];

const testimonials = [
  { quote: "The pasta was out of this world!", author: "Ananya R.", rating: 5 },
  { quote: "Loved the packaging and prompt delivery.", author: "Karan M.", rating: 4 },
  { quote: "My go-to place for Friday dinners!", author: "Neha S.", rating: 5 },
];

const ItemsSection = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Branches */}
      <div className="max-w-7xl mx-auto mb-24">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-14 text-gray-900"
        >
          Explore Our Popular Branches
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {branches.map((branch, index) => (
            <motion.div
              key={branch.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >
              <FaUtensils className="text-5xl text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800">{branch.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{branch.deliveryTime} avg delivery</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-3xl py-12 px-8 text-center shadow-md mb-24"
      >
        <FaAward className="text-5xl mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-6">Globally Certified Excellence</h2>
        <div className="flex flex-wrap justify-center gap-10 mt-4">
          {certifications.map((cert) => (
            <div key={cert.name} className="flex items-center gap-3 text-lg">
              <span className="text-3xl">{cert.logo}</span>
              <span>{cert.name}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Testimonials */}
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-14 text-gray-900"
        >
          Hear It From Our Foodies
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-lg ${
                      i < testimonial.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700 italic mb-3">"{testimonial.quote}"</p>
              <p className="font-semibold text-gray-900">— {testimonial.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ItemsSection;
