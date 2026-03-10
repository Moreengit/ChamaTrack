import { Routes, Route } from 'react-router-dom';

import Header from '../components/header';
import Home from '../components/home';
import About from '../components/about';
import Services from '../components/services';
import RegisterChama from '../components/registerchama';
import RegisterForm from '../auth/registerform';     
import ContactUs from '../components/contactus';
import Footer from '../components/footer';

import '../styles/webpage.css';

const Webpage = () => {
  return (
    <div className="page">
      <Header />

      <main>
        <Routes>
          {/* Home page shows all main sections */}
          <Route
            path="/"
            element={
              <>
                <Home />
                <About />
                <Services />
                <RegisterChama />
                <ContactUs />
              </>
            }
          />

          {/* Dedicated full-page form when user clicks Register Chama */}
          <Route path="/register-chama" element={<RegisterForm />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default Webpage;