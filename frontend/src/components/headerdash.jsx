import React from 'react';
import { Bell, Search, UserCircle } from 'lucide-react';
import '../styles/headerdash.css';

const Header = ({ active }) => {
  return (
    <header className="header">

      {/* Left: Page Title */}
      <div className="header-left">
        <h2> ChamaTrack</h2>
        <h2>{active}</h2>
      </div>

      {/* Center: Search */}
      <div className="header-center">
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      {/* Right: Icons */}
      <div className="header-right">
        <Bell className="icon" size={20} />
        <UserCircle className="icon" size={28} />

        <button className="logout-btn">
          Logout
        </button>
      </div>

    </header>
  );
};

export default Header;