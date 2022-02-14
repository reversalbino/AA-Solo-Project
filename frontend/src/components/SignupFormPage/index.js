import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import * as sessionActions from "../../store/session";

import './SignupForm.css';

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <div className='signup-form'>
            <form onSubmit={handleSubmit} id='signup-form'>
                <p id='signup-text'>Sign Up</p>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label className="input">
                    <i className="fas fa-envelope logo"></i>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='E-Mail'
                        required
                    />
                </label>
                {/* <label>
                    Username
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label> */}
                <label className='input'>
                    <i className="fas fa-user logo"></i>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Username'

                    />
                </label>
                <label className="input">
                    <i className="fas fa-key logo"></i>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                        required
                    />
                </label>
                <label className="input">
                    <i className="fas fa-key logo"></i>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder='Confirm Password'
                        required
                    />
                </label>
                <div className='signup-login-buttons'>
                    <button id='login-button-signup-page'><a href='/login' className='button signup-login-button' id='register'>Have an account? Log In </a></button>
                    <button type="submit" className='button signup-login-button' id='register-button-signup-page'>Signup</button>
                </div>
            </form>
        </div>
    );
}

export default SignupFormPage;