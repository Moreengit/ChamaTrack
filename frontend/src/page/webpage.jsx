import Header from '../components/header';
import Home from '../components/home';
import About from '../components/about';
import Services from '../components/services';
import RegisterChama from '../components/registerchama';
import ContactUs from '../components/contactus';
import Footer from '../components/footer';
import '../styles/webpage.css';
const Webpage = () => {
  return (
    <div className="page">
      <Header />
      <main>
        <Home/>
        <About/>
        <Services/>.
        <RegisterChama/>
        <ContactUs/>
        <Footer/>
      </main>
    </div>
  );
};

export default Webpage;