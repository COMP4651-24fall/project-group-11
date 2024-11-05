// LoginPage.js
import React, { useState } from 'react';

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
    <div>
    <div style={{margin:"100px"}}>
      This is login page
    </div>
    <div>
      
    </div>
    </div>
  );
}

export default LoginPage;