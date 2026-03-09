// src/components/Services.jsx

import '../styles/services.css';

const Services = () => {
  return (
    <section className="services-section">
      <div className="container">
        <h2 className="section-title">Our Impact</h2>

        <p className="section-intro">
          ChamaTrack has transformed how Kenyan chamas operate, bringing transparency, efficiency, and trust to savings groups across communities. 
          From women's investment groups in rural areas to youth savings circles in urban centers and family-based chamas in Nairobi and Kiambu, 
          members now track contributions instantly via M-Pesa, request and receive loans faster, reduce disputes through clear records, 
          and stay connected with real-time SMS notifications — empowering entire communities to save, invest, and grow together.
        </p>

        <div className="cards-grid">
          <div className="impact-card">
            <div 
              className="card-image" 
              style={{ backgroundImage: "url('https://islamic-relief.or.ke/wp-content/uploads/2022/06/Saving-and-Loans-2-2048x1152-1-768x432.jpg')" }}
            ></div>
            <div className="card-content">
              <h3>Women's Savings & Investment Groups</h3>
              <p>
                Rural and peri-urban women's chamas now manage weekly contributions digitally, approve emergency loans quickly, 
                and build collective wealth with full visibility — reducing mistrust and increasing participation.
              </p>
              <a href="#more" className="btn-learn-more">Learn More</a>
            </div>
          </div>

          <div className="impact-card">
            <div 
              className="card-image" 
              style={{ backgroundImage: "url('https://cdn.prod.website-files.com/6038c1030be2580db46ccf46/6172c572baf31e4bb4ca7265_chama-women-strategy.jpg')" }}
            ></div>
            <div className="card-content">
              <h3>Urban Professional & Youth Chamas</h3>
              <p>
                Busy Nairobi-based groups benefit from mobile-first tracking, automated reminders, and secure M-Pesa integration — 
                helping young professionals and youth save consistently for education, business startups, and emergencies.
              </p>
              <a href="#more" className="btn-learn-more">Learn More</a>
            </div>
          </div>

          <div className="impact-card">
            <div 
              className="card-image" 
              style={{ backgroundImage: "url('https://miro.medium.com/1*rxqjOAlrvXOr9mbi0XK6ug.jpeg')" }}
            ></div>
            <div className="card-content">
              <h3>Community & Family-Based Chamas</h3>
              <p>
                Mixed family and neighborhood groups across Kenya enjoy instant transaction visibility, loan disbursement transparency, 
                and SMS alerts for all members — fostering stronger financial discipline and community resilience.
              </p>
              <a href="#more" className="btn-learn-more">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;