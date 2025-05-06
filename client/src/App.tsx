// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import { ApothecaryProvider } from './components/ApothecaryContext';
import { SearchProvider } from './components/SearchContext';

import Welcome from './pages/Welcome';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import MyApothecary from './pages/MyApothecary';
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// ✅ Protected Route wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state } = useAuth();
  return state.isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// ✅ Main AppContent
const AppContent: React.FC = () => {
  return (
    <Router>
      <Header />
      <main className="main-content">
      
        <Routes>
          <Route path="/" element={<Welcome />} />
    
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/my-apothecary"
            element={
              <ProtectedRoute>
                <MyApothecary />
              </ProtectedRoute>
            }
          />
          {/* Add more routes here */}
          {/* You can define more routes like /about or /search later */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

// ✅ Main App with Context Providers
const App: React.FC = () => {
  return (
    <AuthProvider>
      <ApothecaryProvider>
        <SearchProvider>
          <AppContent />
        </SearchProvider>
      </ApothecaryProvider>
    </AuthProvider>
  );
};

export default App;



