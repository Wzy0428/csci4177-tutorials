import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

const Login = () => {
    //useNavigate returns a function that can call to change pages
    const navigate = useNavigate();

    //const [value, setValue] = useState(initialValue)
    //setter function: triggers a re-render with the new value
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    //Form submit handler runs when the form is submitted
    const handleSubmit = async (e) => {
        e.preventDefault(); //prevent default form behavior (page refresh)
        setError('');   //clear any previous error
        setLoading(true);   //show "Logging in..." on the button

        //Navigate to users page
        //replace true means the login page is removed so pressing "Back" won't return to login
        try {
            await loginUser(email, password);   //wait for API response
            navigate('/users', {replace: true});
        } catch (err) {
            //If err.response exists, check data, then message
            setError(
               'Login failed. Please check your credentails!'
            );
        } finally {
            setLoading(false);  //always runs
        }
    };

    return (
        <div className='login-container'>
            <div className='login-box'>
                <h2>Login</h2>
                    <form onSubmit={handleSubmit}>

                        {/* EMAIL INPUT */}
                        <div className='form-group'>
                            <label htmlFor='email'>Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email} //input value comes from state
                                //e = event object
                                //e.target = the input element
                                //e.target.value = what user typed
                                onChange={(e) => setEmail(e.target.value)} //onChange: when user types, update state
                                required
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* PASSWORD INPUT */}
                        <div className='form-group'>
                            <label htmlFor='password'>Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder='Enter your password'
                            />
                        </div>

                        {error && (
                            <div className='error-message'>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading} //Disable while loading
                            className="login-button"
                        >
                            {/* Show different text based on loading state */}
                            {loading ? 'Logging in...': 'Login'}
                        </button>
                    </form>
            </div>
        </div>
    );
};

export default Login;
