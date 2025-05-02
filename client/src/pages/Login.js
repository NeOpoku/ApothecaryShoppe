import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { loginUser } from '../utils/API';
import Auth from '../utils/auth';

const Login = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    try {
      const response = await loginUser(userFormData);
      if (!response.ok) {
        throw new Error('something went wrong!');
      }
      const { token } = await response.json();
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({ email: '', password: '' });
  };

  const handleForgotPassword = () => {
    alert('Sending reset instructions...');
  };

  return (
    <div
      className="Login"
      style={{ backgroundImage: "url('/login-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}
    >
      <form
        onSubmit={handleFormSubmit}
        className="logBox bg-white bg-opacity-90 p-5 rounded-xl shadow-lg max-w-md mx-auto"
      >
        <img src="/apothecary.svg" alt="My Apothecary Logo" className="loginLogo" />
        <img src="/anime.svg" alt="Anime character" className="loginCircle" />

        {showAlert && (
          <Alert dismissible onClose={() => setShowAlert(false)} variant='danger'>
            Something went wrong with your login credentials!
          </Alert>
        )}

        <div className="emailbox">
          <label htmlFor="email" className="emailIcon">Email</label>
          <input
            type="email"
            name="email"
            value={userFormData.email}
            onChange={handleInputChange}
            className="emailFillBox"
            required
          />
        </div>

        <div className="loginPass">
          <label htmlFor="password" className="passwordIcon">Password</label>
          <input
            type="password"
            name="password"
            value={userFormData.password}
            onChange={handleInputChange}
            className="passwordFillBox"/>
        </div>

        <div className="forgotPassword">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="passwordReqButton"
          >
            Forgot password
          </button>
        </div>

        <Button
          type="Login"
          disabled={!(userFormData.email && userFormData.password)}
          className="loginButton"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
