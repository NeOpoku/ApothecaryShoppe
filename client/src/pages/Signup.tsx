import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useAuth } from '../components/AuthContext'; // Make sure path is correct

const SignUp = () => {
  const [userFormData, setUserFormData] = useState({ 
    email: '', 
    password: '',
    displayName: '' // Added display name field
  });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const { signUp } = useAuth(); // Use the signUp function from AuthContext
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    // Form validation
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    // Password validation
    if (userFormData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      setShowAlert(true);
      return;
    }

    try {
      // Use the signUp function from AuthContext
      await signUp(
        userFormData.email, 
        userFormData.password,
        userFormData.displayName || userFormData.email.split('@')[0] // Use email username as fallback
      );
      
      // Navigate to home page on success
      navigate('/');
    } catch (err) {
      console.error('Signup error:', err);
      setErrorMessage(err.message || 'Something went wrong while creating your account!');
      setShowAlert(true);
    }
  };

  return (
    <div
      className="auth-container"
      style={{ 
        backgroundImage: "url('/assets/images/backgrounds/wood-texture.jpg')", 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        minHeight: '100vh' 
      }}
    >
      <form
        noValidate={validated}
        onSubmit={handleFormSubmit}
        className="auth-card"
      >
        <div className="auth-logo">
          <img src="/assets/images/icons/logo.svg" alt="The Apothecary Shoppe Logo" />
          <h1>THE APOTHECARY SHOPPE</h1>
        </div>
        
        <div className="profile-image">
          <img src="/assets/images/profile/avatar.svg" alt="Profile" className="auth-avatar" />
        </div>

        {showAlert && (
          <Alert 
            dismissible 
            onClose={() => setShowAlert(false)} 
            variant='danger'
            className="auth-alert"
          >
            {errorMessage}
          </Alert>
        )}

        {/* Optional display name field */}
        <div className="auth-form-group">
          <label htmlFor="displayName">Name (Optional)</label>
          <div className="auth-input-wrapper">
            <span className="auth-input-icon">👤</span>
            <input
              type="text"
              name="displayName"
              id="displayName"
              placeholder="Your name"
              value={userFormData.displayName}
              onChange={handleInputChange}
              className="auth-input"
            />
          </div>
        </div>

        <div className="auth-form-group">
          <label htmlFor="email">Email</label>
          <div className="auth-input-wrapper">
            <span className="auth-input-icon">📧</span>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={userFormData.email}
              onChange={handleInputChange}
              className="auth-input"
              required
            />
          </div>
          <div className="invalid-feedback">Please enter a valid email address</div>
        </div>

        <div className="auth-form-group">
          <label htmlFor="password">Password</label>
          <div className="auth-input-wrapper">
            <span className="auth-input-icon">🔒</span>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Create a password"
              value={userFormData.password}
              onChange={handleInputChange}
              className="auth-input"
              minLength={6}
              required
            />
          </div>
          <div className="invalid-feedback">Password must be at least 6 characters long</div>
        </div>

        <button
          type="submit"
          disabled={!(userFormData.email && userFormData.password)}
          className="auth-button"
        >
          Create Account
        </button>

        <p className="auth-redirect">
          Already have an account? <a href="/login" className="auth-link">Login</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;