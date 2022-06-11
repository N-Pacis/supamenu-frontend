import React, { useEffect, useState } from "react";
import Logo1 from "../assets/logo1.png"
import Logo2 from "../assets/logo2.png"
import { useHistory } from "react-router-dom";
import { clearMessage } from "../actions/messageAction";
import { useDispatch, useSelector } from "react-redux";
import "../styles/register.css"
import { Link } from "react-router-dom";
import { login } from "../actions/authActions";


const Login = ({ }) => {
    const initialUser = {
        login: "",
        password: "",
    };

    const [loginData, setLoginData] = useState(initialUser);
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading,setLoading] = useState(false);

    const inputHandler = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        dispatch(login(loginData))
            .then(() => {
                setLoading(false)
                history.push("/search");
            })
            .catch((err) => { 
                setLoading(false)
            });
    }
    useEffect(() => {
        dispatch(clearMessage());
    }, []);

    return (
        <div className="register-div">
            <Link to="/" className="logo-div">
                <img
                    src={Logo1}
                    className="logo"
                />
            </Link>
            <div className="form-container">
                <img className="form-container-logo" src={Logo2} />
                <div className="form-container-description">
                    <h1 className="welcome-text">Welcome ...</h1>
                    <p className="welcome-sub-text">Sign in to continue</p>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label id="loginLabel" style={{ display: 'none' }}>Email</label>
                            <input
                                name="login"
                                onChange={inputHandler}
                                type="text"
                                id="loginError"
                                placeholder="Your email"
                                className="register-input"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label id="passwordLabel" style={{ display: 'none' }}>Password</label>
                            <input
                                name="password"
                                onChange={inputHandler}
                                type="password"
                                id="passwordError"
                                placeholder="Password"
                                className="register-input"
                                required
                            />
                        </div>
                        <div className="mt-8 text-center">
                            <button
                                className="register-btn"
                                disabled={loading}
                            >
                                {loading ? <span>Wait ...</span> : <span>Sign In</span>}
                            </button>
                        </div>
                        <div className="check-account">
                            <h1 className="check-account-text">Don't have an account? <span><Link to="/register" className="check-account-link">Register</Link></span></h1>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default Login;
