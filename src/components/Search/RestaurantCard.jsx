import React from "react";
import "../../styles/landing.css";
import { Link } from "react-router-dom";
const RestaurantCard = ({
    imageUrl,
    title,
    description,
    id
}) => {
    return (
        <Link className="restaurant-card-div" to={`/restaurants/${id}`}>
            <img 
                src={imageUrl}
                className="restaurant-card-image"
            />
            <div className="restaurant-name-description">
                <p className="restaurant-card-title">
                    {title}
                </p>
                <p className="restaurant-card-description">
                    {description}
                </p>
            </div>
        </Link>
    );
};

export default RestaurantCard;
