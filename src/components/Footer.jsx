import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h4 className="footer-heading">AgriFuture</h4>
            <p className="footer-text">
              Empowering farmers with technology to improve crop yield, health tracking,
              and financial management.
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/community">Community</Link></li>
              <li><Link to="/game">Game</Link></li>
              <li><Link to="/finance">Finance Tracker</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              <li><Link to="/govt-schemes">Government Schemes</Link></li>
              <li><a href="#">Crop Library</a></li>
              <li><a href="#">Weather Forecasts</a></li>
              <li><a href="#">Market Trends</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Contact Us</h4>
            <p className="footer-text">
              <a href="mailto:support@agrifuture.com">support@agrifuture.com</a>
            </p>
            <p className="footer-text">+1 (555) 123-4567</p>
            <div className="social-icons">
              <a href="#" className="social-icon">📱</a>
              <a href="#" className="social-icon">📘</a>
              <a href="#" className="social-icon">🐦</a>
              <a href="#" className="social-icon">📸</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} AgriFuture. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer