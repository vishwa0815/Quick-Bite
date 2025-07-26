import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Foodie</h3>
            <p className="text-gray-400">Discover the best recipes from around the world.</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="/recipes" className="text-gray-400 hover:text-white">Recipes</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white">About</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="/category/italian" className="text-gray-400 hover:text-white">Italian</a></li>
              <li><a href="/category/asian" className="text-gray-400 hover:text-white">Asian</a></li>
              <li><a href="/category/mexican" className="text-gray-400 hover:text-white">Mexican</a></li>
              <li><a href="/category/desserts" className="text-gray-400 hover:text-white">Desserts</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white"><FaFacebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><FaTwitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><FaInstagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><FaLinkedin size={20} /></a>
            </div>
            <div className="mt-4">
              <p className="text-gray-400">Subscribe to our newsletter</p>
              <div className="flex mt-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 bg-gray-700 text-white rounded-l focus:outline-none"
                />
                <button className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-r">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Foodie App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;