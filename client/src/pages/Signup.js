import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { createUser } from './utils/API';
import Auth from './utils/auth';

const Signup = () => {
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
      const response = await createUser(userFormData);
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

  return (
    <div
      className="Login"
      style={{ backgroundImage: "url('/login-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}
    >
      <form
        onSubmit={handleFormSubmit}
        className="logBox"
      >
        <img src="/apothecary.svg" alt="My Apothecary Logo" className="logHead" />
        <img src="/anime.svg" alt="Anime character" className="loginCircle" />

        {showAlert && (
          <Alert dismissible onClose={() => setShowAlert(false)} variant='danger'>
            Something went wrong while creating your account!
          </Alert>
        )}

        <div className="emailbox">
          <label htmlFor="email" className="emailIcon">Email</label>
          <input
            type="email"
            name="email"
            value={userFormData.email}
            onChange={handleInputChange}
            className="emailOval"
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
            className="passwordOval"
            required
          />
        </div>

        <Button
          type="Create Account"
          disabled={!(userFormData.email && userFormData.password)}
          className="createButton"
        >
          Create Account
        </Button>
      </form>
    </div>
  );
};

export default SignUp;