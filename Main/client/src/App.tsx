import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./Components/NavBar";
import HeroBanner from "./Components/HeroBanner";
import ServicesSection from "./Components/ServicesSection";
import DrawerCabinet from "./Components/DrawerCabinet";
import SearchFilter from "./Components/SearchFilter";
import SearchResultsGrid from "./Components/SearchResultsGrid";
import Footer from "./Components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; 
import 'aos/dist/aos.css';


function App() {
  return (
    <Router>
      <div className="font-sans">
        <NavBar />
        <Routes>
          <Route path="/" element={
            <>
              <HeroBanner />
              <ServicesSection /> 
              <DrawerCabinet />
              <SearchFilter />
              <SearchResultsGrid />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
