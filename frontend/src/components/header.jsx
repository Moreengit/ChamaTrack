import '../styles/header.css';

const Header = () => {
  return (
    <header className="header">
      <h1 className="logo">ChamaTrack</h1>
      <nav className="nav">
        <ul className="nav-list">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#service">Service</a></li>
          <li><a href="#register">Register Chama</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;