import React, { useState } from "react";
import "../../styles/navbar.css";
import Logo from "../../assets/Navbar/logo.png";
import { FaSearch, FaBell } from "react-icons/fa";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = ({
    dispatch,
    message,
    isLoggedIn
}) => {
    const { user } = useSelector((state) => state.auth);
    let { firstName = "", lastName = "" } = user?.profile || {};
    if (user) {
        setIsLoggedIn(true)
    }
    const avatar = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&bold=true`
    return (
        <div className="navbar-div">
            <div className="app-logo-div">
                <img
                    src={Logo}
                    className="app-logo"
                    draggable={false}
                />
            </div>

            <div className="user-options">
                <Link to={"/search"}>
                    <FaSearch
                        className="search-icon"
                    />
                </Link>
                {
                    isLoggedIn && (
                        <>
                            <FaBell
                                className="bell-icon"
                            />
                            <p className="separator">|</p>
                            <p className="username">{firstName + " " + lastName}</p>
                            <img
                                src={avatar}
                                className="user-avatar"
                            />
                        </>
                    )
                }
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    message: state.message.message,
    isLoggedIn: state.auth.isLoggedIn
  });
  
export default connect(mapStateToProps)(Navbar);
