import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import  { useState } from 'react';
import axios from 'axios';

const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5224/api/Auth/login', {
                UserName: username,
                Password: password
            });

            // Lưu token vào state
            setToken(response.data.token);
            console.log('Token:', response.data.token);
        } catch (error) {
            console.error('Login failed:', error.response.data);
        }
    };

    return (
        <div>
            <h2>Đăng Nhập</h2>
            <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button onClick={handleLogin}>Đăng Nhập</button>

            {token && <p>Token: {token}</p>}
        </div>
    );
};
function App() {
  return (
    <LoginComponent/>
  )
}

export default App;
