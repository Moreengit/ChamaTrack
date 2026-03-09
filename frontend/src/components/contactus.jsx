// src/components/ContactUs.jsx

import '../styles/contactus.css';

const ContactUs = () => {
  return (
    <section className="contact-section">
      <div className="container">
        <h1 className="contact-title">Contact Us</h1>

        <p className="contact-subtitle">
          Have questions about ChamaTrack, need help setting up your chama, or interested in partnerships?  
          We're here to assist — reach out to our team and we'll get back to you quickly.
        </p>

        <div className="contact-grid">
          {/* Left: Form */}
          <div className="contact-form-container">
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number (optional)</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="+2547xxxxxxxx"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows="6"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>

          {/* Right: Contact Info */}
          <div className="contact-info-box">
            <h3>Our Contacts</h3>
            <p className="info-text">
              We’re always open to feedback, questions, chama onboarding support, and collaboration opportunities.
            </p>

            <div className="contact-detail">
              <strong>Email:</strong>
              <a href="mailto:support@chamatrack.co.ke">support@chamatrack.co.ke</a>
            </div>

            <div className="contact-detail">
              <strong>Phone / WhatsApp:</strong>
              <a href="tel:+254700456789">+254 700 456 789</a>
            </div>

            <div className="contact-detail">
              <strong>Location:</strong>
              <span>Nairobi, Kenya</span>
            </div>

            <div className="contact-detail">
              <strong>Response time:</strong>
              <span>Usually within 24 hours (Mon–Fri)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;