import { useState } from 'react';
import SignupForm from './SignupForm';
import Login from './Login';
import ForgotPassword from './ForgotPassword';

export default function App() {
  const [view, setView] = useState('login');

  return (
    <div>
      {view === 'login' && <Login setView={setView} />}
      {view === 'signup' && <SignupForm />}
      {view === 'forgot' && <ForgotPassword />}
      <div className="text-center mt-4">
        {view === 'login' && (
          <button
            onClick={() => setView('signup')}
            className="text-blue-600 hover:underline"
          >
            Don't have an account? Sign up
          </button>
        )}
        {view === 'signup' && (
          <button
            onClick={() => setView('login')}
            className="text-blue-600 hover:underline"
          >
            Already have an account? Log in
          </button>
        )}
        {view === 'forgot' && (
          <button
            onClick={() => setView('login')}
            className="text-blue-600 hover:underline"
          >
            Back to Login
          </button>
        )}
      </div>
    </div>
  );
}