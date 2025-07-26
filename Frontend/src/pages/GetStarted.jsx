import { useNavigate } from 'react-router-dom';

export default function GetStarted() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/signin');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-blue-400 to-purple-500 flex items-center justify-center">
            <div className="text-center p-8 bg-white/90 rounded-2xl shadow-xl max-w-md w-full">
                <h1 className="text-4xl font-bold text-indigo-700 mb-6">Welcome!</h1>
                <p className="text-gray-600 mb-6 text-lg">
                    Start your journey by signing in to explore amazing features.
                </p>
                <button
                    onClick={handleClick}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-semibold shadow-md transition duration-300"
                >
                    Get Started
                </button>
            </div>
        </div>
    );
}
