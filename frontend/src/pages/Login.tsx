import React, { useState } from 'react';
import authService from '../services/auth.service';

/**
 * Defines the login form. 
 * TODO: Redesign so that the page is containable within a stylization element
 * @returns JSX containing the login form
 */
function Login() {
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
            const response = await authService.login({ username, password });

            console.log(response);
        } catch (err) {
            setError("Invalid username or password");
        } finally {
            setLoading(false);
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