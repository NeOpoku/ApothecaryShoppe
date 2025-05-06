import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from '../pages/Welcome';
import MyApothecary from '../pages/MyApothecary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/apothecary" element={<MyApothecary />} />
      </Routes>
    </Router>
  );
}