export default function Login() {
    return (
      <div className="page-bg" style={{ backgroundImage: 'url(/images/2.png)' }}>
        <div className="auth-form">
          <h2>Login</h2>
          <input className="input" type="email" placeholder="Email" />
          <input className="input" type="password" placeholder="Password" />
          <button className="button">Login</button>
        </div>
      </div>
    );
  }
  