import Webpage from './page/webpage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './auth/registerform';
import Login from './auth/login';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Webpage />} />
        <Route  path="/auth/registerchama" element={<RegisterForm/>}/>
        <Route path="/auth/login" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;