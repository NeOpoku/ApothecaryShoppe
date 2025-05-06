import React from 'react';


const Login = () => {
  return (
    <div className="login-page">
      <div className="glass-box p-4 rounded shadow-lg text-center">
        <img src="../assets/images/1.png" alt="Apothecary Logo" className="logo mb-2" />

        <form className="login-form">
          <div className="form-group mb-3 text-start">
            <label htmlFor="email" className="form-label">
              <i className="bi bi-envelope me-2"></i>Email
            </label>
            <input type="email" className="form-control" id="email" />
          </div>

          <div className="form-group mb-3 text-start">
            <label htmlFor="password" className="form-label">
              <i className="bi bi-lock me-2"></i>Password
            </label>
            <input type="password" className="form-control" id="password" />
          </div>

        

          <button type="submit" className="btn btn-olive w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

