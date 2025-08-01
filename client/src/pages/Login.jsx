import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('token', data.data.token);
        navigate('/dashboard');
      } else {
        alert('Login failed: ' + data.message);
      }
    } catch (error) {
      alert('Error: Make sure your server is running\n' + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login to Trip-AI</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field" 
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field" 
            required
          />
          <button type="submit" className="btn-primary w-full">Login</button>
        </form>
        
        <p className="text-center mt-4">
          No account? <Link to="/register" className="text-blue-600">Register</Link>
        </p>
        <Link to="/" className="block text-center mt-2 text-gray-600">Back to Home</Link>
      </div>
    </div>
  );
};

export default Login;
