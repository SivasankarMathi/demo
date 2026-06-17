import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear errors when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log('Login successful', formData);
        setIsSubmitting(false);
        
        // Reset form after successful submission
        setFormData({
          email: '',
          password: ''
        });
      }, 1000);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1>Welcome Back</h1>
        <p>Please enter your credentials to login</p>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={formErrors.email ? 'error' : ''}
            />
            {formErrors.email && <div className="error-message">{formErrors.email}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={formErrors.password ? 'error' : ''}
            />
            {formErrors.password && <div className="error-message">{formErrors.password}</div>}
          </div>
          
          <div className="form-group remember-forgot">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#forgot" className="forgot-password">Forgot Password?</a>
          </div>
          
          <button 
            type="submit" 
            className="login-button" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="register-link">
          Don't have an account? <a href="#register">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;