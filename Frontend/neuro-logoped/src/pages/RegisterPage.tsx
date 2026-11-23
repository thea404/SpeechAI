
import { useState, type FormEvent } from 'react';

import AuthLayout from '../components/AuthLayout';
import Logo from '../components/Logo';

function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');

    // Check whether passwords match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        'https://localhost:7120/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        setSuccessMessage(
          'Registration successful! You can now sign in.'
        );

        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else if (response.status === 409) {
        setErrorMessage('An account with this email already exists.');
      } else if (response.status === 400) {
        setErrorMessage(
          'Please check your information. Make sure your password has at least 8 characters.'
        );
      } else {
        setErrorMessage(
          'Something went wrong. Please try again.'
        );
      }
    } catch {
      setErrorMessage(
        'Could not connect to the server. Please make sure the backend is running.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout>
      <div className="auth-card register-card">
        <div className="auth-logo">
          <Logo />
        </div>

        <div className="auth-heading">
          <h1>Create your account</h1>
          <p>
            Join NeuroLogoped and start building stronger communication skills.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="register-name-fields">
            <div className="form-group">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First name"
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last name"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="registerEmail">Email address</label>
            <input
              type="email"
              id="registerEmail"
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="registerPassword">Password</label>
            <input
              type="password"
              id="registerPassword"
              name="password"
              placeholder="Create a password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <label className="terms-checkbox">
            <input type="checkbox" required />
            <span>
              I agree to the <a href="#">Terms of Service</a> and{' '}
              <a href="#">Privacy Policy</a>
            </span>
          </label>

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
            {isSubmitting ? 'Creating account...' : 'Create Account'}
            {!isSubmitting && (
              <span className="button-arrow">→</span>
            )}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{' '}
          <a href="/login">Sign in</a>
        </p>
      </div>
    </AuthLayout>
  );
}

export default RegisterPage;
