// src/pages/Login.js

import React, { useState } from "react"; // Import useState
import { useNavigate } from "react-router-dom";
import {
  signInWithPopup,
  createUserWithEmailAndPassword, // Import for registration
  signInWithEmailAndPassword // Import for email/password login
} from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../firebase";
import './styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [isRegistering, setIsRegistering] = useState(false); // State to toggle between login/register UI

  const handleAuthSuccess = (userCredential) => {
    const user = userCredential.user;
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/dashboard");
  };

  const handleAuthError = (error, type) => {
    console.error(`${type} error:`, error.code, error.message);
    let errorMessage = "An unknown error occurred.";
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'This email is already registered. Try logging in.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address format.';
        break;
      case 'auth/weak-password':
        errorMessage = 'Password is too weak. Must be at least 6 characters.';
        break;
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        errorMessage = 'Invalid email or password.';
        break;
      case 'auth/operation-not-allowed':
        errorMessage = 'Email/Password authentication is not enabled. Please contact support.';
        break;
      default:
        errorMessage = `Authentication failed: ${error.message}`;
    }
    alert(errorMessage);
  };

  // Login with Email and Password
  const loginWithEmailPassword = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      handleAuthSuccess(userCredential);
    } catch (error) {
      handleAuthError(error, "Login");
    }
  };

  // Register with Email and Password
  const registerWithEmailPassword = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      handleAuthSuccess(userCredential);
    } catch (error) {
      handleAuthError(error, "Registration");
    }
  };

  // Login with Google (existing code)
  const loginWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      handleAuthSuccess(userCredential);
    } catch (error) {
      handleAuthError(error, "Google Login");
    }
  };

  // Login with GitHub (existing code)
  const loginWithGitHub = async () => {
    try {
      const userCredential = await signInWithPopup(auth, githubProvider);
      handleAuthSuccess(userCredential);
    } catch (error) {
      handleAuthError(error, "GitHub Login");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">
          Welcome to To do Task Management System
        </h2>

        {/* Email and Password Form */}
        <form onSubmit={isRegistering ? registerWithEmailPassword : loginWithEmailPassword} className="email-auth-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <button type="submit" className="login-button email-submit">
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>

        {/* Toggle between Register and Login */}
        <p className="toggle-auth-mode">
          {isRegistering ? (
            <>
              Already have an account?{" "}
              <span onClick={() => setIsRegistering(false)} className="toggle-link">
                Login
              </span>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <span onClick={() => setIsRegistering(true)} className="toggle-link">
                Register
              </span>
            </>
          )}
        </p>

        <div className="divider">OR</div> {/* Separator */}

        {/* Social Login Buttons */}
        <button
          onClick={loginWithGoogle}
          className="login-button google"
        >
          Sign in with Google
        </button>

        <button
          onClick={loginWithGitHub}
          className="login-button github"
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
};

export default Login;