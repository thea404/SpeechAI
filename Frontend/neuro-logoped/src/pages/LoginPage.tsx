
import { useState, type FormEvent } from 'react';

import AuthLayout from '../components/AuthLayout';
import Logo from '../components/Logo';
import { useNavigate } from 'react-router-dom';
  

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      const response = await fetch(
        'https://localhost:7120/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (response.status === 401) {
        setErrorMessage('Invalid email or password.');
        return;
      }

      if (!response.ok) {
        setErrorMessage('Something went wrong. Please try again.');
        return;
      }

      const data = await response.json();

      if (!data.token) {
        setErrorMessage('The server did not return an authentication token.');
        return;
      }

      // Store the token depending on Remember me selection
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');

      if (rememberMe) {
        localStorage.setItem('token', data.token);
      } else {
        sessionStorage.setItem('token', data.token);
      }

      setSuccessMessage('Login successful! Welcome to NeuroLogoped.');

        setTimeout(() => {
          navigate('/dashboard');
        }, 700);
        
    } catch {
      setErrorMessage(
        'Could not connect to the server. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout>
      <div className="auth-card">
        <div className="auth-logo">
          <Logo />
        </div>

        <div className="auth-heading">
          <h1>Welcome back.</h1>
          <p>We're happy to see you again.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>

            <a href="#">Forgot password?</a>
          </div>

          {errorMessage && (
            <p className="form-error" role="alert">
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p className="form-success" role="status">
              {successMessage}
            </p>
          )}

          <button
            type="submit"
            className="auth-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
            {!isSubmitting && (
              <span className="button-arrow">→</span>
            )}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{' '}
          <a href="/register">Create account</a>
        </p>
      </div>
    </AuthLayout>
  );
}

export default LoginPage;
