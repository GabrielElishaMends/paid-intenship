// src/components/LoginFirst.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './AddCompany.css';

const LoginFirst: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="full-screen-message d-flex flex-column justify-content-center align-items-center">
      <div className="text-center mb-4">
        <Link to="/" className="text-decoration-none">
          <h1 className="text-primary mt-2">PAID-INTERNSHIP</h1>
        </Link>
      </div>
      <div className="message-container text-center p-4 rounded shadow">
        <h1 className="text-danger mb-4">{message}</h1>
        <p className="mb-4">You need to be logged in to access this page.</p>
        <div className="d-flex justify-content-around w-100">
          <Link to="/login" className="btn btn-primary btn-lg">Go to Login</Link>
          <Link to="/" className="btn btn-secondary btn-lg">Go to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginFirst;
