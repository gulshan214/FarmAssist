import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Home() {
  const { currentUser } = useAuth()

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Grow Better with <span className="text-primary">AgriFuture</span>
            </motion.h1>
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Combine smart farming practices with gamification to improve your yield and make agriculture enjoyable.
            </motion.p>
            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {currentUser ? (
                <Link to="/dashboard" className="btn btn-primary btn-lg">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary btn-lg">
                    Get Started
                  </Link>
                  <Link to="/login" className="btn btn-secondary btn-lg">
                    Login
                  </Link>
                </>
              )}
            </motion.div>
          </div>
          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <img src="https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg" alt="Farmer in field" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Key Features</h2>
          <div className="features-grid">
            <motion.div 
              className="feature-card"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="feature-icon">🔍</div>
              <h3>Crop Disease Detection</h3>
              <p>Upload images of your crops and get AI-powered disease detection and treatment recommendations.</p>
            </motion.div>

            <motion.div 
              className="feature-card"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="feature-icon">🏆</div>
              <h3>Gamified Farming</h3>
              <p>Earn points, unlock achievements, and compete on leaderboards while practicing good farming techniques.</p>
            </motion.div>

            <motion.div 
              className="feature-card"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="feature-icon">💰</div>
              <h3>Finance Tracking</h3>
              <p>Track income, expenses, loans, and set savings goals to improve your farm's financial health.</p>
            </motion.div>

            <motion.div 
              className="feature-card"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="feature-icon">🌱</div>
              <h3>Crop Health Tracker</h3>
              <p>Monitor your crops' health over time and get personalized recommendations for improvement.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works-section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-container">
            <motion.div 
              className="step"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="step-number">1</div>
              <h3>Register Your Farm</h3>
              <p>Create an account and set up your farm profile with details about your crops and land.</p>
            </motion.div>

            <motion.div 
              className="step"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="step-number">2</div>
              <h3>Upload Crop Images</h3>
              <p>Take photos of your crops and upload them for instant disease detection and analysis.</p>
            </motion.div>

            <motion.div 
              className="step"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="step-number">3</div>
              <h3>Track & Improve</h3>
              <p>Follow recommendations, complete daily tasks, and track your progress over time.</p>
            </motion.div>

            <motion.div 
              className="step"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="step-number">4</div>
              <h3>Earn & Grow</h3>
              <p>Earn points, unlock achievements, and improve your farm's productivity and profitability.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What Farmers Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"AgriFuture has completely transformed my farming. The disease detection saved my tomato crop, and the financial tracking helps me plan better."</p>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">👨‍🌾</div>
                <div className="testimonial-info">
                  <h4>John Doe</h4>
                  <p>Vegetable Farmer, Iowa</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The gamification aspect makes daily farm tasks more engaging. My children are now interested in learning about agriculture because of the points system!"</p>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">👩‍🌾</div>
                <div className="testimonial-info">
                  <h4>Emily Smith</h4>
                  <p>Family Farm Owner, California</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"I've increased my crop yield by 30% following the AI recommendations. The community feature also connects me with farmers facing similar challenges."</p>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">👨‍🌾</div>
                <div className="testimonial-info">
                  <h4>Michael Johnson</h4>
                  <p>Corn Farmer, Nebraska</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Revolutionize Your Farming?</h2>
            <p>Join thousands of farmers already using AgriFuture to improve their crops and livelihood.</p>
            <div className="cta-buttons">
              {currentUser ? (
                <Link to="/dashboard" className="btn btn-primary btn-lg">
                  Go to Dashboard
                </Link>
              ) : (
                <Link to="/register" className="btn btn-primary btn-lg">
                  Start Your Journey
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home