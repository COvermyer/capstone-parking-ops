import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

/**
 * Defines the login form. 
 * TODO: Redesign so that the page is containable within a stylization element
 * @returns JSX containing the login form
 */
const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    /**
     * Handles the submission of the login form, calling the authentication service. 
     * @param event an HTML Form Event, sent by the form element
     */
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        
        setLoading(true);
        try {
            await login(username, password);
            console.log("Log in successful");

        } catch (err) {
            console.log("Log in failed");
            setError("Invalid username or password");
        } finally {
            setLoading(false);
        }

        try {
            const response = await api.get('/api/users');
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    return(
        <div className='Login'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='username'>Username</label>
                    <input
                        id='username'
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        id='password'
                        type='text'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {error && (
                    <p>{error}</p>
                )}

                <button
                    type='submit'
                    disabled={loading}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;