import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useAuth } from '../components/AuthContext'; // Make sure path is correct

const Login = () => {
  const [userFormData, setUserFormData] = useState({ 
    email: '', 
    password: '' 
  });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const { login } = useAuth(); // Use the login function from AuthContext
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

    try {
      // Use the login function from AuthContext
      await login(userFormData.email, userFormData.password);
      
      // Navigate to home page on success
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage('Invalid email or password. Please try again.');
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
        noValidate
        onSubmit={handleFormSubmit}
        className="auth-card"
      >
        <div className="auth-logo">
          <img src="/assets/images/_Logo.svg" alt="The Apothecary Shoppe Logo" />
          <h1>THE APOTHECARY SHOPPE</h1>
        </div>
        
        <div className="profile-image">
          <img src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" alt="Profile" className="auth-avatar" />
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
              placeholder="Enter your password"
              value={userFormData.password}
              onChange={handleInputChange}
              className="auth-input"
              required
            />
          </div>
          <div className="invalid-feedback">Please enter your password</div>
        </div>

        <div className="auth-forgot-password">
          <a href="/forgot-password" className="auth-link-small">Forgot Password?</a>
        </div>

        <button
          type="submit"
          disabled={!(userFormData.email && userFormData.password)}
          className="auth-button"
        >
          Login
        </button>

        <p className="auth-redirect">
          Don't have an account? <a href="/signup" className="auth-link">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;