    import React, { useEffect, useState } from "react";
    import Logo1 from "../assets/logo1.png"
    import Logo2 from "../assets/logo2.png"
    import { showInputError, showFormErrors } from "../helpers/validateInput";
    import { useHistory } from "react-router-dom";
    import { clearMessage } from "../actions/messageAction";
    import { useDispatch, useSelector } from "react-redux";
    import "../styles/register.css"
    import { Link } from "react-router-dom";

    const Login = ({ }) => {
        const initialUser = {
            email: "",
            password: "",
        };

        const [registerData, setRegisterData] = useState(initialUser);
        const { isLoading } = useSelector((state) => state.auth);
        const dispatch = useDispatch();
        const history = useHistory();
        const loading = isLoading;



        const inputHandler = (e) => {
            var name = e.target.name;
            var value = e.target.value;
            setRegisterData({ ...registerData, [name]: value });
            showInputError(e.target);
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            if (!showFormErrors()) {
                dispatch(login(registerData))
                    .then(() => {
                        history.push("/dashboard");
                    })
                    .catch((err) => { });
            }
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
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="input-group">
                                <input
                                    name="email"
                                    inputHandler={inputHandler}
                                    type="text"
                                    placeholder="Your email"
                                    className="register-input"
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    name="password"
                                    inputHandler={inputHandler}
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
