import React, { useState } from "react";
import "./subPages_CSS/common.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const handleLogin = async () => {
    // Encrypt the password (simplified example)
    // const encryptedPassword = btoa(password); // Use HTTPS and backend will encrypt then store in db
    const response = await fetch(`${process.env.REACT_APP_API}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    });
    const result = await response.json();
    alert(result.message);
  };

  return (
    <>
      <div>
        <div className="word">
          <h2>Register</h2>
        </div>
        <div className="userregister">
          <div className="Login_box">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="Login_box">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            <button onClick={handleLogin}>Register</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
