import React, { useState, useEffect } from 'react';
import { 
  Home, Users, UserPlus, DollarSign, BarChart3, 
  ChevronDown, ChevronRight, FileText, PieChart, LogOut 
} from 'lucide-react';
import Overview from './overview';
import AddAdmins from './addAdmins';
import Minutes from './minutes';
import ViewMembers from './viewMembers';
import RegisterMember from './registerMember';
import ViewContributions from './contributions';
import FinancialReport from './financialReport';
import MemberPayment from './memberPayment';
import MemberContributions from './memberContributionView';
import ReceiptPage from './memberReceipt'
import '../styles/sidebar.css';

const Sidebar = () => {
  const [active, setActive] = useState("Home");
  const [reportsOpen, setReportsOpen] = useState(false);
  const [user, setUser] = useState({ name: '', role: '' });

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Define which menu items each role can see
  const menuConfig = {
    chairman: [
      { name: 'Home', icon: <Home size={20}/> },
      { name: 'Members', icon: <Users size={20}/> },
      { name: 'Add Admin', icon: <UserPlus size={20}/> },
      { name: 'Contributions', icon: <DollarSign size={20}/> },
      { name: 'Reports', icon: <BarChart3 size={20}/>, hasSubmenu: true }
    ],
    secretary: [
      { name: 'Home', icon: <Home size={20}/> },
      { name: 'Members', icon: <Users size={20}/> },
      { name: 'Add Members', icon: <UserPlus size={20}/> },
      { name: 'Upload Minutes', icon: <FileText size={20}/> }
    ],
    treasurer: [
      { name: 'Home', icon: <Home size={20}/> },
      { name: 'View Contributions', icon: <DollarSign size={20}/> },
      { name: 'Financial Report', icon: <PieChart size={20}/> }
    ],
    member: [
      { name: 'Home', icon: <Home size={20}/> },
      { name: 'My Contributions', icon: <DollarSign size={20}/> },
      { name: 'Make Payment', icon: <UserPlus size={20}/> },
      { name: 'Receipts', icon: <FileText size={20}/> }
    ]
  };

  const currentMenu = menuConfig[user.role] || menuConfig['chairman'];

  const renderContent = () => {
    switch(active){
      case 'Home': return <Overview />;
      case 'Add Admin': return <AddAdmins />;
      case 'Add Members': return <RegisterMember />
      case 'Members': return <ViewMembers/>
      case 'Upload Minutes': return <Minutes/>;
      case 'View Contributions': return <ViewContributions />;
      case 'Financial Report': return <FinancialReport />;
      case 'My Contributions': return <MemberContributions/>;
      case 'Make Payment': return <MemberPayment />;
      case 'Receipts': return <ReceiptPage/>;
      default: return <Overview />;
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="side-bar">
      <aside className="sidebar">
        <div className="logo">
          <h2>ChamaTrack</h2>
          <p className="role-badge">{user.role?.toUpperCase()}</p>
        </div>

        <div className="panel">
          {currentMenu.map((item) => (
            <div key={item.name}>
              <button
                onClick={() => item.hasSubmenu ? setReportsOpen(!reportsOpen) : setActive(item.name)}
                className={`menu-btn ${active === item.name ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.name}</span>
                {item.hasSubmenu && (reportsOpen ? <ChevronDown size={16}/> : <ChevronRight size={16}/>)}
              </button>

              {item.hasSubmenu && reportsOpen && (
                <div className="submenu">
                  <div onClick={() => setActive('Loan Reports')} className="submenu-item">Loan Reports</div>
                  <div onClick={() => setActive('Contribution Reports')} className="submenu-item">Contribution Reports</div>
                </div>
              )}
            </div>
          ))}

          <button onClick={handleLogout} className="menu-btn logout-btn">
            <LogOut size={20}/>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="main-render">
        <header className="top-nav">
          <h3>{active}</h3>
          <p>Welcome, back {user.name}</p>
          <p>Here’s what’s happening in your chama today.</p>
        </header>
        <div className="content-area">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Sidebar;