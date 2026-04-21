import Webpage from './page/webpage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './auth/registerform';
import Login from './auth/login';
import Dashboard from './dashboard/adminDashboard';
import ReceiptPage from './components/memberReceipt';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Webpage />} />
        <Route  path="/registerchama" element={<RegisterForm/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/receipt/:id" element={<ReceiptPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;