import './App.css';
import Login from './components/login/login';
import Home from './components/home/home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loans from './components/loans/loans';
import LoansView from './components/loans-view/loansView';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/loans-view" element={<LoansView />} />
      </Routes>
    </Router>
  );
}

export default App;
