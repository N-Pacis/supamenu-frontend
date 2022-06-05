import React, { useEffect, useState } from "react";
import "../styles/landing.css";
import "../styles/search.css"
import Navbar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";

const ViewRestaurant = () => {
    const restaurant = {
        "id": "1",
        "imageUrl": "https://img.freepik.com/free-photo/glass-papaya-juice-put-white-marble-floor_1150-28077.jpg?size=626&ext=jpg",
        "name": "Restaurant 1",
        "description": "World,African,Pizzeria,Coffee"
    }

    return (
        <>
            <div className="app-top-banner">
                <Navbar />
                <h2 className="app-title">{restaurant.name}</h2>
                <p className="app-slogan">{restaurant.description}</p>
                <img src={restaurant.imageUrl} className="restaurant-image"/>
            </div>
            <div className="app-low-banner-restaurant">
                <Link to={`/restaurants/${restaurant.id}/menu`} className="restaurant-menu-btn">Checkout Menu</Link>
            </div>
        </>
    );
};

export default ViewRestaurant