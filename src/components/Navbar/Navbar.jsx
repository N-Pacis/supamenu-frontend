import React, { useState } from "react";
import "../../styles/navbar.css";
import Logo from "../../assets/Navbar/logo.png";
import { FaSearch, FaBell,FaBars } from "react-icons/fa";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = ({
    dispatch,
    message,
    isLoggedIn
}) => {
    const { user } = useSelector((state) => state.auth);
    let { firstName = "", lastName = "" } = user || {};
    const [toggleSidebar,setToggleSidebar] = useState(false)
    
    const avatar = `https://ui-avatars.com/api/?name=${firstName}&bold=true`

    const toggleSidebarFn = ()=>{
        setToggleSidebar(!toggleSidebar)
    }

    return (
        <div className="navbar-div">
            <FaBars 
                className="burger-icon"
                onClick={toggleSidebarFn}
            />
            <input type="checkbox" name="checkbox" id="check" hidden/>
            <div className="app-logo-div">
                <Link to="/" className="app-logo-link">
                    <img
                        src={Logo}
                        className="app-logo"
                        draggable={false}
                    />
                </Link>
            </div>

            <div className={`user-options ${toggleSidebar && 'user-options-active'}`}>
                <Link to={"/"} className="search-text navigation-item" >
                    My orders
                </Link>
                <Link to={"/search"} className="search-text navigation-item">
                    Restaurants
                </Link>
                {
                    isLoggedIn && (
                        <div className="user-profile-information">
                            <p className="username">{toggleSidebar ? 'Welcome '+ firstName: firstName }</p>
                            <img
                                src={avatar}
                                className="user-avatar"
                            />
                        </div>
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
