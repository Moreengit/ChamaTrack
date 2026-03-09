import '../styles/about.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1 className="about-title">About ChamaTrack</h1>
          
          <p className="about-lead">
            ChamaTrack is a web app that digitizes Kenyan chamas, allowing members to track contributions, 
            request loans, and get notifications. Officials can manage members, approve loans, and monitor 
            finances. It integrates M-Pesa and SMS for transparency and efficiency.
          </p>

          <div className="about-cards">
            <div className="card vision-card">
              <h3>Our Vision</h3>
              <p>
                To become the most trusted and widely used digital platform for chama management in Kenya, 
                empowering every savings group with transparency, simplicity, and financial security.
              </p>
            </div>

            <div className="card mission-card">
              <h3>Our Mission</h3>
              <p>
                To provide an easy-to-use, secure digital solution that eliminates manual record-keeping, 
                reduces disputes, speeds up loan processing, and builds stronger trust within Kenyan chamas 
                through real-time tracking and M-Pesa/SMS integration.
              </p>
            </div>

            <div className="card values-card">
              <h3>Our Values</h3>
              <p>
                Transparency • Accountability • Accessibility • Innovation • Community Empowerment • 
                Financial Inclusion
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slideshow / Gallery section */}
      {/* <section className="gallery-section">
        <div className="container">
          <h2 className="gallery-title">ChamaTrack in Action</h2>
          
          <div className="slideshow-wrapper">
            <div className="slideshow">
              <div className="slide" style={{ backgroundImage: "url('/images/chama-group-meeting.jpg')" }}>
                <div className="slide-overlay">
                  <p>Chama members tracking contributions together</p>
                </div>
              </div>
              
              <div className="slide" style={{ backgroundImage: "url('/images/mpesa-transaction.jpg')" }}>
                <div className="slide-overlay">
                  <p>Seamless M-Pesa contribution payments</p>
                </div>
              </div>
              
              <div className="slide" style={{ backgroundImage: "url('/images/loan-approval.jpg')" }}>
                <div className="slide-overlay">
                  <p>Fast & transparent loan request & approval</p>
                </div>
              </div>
              
              <div className="slide" style={{ backgroundImage: "url('/images/sms-notification.jpg')" }}>
                <div className="slide-overlay">
                  <p>Instant SMS notifications for every action</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default About;