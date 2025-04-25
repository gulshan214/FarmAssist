import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Leaf, Star, DollarSign, HeartPulse } from 'lucide-react';

export default function Home() {
  const { currentUser } = useAuth();

  const features = [
    {
      icon: <Leaf className="w-6 h-6 text-green-500" />,
      title: 'Crop Disease Detection',
      desc: 'Upload crop images for instant disease analysis and solutions.'
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-400" />,
      title: 'Gamified Farming',
      desc: 'Complete tasks and earn rewards to stay motivated.'
    },
    {
      icon: <DollarSign className="w-6 h-6 text-emerald-500" />,
      title: 'Finance Tracking',
      desc: 'Monitor your income, expenses, and plan your growth.'
    },
    {
      icon: <HeartPulse className="w-6 h-6 text-red-500" />,
      title: 'Crop Health Tracker',
      desc: 'Daily crop monitoring with personalized tips.'
    }
  ];

  const steps = [
    'Register your farm and crops.',
    'Upload crop images for AI detection.',
    'Complete tasks and receive insights.',
    'Grow smarter and earn rewards.'
  ];

  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-white py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-30 -z-10"></div>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-12">
          <div>
            <motion.h1
              className="text-5xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Revolutionize Farming with <span className="text-green-600">AgriFuture</span>
            </motion.h1>
            <p className="text-lg text-gray-700 mb-8">
              Smart tools. Real results. Empowering the farmers of tomorrow.
            </p>
            <div className="flex flex-wrap gap-4">
              {currentUser ? (
                <Link to="/dashboard" className="px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/register" className="px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700">
                    Get Started
                  </Link>
                  <Link to="/login" className="px-6 py-3 border border-green-600 text-green-600 rounded-xl hover:bg-green-50">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
          <motion.img
            src="https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg"
            alt="Farmer in field"
            className="rounded-3xl shadow-2xl w-full h-96 object-cover"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Key Features</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                whileHover={{ scale: 1.03 }}
              >
                <div className="mb-4">{f.icon}</div>
                <h3 className="font-semibold text-xl mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Step Cards Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                className="bg-green-50 border border-green-100 p-6 rounded-2xl shadow hover:shadow-md text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 font-bold text-lg mx-auto mb-4">
                  {i + 1}
                </div>
                <p className="text-gray-700 text-sm">{s}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-green-600 to-green-500 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4">Start Growing Smarter Today</h2>
          <p className="text-lg mb-8">Join a community of forward-thinking farmers using AgriFuture.</p>
          {currentUser ? (
            <Link to="/dashboard" className="inline-block px-8 py-3 bg-white text-green-600 rounded-xl font-semibold hover:bg-green-50">
              Go to Dashboard
            </Link>
          ) : (
            <Link to="/register" className="inline-block px-8 py-3 bg-white text-green-600 rounded-xl font-semibold hover:bg-green-50">
              Get Started
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}