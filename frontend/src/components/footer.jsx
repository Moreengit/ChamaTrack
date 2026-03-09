// src/components/Footer.jsx

import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Column 1: About ChamaTrack */}
          <div className="footer-column">
            <h3 className="footer-column-title">About ChamaTrack</h3>
            <p className="footer-about-text">
              Digitizing Kenyan chamas for transparency and efficiency. Members track contributions, 
              request loans, and receive notifications. Officials manage members, approve loans, 
              and monitor finances — all with seamless M-Pesa and SMS integration.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-column">
            <h3 className="footer-column-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/registerchama">Register Chama</a></li>
              <li><a href="/contactus">Contact Us</a></li>
              
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div className="footer-column">
            <h3 className="footer-column-title">Contact Us</h3>
            <div className="footer-contact">
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:support@chamatrack.co.ke">support@chamatrack.co.ke</a>
              </p>
              <p>
                <strong>Phone / WhatsApp:</strong>{' '}
                <a href="tel:+254700456789">+254 700 456 789</a>
              </p>
              <p>
                <strong>Location:</strong> Nairobi, Kenya
              </p>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} ChamaTrack. All Rights Reserved.
          </p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;