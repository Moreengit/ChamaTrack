import Webpage from './page/webpage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Webpage />} />
      </Routes>
    </Router>
  );
}

export default App;