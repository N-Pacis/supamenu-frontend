import React from "react";
import "../../styles/landing.css";
import { FaUserEdit } from "react-icons/fa";
import { FaGlassMartiniAlt } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";

const generateIcon = (icon) => {
    switch (icon) {
        case "register":
            return <FaUserEdit
                className="card-icon"
            ></FaUserEdit>
        case "order":
            return <FaGlassMartiniAlt className="card-icon"></FaGlassMartiniAlt>
        case "pay":
            return <FaWallet className="card-icon"></FaWallet>
        default:
            return null
    }
}

const Card = ({
    icon,
    title,
    description
}) => {
    return (
        <div className="card-div">
            {generateIcon(icon)}
            <p className="card-title">
                {title}
            </p>
            <p className="card-description">
                {description}
            </p> 
        </div>
    );
};

export default Card;
