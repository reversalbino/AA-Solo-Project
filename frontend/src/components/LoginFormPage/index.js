import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './index.css';

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/" />
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password })).catch(async (res) => {
            const data = await res.json();
            console.log('ERRORS', errors);
            console.log('DATA.ERRORS: ', data.errors);
            if (data && data.errors) setErrors(data.errors);
        });

        
    }

    return (
        <div className='login-form'>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label className='input'>
                    <i className="fas fa-user" id='user-logo'></i>
                    <input
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        placeholder='Username or Email'
                        
                    />
                </label>
                <label className='input'>
                    <i className="fas fa-key" id='key-logo'></i>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                        
                    />
                </label>
                <div className='signup-login-buttons'>
                    <a href='/signup' className='button signup-login-button' id='register'>Register now </a>
                    <button type="submit" className='button signup-login-button' id='login-button'>Log In</button>
                </div>
            </form>
        </div>
    );
}

export default LoginFormPage;