import React, { useState } from "react";
import "../admin/Auth.css";
import { auth } from '../../services/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function UserSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signupUser = async () => {
    if (!email || !password) {
      return setError("Please fill in all fields.");
    }
    setLoading(true);
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("User Created Successfully!");
      navigate("/user-login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">User Signup</h2>
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
        <button className="auth-btn" onClick={signupUser} disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </button>
        <p className="auth-link">
          Already a member? <span onClick={() => navigate("/user-login")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default UserSignup;