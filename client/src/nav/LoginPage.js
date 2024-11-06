// LoginPage.js
import React, { useState } from 'react';
import { Link} from "react-router-dom";
import './common.css'
function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Encrypt the password (simplified example)
    const encryptedPassword = btoa(password); // Replace with AES encryption

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password: encryptedPassword }),
    });

    const result = await response.json();
    alert(result.message);
  };

  return (
    <>
    <div>
      <div className='word'><h2>Please Login</h2></div>
      <div className='Login_box'>
        
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='password_box'>
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
        <div className="register">
          <Link to ="/register">Press here to register</Link>
        </div>
      
    </div>
    
    
      
    </>
  );
}

export default LoginPage;