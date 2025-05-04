import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // This should call an actual API endpoint to handle password reset
    console.log(`Password reset instructions sent to: ${email}`);
    setSubmitted(true);
  };

  return (
    <div
      className="Login"
      style={{ backgroundImage: "url('/login-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}
    >
      <form
        onSubmit={handleSubmit}
        className="logBox bg-white bg-opacity-90 p-5 rounded-xl shadow-lg max-w-md mx-auto"
      >
        <img src="/apothecary.svg" alt="My Apothecary Logo" className="logHead mx-auto mb-3" />
        <img src="/anime.svg" alt="Anime character" className="loginCircle mx-auto mb-4 rounded-full w-24 h-24" />

        {submitted ? (
          <Alert variant="success">Check your inbox for reset instructions!</Alert>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-center mb-4">Forgot Password</h2>
            <Form.Group className='mb-4'>
              <Form.Label htmlFor='email'>Enter your email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Your email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              type='submit'
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Send Reset Instructions
            </Button>
          </>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;