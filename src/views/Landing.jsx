import React from "react";
import { Link } from "react-router-dom";
import "../styles/landing.css";
import cardBackground from "../assets/Landing/card-background.png"
import Card from "../components/Landing/card";
import Navbar from "../components/Navbar/Navbar";

const Landing = ({}) => {
  const cards = [
      {
          "id": 1,
          "title": "Step 1",
          "description": "Register your account",
          "icon":"register"
      },
      {
        "id": 2,
        "title": "Step 2",
        "description": "Order & reorder",
        "icon":"order"
      },
      {
        "id": 3,
        "title": "Step 3 ",
        "description": "Payment",
        "icon":"pay"
    }
  ]
  return (
    <div className="landing-div">
        <div className="app-top-banner">
            <Navbar />
            <h2 className="app-title">All your favorite restaurants at a glance</h2>
            <p className="app-slogan">Order, reorder or simply pay: rapid, safe & secure !</p>
            <div className="account-btns">
                <Link className="register-landing-btn" to="/register">
                    Register your account
                </Link>
                <Link className="login-landing-btn" to="/login">
                    Register already registered? Signin
                </Link>
            </div> 
        </div>
        <div className="app-low-banner">
            <div className="app-low-banner-background">
               <img 
                    src={cardBackground}
                    className="card-background-image"
               /> 
            </div>
            <div className="cards-holder">
                {
                    cards.map(card => (
                        <Card 
                            key={card.id}
                            title={card.title}
                            description={card.description}
                            icon={card.icon}
                        />
                    ))
                }
            </div>
        </div>
    </div>
  );
};

export default Landing;
