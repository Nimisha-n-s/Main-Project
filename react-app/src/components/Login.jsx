import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import API_URL from "../constants";
import { Typography } from '@mui/material';

function Login() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameValid, setUsernameValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [error, setError] = useState('');

    const handleApi = () => {
        // Reset error message
        setError('');

        // Validation
        if (!username || !password) {
            if (!username) setUsernameValid(false);
            if (!password) setPasswordValid(false);
            setError('Please enter both username and password');
            return;
        }

        // Simulate authentication with server
        const url = API_URL + '/login';
        const data = { username, password };
        axios.post(url, data)
            .then((res) => {
                // Check if authentication is successful
                if (res.data.success) {
                    // Navigate to home page if authentication is successful
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('userId', res.data.userId);
                    navigate("/");
                } else {
                    // Display error message if authentication fails
                    setError('Incorrect username or password');
                }
            })
            .catch((err) => {
                // Handle server error
                console.error(err);
                setError('Server error. Please try again later.');
            });
    }

    return (
        <div>
            <Header />
            <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', paddingTop: '50px' }}>
                <div className="container" style={{ backgroundColor: '#f2f2f2', width: '500px', padding: '20px' }}>
                    <h3>Welcome to Login Page</h3>
                    {error && <div className="text-danger mb-3">{error}</div>}
                    <div className="form-group">
                        <label>Username</label>
                        <input 
                            className={`form-control ${!usernameValid ? 'is-invalid' : ''}`} 
                            type="text" 
                            value={username}
                            autoComplete="username" // Add autocomplete attribute
                            style={{ width: '100%' }}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setUsernameValid(true); // Reset validation state on change
                                setError(''); // Reset error message on change
                            }} />
                        {!usernameValid && <div className="invalid-feedback">{error}</div>}
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            className={`form-control ${!passwordValid ? 'is-invalid' : ''}`} 
                            type="password" 
                            value={password}
                            autoComplete="current-password" // Add autocomplete attribute
                            style={{ width: '100%' }}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordValid(true); // Reset validation state on change
                                setError(''); // Reset error message on change
                            }} />
                        {!passwordValid && <div className="invalid-feedback">{error}</div>}
                    </div>
                    <br/>
                    <button className="btn btn-primary mr-3" onClick={handleApi} style={{ display: 'block', margin: 'auto' }}>LOGIN</button>
                    <Typography align="center" gutterBottom>Don't have an account? <Link to="/signup">Sign up</Link></Typography>
                </div>
            </div>
        </div>
    )
}

export default Login;
