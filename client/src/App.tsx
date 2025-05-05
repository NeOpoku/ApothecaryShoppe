// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import { ApothecaryProvider } from './components/ApothecaryContext';
import { SearchProvider } from './components/SearchContext';

// Layout Components
import Header from './pages/Header';
import Footer from './pages/Footer';

// Auth Components
import Login from './pages/Login';
import SignUp from './pages/SignUp';

// Home Components
import Welcome from './components/Welcome';

// Apothecary Components
import MyApothecary from './pages/Myapothecary';

// Search Components
import HerbDetail from './components/Search/HerbDetail';


// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state } = useAuth();
  
  if (!state.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  return (
    <Router>
      <Header />
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/herbs/:id" element={<HerbDetail />} />
          
          {/* Protected Routes */}
          <Route 
            path="/my-apothecary" 
            element={
              <ProtectedRoute>
                <MyApothecary />
              </ProtectedRoute>
            } 
          />
          
          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

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