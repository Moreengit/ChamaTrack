

import '../styles/home.css';   
import heroBg from '../assets/images/landingpage.png.jpg';
const Home = () => {
  return (
    <div className="home-page">
      {/* Reuse your header here if it's a separate component */}
      {/* <Header /> */}

      <section className="hero-section">
        {/* style={{ backgroundImage: `url(${heroImage})` }} */}
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1 className="hero-title">ChamaTrack</h1>
          
          <p className="hero-subtitle">
            Connecting Communities to Progress
          </p>

          <div className="hero-description">
            <p className="sdg-line">
              SDG 8: Decent Work and Economic Growth
            </p>
            <p>
              ChamaTrack is a web app that digitizes Kenyan chamas, allowing members to track contributions, 
              request loans, and get notifications. Officials can manage members, approve loans, 
              and monitor finances. Integrates M-Pesa and SMS for transparency and efficiency.
            </p>
          </div>

          {/* Optional: Add buttons later */}
          {/* <div className="hero-buttons">
            <button className="btn-primary">Get Started</button>
            <button className="btn-outline">Learn More</button>
          </div> */}
        </div>
      </section>

      {/* You can add more sections below later */}
    </div>
  );
};

export default Home;