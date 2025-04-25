import React from 'react'
import { motion } from 'framer-motion'

function GovtSchemes() {
  const schemes = [
    {
      id: 1,
      title: 'PM-KISAN',
      description: 'Direct income support of ₹6000 per year to eligible farmer families',
      eligibility: 'Small and Marginal Farmers',
      benefits: ['Direct cash transfer', 'Financial support for farming', 'No intermediaries'],
      icon: '💰'
    },
    {
      id: 2,
      title: 'Soil Health Card Scheme',
      description: 'Provides information on soil health and recommendations for fertilizers',
      eligibility: 'All Farmers',
      benefits: ['Free soil testing', 'Customized recommendations', 'Improved crop yield'],
      icon: '🌱'
    },
    {
      id: 3,
      title: 'Pradhan Mantri Fasal Bima Yojana',
      description: 'Crop insurance scheme to protect against natural calamities',
      eligibility: 'All Farmers with Insurable Crops',
      benefits: ['Low premium rates', 'Full insurance coverage', 'Quick claim settlement'],
      icon: '🌾'
    }
  ]

  return (
    <div className="govt-schemes-container">
      <div className="container">
        <motion.div 
          className="page-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Government Agricultural Schemes</h1>
          <p>Explore various government initiatives to support farmers</p>
        </motion.div>

        <div className="schemes-grid">
          {schemes.map((scheme) => (
            <motion.div 
              key={scheme.id}
              className="scheme-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="scheme-icon">{scheme.icon}</div>
              <h2>{scheme.title}</h2>
              <p className="scheme-description">{scheme.description}</p>
              
              <div className="scheme-details">
                <div className="eligibility">
                  <h3>Eligibility</h3>
                  <p>{scheme.eligibility}</p>
                </div>
                
                <div className="benefits">
                  <h3>Key Benefits</h3>
                  <ul>
                    {scheme.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <button className="btn btn-primary">Apply Now</button>
            </motion.div>
          ))}
        </div>

        <div className="help-section">
          <div className="help-content">
            <h2>Need Help?</h2>
            <p>Our support team is available to guide you through the application process</p>
            <button className="btn btn-secondary">Contact Support</button>
          </div>
        </div>
      </div>

      <style>{`
        .govt-schemes-container {
          padding: var(--space-4) 0;
          min-height: 100vh;
          background-color: var(--color-gray-100);
        }

        .page-header {
          text-align: center;
          margin-bottom: var(--space-6);
        }

        .page-header h1 {
          font-size: 2.5rem;
          color: var(--color-gray-900);
          margin-bottom: var(--space-2);
        }

        .page-header p {
          color: var(--color-gray-600);
          font-size: 1.1rem;
        }

        .schemes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--space-4);
          margin-bottom: var(--space-6);
        }

        .scheme-card {
          background: var(--color-white);
          border-radius: var(--radius-lg);
          padding: var(--space-4);
          box-shadow: var(--shadow-md);
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .scheme-icon {
          font-size: 2.5rem;
          margin-bottom: var(--space-2);
        }

        .scheme-card h2 {
          color: var(--color-gray-900);
          font-size: 1.5rem;
          margin-bottom: var(--space-2);
        }

        .scheme-description {
          color: var(--color-gray-600);
          margin-bottom: var(--space-3);
        }

        .scheme-details {
          background-color: var(--color-gray-50);
          border-radius: var(--radius-md);
          padding: var(--space-3);
          margin-bottom: var(--space-3);
        }

        .scheme-details h3 {
          color: var(--color-gray-900);
          font-size: 1.1rem;
          margin-bottom: var(--space-2);
        }

        .benefits ul {
          list-style: none;
          padding: 0;
        }

        .benefits li {
          color: var(--color-gray-700);
          margin-bottom: var(--space-2);
          padding-left: var(--space-3);
          position: relative;
        }

        .benefits li:before {
          content: '✓';
          color: var(--color-primary);
          position: absolute;
          left: 0;
        }

        .help-section {
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
          border-radius: var(--radius-lg);
          padding: var(--space-5);
          margin-top: var(--space-6);
        }

        .help-content {
          text-align: center;
          color: var(--color-white);
        }

        .help-content h2 {
          font-size: 2rem;
          margin-bottom: var(--space-3);
        }

        .help-content p {
          margin-bottom: var(--space-4);
          font-size: 1.1rem;
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .schemes-grid {
            grid-template-columns: 1fr;
          }

          .page-header h1 {
            font-size: 2rem;
          }

          .help-section {
            padding: var(--space-4);
          }
        }
      `}</style>
    </div>
  )
}

export default GovtSchemes