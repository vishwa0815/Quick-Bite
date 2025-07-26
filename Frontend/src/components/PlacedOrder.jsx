import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const PlacedOrder = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order || {};

  const foodItem = order.foodItem || {};
  const selectedOptions = order.selectedOptions || {};
  const price = order.price || foodItem.price || '0.00';

  if (!order || !foodItem.name) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-6">
          <h2 className="text-2xl font-bold mb-4">No Order Found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex text-black items-center justify-center p-4 bg-gray-100"
    >
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="bg-white rounded-lg shadow-md p-6 max-w-md w-full"
      >
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-green-600 text-2xl">✓</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Your food is being prepared</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Order Details</h2>
          <div className="flex items-start mb-4">
            {foodItem.image && (
              <img
                src={foodItem.image}
                alt={foodItem.name}
                className="w-16 h-16 rounded-lg object-cover mr-3"
              />
            )}
            <div>
              <h3 className="font-medium">{foodItem.name}</h3>
              <p className="text-gray-600">${parseFloat(price).toFixed(2)}</p>
            </div>
          </div>

          {Object.keys(selectedOptions).length > 0 && (
            <div className="mb-4">
              <h3 className="font-medium mb-2">Your Choices:</h3>
              <ul className="space-y-1">
                {Object.entries(selectedOptions).map(([key, value]) => (
                  <li key={key} className="flex justify-between">
                    <span className="text-gray-600 capitalize">{key}:</span>
                    <span className="font-medium">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2 bg-blue-600 text-white rounded-lg"
        >
          Back to Home
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default PlacedOrder;