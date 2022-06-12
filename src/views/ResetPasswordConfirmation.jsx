import React, { useEffect, useState } from "react";
import Logo1 from "../assets/logo1.png"
import Logo2 from "../assets/logo2.png"
import { useHistory } from "react-router-dom";
import { clearMessage } from "../actions/messageAction";
import { useDispatch, useSelector } from "react-redux";
import "../styles/register.css"
import { Link } from "react-router-dom";
import { login, resetPassword } from "../actions/authActions";


const ResetPasswordConfirmation = ({ }) => {
    const initialData = {
        email: "",
        activationCode: "",
        password: "",
    };

    const [formData, setFormData] = useState(initialData);
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading,setLoading] = useState(false);

    const inputHandler = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        resetPassword(formData)
            .then(() => {
                setLoading(false)
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
                    <h1 className="welcome-text">Password Reset</h1>
                    <p className="welcome-sub-text">Enter your email to reset your password</p>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label id="loginLabel" style={{ display: 'none' }}>Email</label>
                            <input
                                name="email"
                                onChange={inputHandler}
                                type="text"
                                id="loginError"
                                placeholder="Your email"
                                className="register-input"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                name="activationCode"
                                onChange={inputHandler}
                                type="text"
                                id="loginError"
                                placeholder="Activation code sent to the email..."
                                className="register-input"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                name="password"
                                onChange={inputHandler}
                                type="password"
                                id="loginError"
                                placeholder="New password"
                                className="register-input"
                                required
                            />
                        </div>
                        <div className="mt-8 text-center">
                            <button
                                className="register-btn"
                                disabled={loading}
                            >
                                {loading ? <span>Wait ...</span> : <span>Reset Password</span>}
                            </button>
                        </div>
                        <div className="check-account">
                            <h1 className="check-account-text">Don't have a code? <span><Link to="/reset-password" className="check-account-link">Get a code</Link></span></h1>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default ResetPasswordConfirmation;
