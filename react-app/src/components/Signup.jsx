import { Link } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import API_URL from "../constants";
import { Typography } from '@mui/material';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [error, setError] = useState('');
    const [invalidFields, setInvalidFields] = useState({});

    const handleApi = () => {
        // Basic validation
        const errors = {};
        if (!username) {
            errors.username = 'Username is required';
        }
        if (!password) {
            errors.password = 'Password is required';
        }
        if (!email) {
            errors.email = 'Email is required';
        } else if (!isValidEmail(email)) {
            errors.email = 'Invalid email address';
        }
        if (!mobile) {
            errors.mobile = 'Mobile is required';
        } else if (!isValidMobile(mobile)) {
            errors.mobile = 'Invalid mobile number';
        }

        if (Object.keys(errors).length > 0) {
            setError('');
            setInvalidFields(errors);
            return;
        }

        const url = API_URL + '/signup';
        const data = { username, password, mobile, email };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                alert('SERVER ERR')
            })
    };

    const isValidEmail = (email) => {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidMobile = (mobile) => {
        // Basic mobile number validation regex
        const mobileRegex = /^[0-9]{10}$/;
        return mobileRegex.test(mobile);
    };

    return (
        <div>
            <Header />
            <div className="container d-flex justify-content-center align-items-center" style={{ backgroundColor: '#f0f0f0', width: '500px', padding: '20px', marginTop: '50px' }}>
                <div className="p-3 text-center">
                    <h3> Welcome to Signup Page </h3>
                    <br />
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <div className="form-group">
                        <label htmlFor="username">USERNAME</label>
                        <input id="username" className={`form-control ${invalidFields.username && 'is-invalid'}`} type="text" value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setInvalidFields(prevState => ({ ...prevState, username: '' }));
                            }} />
                        {invalidFields.username && <div className="invalid-feedback">{invalidFields.username}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile">MOBILE</label>
                        <input id="mobile" className={`form-control ${invalidFields.mobile && 'is-invalid'}`} type="text" value={mobile}
                            onChange={(e) => {
                                setMobile(e.target.value);
                                setInvalidFields(prevState => ({ ...prevState, mobile: '' }));
                            }} />
                        {invalidFields.mobile && <div className="invalid-feedback">{invalidFields.mobile}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">EMAIL</label>
                        <input id="email" className={`form-control ${invalidFields.email && 'is-invalid'}`} type="text" value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setInvalidFields(prevState => ({ ...prevState, email: '' }));
                            }} />
                        {invalidFields.email && <div className="invalid-feedback">{invalidFields.email}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">PASSWORD</label>
                        <input id="password" className={`form-control ${invalidFields.password && 'is-invalid'}`} type="password" value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setInvalidFields(prevState => ({ ...prevState, password: '' }));
                            }} />
                        {invalidFields.password && <div className="invalid-feedback">{invalidFields.password}</div>}
                    </div>
                    <br />
                    <button className="btn btn-primary mr-3" onClick={handleApi}> SIGNUP </button>
                    <br />
                    <Typography variant="body1">Already have an Account? <Link to="/login">LOGIN</Link></Typography>
                </div>
            </div>
        </div>
    )
}

export default Signup;
