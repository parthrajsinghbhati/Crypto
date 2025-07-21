import React, { useContext, useState } from 'react';
import './Login.css';
import user_icon from '../../assets/person.png';
import email_icon from '../../assets/email.png';
import password_icon from '../../assets/password.png';
import { CoinContext } from '../../context/CoinContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { login, signup } = useContext(CoinContext);
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (isSignup) {
      if (!form.name || !form.email || !form.password) {
        setError('All fields are required.');
        return;
      }
      signup(form.email, form.password, form.name);
      setSuccess('Signup successful! You can now log in.');
      setIsSignup(false);
      setForm({ name: '', email: '', password: '' });
    } else {
      if (!form.email || !form.password) {
        setError('Email and password are required.');
        return;
      }
      const loggedIn = login(form.email, form.password);
      if (!loggedIn) {
        setError('Invalid credentials.');
      } else {
        setSuccess('Login successful!');
        setTimeout(() => {
          navigate('/');
        }, 800);
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
        {isSignup && (
          <div className="input-group">
            <img src={user_icon} alt="User" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
        )}
        <div className="input-group">
          <img src={email_icon} alt="Email" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <img src={password_icon} alt="Password" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        {error && <div className="error-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}
        <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
        <p className="toggle-msg">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span onClick={() => { setIsSignup(!isSignup); setError(''); setSuccess(''); }}>
            {isSignup ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </form>
    </div>
  );
}
