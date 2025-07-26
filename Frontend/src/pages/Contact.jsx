import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success(`Message sent by ${form.name}`, {
            position: "top-center",
            autoClose: 3000,
            theme: "colored"
        });
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 flex items-center justify-center p-4">
            <div className="bg-white/90 rounded-3xl shadow-2xl p-8 max-w-xl w-full">
                <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">Contact Us</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-semibold">Name</label>
                        <input
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Your Name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold">Message</label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            rows="5"
                            placeholder="Write your message here..."
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl shadow-md transition duration-300"
                    >
                        Send Message
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}
