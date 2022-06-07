import React, { useEffect, useState } from "react";
import Logo1 from "../assets/logo1.png"
import Logo2 from "../assets/logo2.png"
import { useHistory } from "react-router-dom";
import { clearMessage } from "../actions/messageAction";
import { useDispatch, useSelector } from "react-redux";
import "../styles/register.css"
import { Link } from "react-router-dom";
import { registerUser } from "../actions/authActions";

const Register = ({ }) => {
    const initialUser = {
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        password: "",
    };

    const [registerData, setRegisterData] = useState(initialUser);
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();



    const inputHandler = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setRegisterData({ ...registerData, [name]: value });
    };

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        registerUser(registerData)
            .then((resp) => {
                setLoading(false)
                if(resp.success){
                    history.push("/login");
                }
        })
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
                    <p className="welcome-sub-text">Please fill in the information</p>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="input-group">
                            <input
                                name="firstName"
                                onChange={inputHandler}
                                type="text"
                                placeholder="First Name"
                                className="register-input"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                name="lastName"
                                onChange={inputHandler}
                                type="text"
                                placeholder="Last Name"
                                className="register-input"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                name="mobile"
                                onChange={inputHandler}
                                type="text"
                                placeholder="Phone Number"
                                className="register-input"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                name="email"
                                onChange={inputHandler}
                                type="text"
                                placeholder="Your email"
                                className="register-input"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                name="password"
                                onChange={inputHandler}
                                type="password"
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
                                {loading ? <span>Wait ...</span> : <span>Proceed</span>}
                            </button>
                        </div>
                        <div className="check-account">
                            <h1 className="check-account-text">Already have an account? <span><Link to="/login" className="check-account-link">Login</Link></span></h1>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default Register;
