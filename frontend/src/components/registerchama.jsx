import { useNavigate, Link } from 'react-router-dom';

import '../styles/registerchama.css';

const RegisterChama = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/auth/registerchama');
  };

  return (
    <section className="register-chama-section">
      <div className="container">
        <h1 className="section-title">Register Chama</h1>

        <p className="section-intro">
          ChamaTrack makes it simple for any Kenyan chama to go digital. Register your group in minutes, 
          invite members, set contribution rules, enable loan requests, and start enjoying real-time 
          tracking, M-Pesa payments, and SMS notifications — everything built for transparency and ease.
        </p>

        <div className="benefits-grid">
          <div className="benefit-card">
            <h3>For Chama Officials / Treasurers</h3>
            <p>
              Easily add members, approve contributions & loans, generate reports, and maintain clear 
              financial records — no more lost books or endless WhatsApp messages.
            </p>
          </div>

          <div className="benefit-card">
            <h3>For All Members</h3>
            <p>
              View your balance, see every transaction, request loans with one tap, get SMS alerts 
              for meetings/contributions, and build trust through full visibility.
            </p>
          </div>

          <div className="benefit-card">
            <h3>Secure & Compliant</h3>
            <p>
              M-Pesa integration for instant contributions, role-based access, audit trails, 
              and data protection — designed with Kenyan chama needs and privacy in mind.
            </p>
          </div>
        </div>

        <div className="cta-box">
          <h2 className="cta-heading">Ready to Digitize Your Chama?</h2>
          
          <p className="cta-highlight">
            Create your chama in under 5 minutes and start tracking contributions right away.
          </p>

          <button 
            className="register-button"
            onClick={handleRegisterClick}
          >
            Register Your Chama Now
          </button>

          <p className="cta-footer">
            Already have an account? <Link to="/auth/login">Log in to your dashboard</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterChama;