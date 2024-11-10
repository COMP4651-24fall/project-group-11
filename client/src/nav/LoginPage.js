// LoginPage.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./common.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Encrypt the password (simplified example)
    // const encryptedPassword = btoa(password); // Use HTTPS and backend will encrypt then store in db

    const response = await fetch("http://localhost:8000/user/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    localStorage.setItem("token", result.token);
    localStorage.setItem("username", result.username);
    alert(result.message);
    navigate("/");
  };

  return (
    <>
      <div>
        <div className="word">
          <h2>Please Login</h2>
        </div>
        <div className="login">
          <div className="Login_box">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password_box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="submit_btn">
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
        <div className="register">
          <Link to="/register">Press here to register</Link>
        </div>
      </div>
    </>
  );
}
export default LoginPage;
