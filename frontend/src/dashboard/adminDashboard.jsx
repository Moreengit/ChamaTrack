//import  { useState } from 'react';
import Header from '../components/headerdash'; 
import Sidebar from '../components/sidebar';       
import FooterDash from '../components/footerDash';

import '../styles/admindashboard.css';

export default function AdminDashboard({ children }) {

  return (
    <div className="">
      <header>
        <Header />

      </header>
      <main className="">
        <Sidebar/>

      </main>
     <FooterDash/>
    </div>
  );
};
