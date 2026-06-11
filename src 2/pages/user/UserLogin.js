import React, { useState } from "react";
import "../admin/Auth.css";
import { auth } from '../../services/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginUser = async () => {
    if (!email || !password) {
      return setError("Please fill in all fields.");
    }
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged In Successfully!");
      navigate("/"); // Navigate to home page after login
    } catch (err) {
      if (err.code === 'auth/invalid-credential') {
        setError("Invalid email or password. Please try again.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">User Login</h2>
        {error && <p className="auth-error">{error}</p>}
        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <button className="auth-btn" onClick={loginUser} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

export default UserLogin;