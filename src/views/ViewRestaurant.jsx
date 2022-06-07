import React, { useEffect, useState } from "react";
import "../styles/landing.css";
import "../styles/search.css"
import Navbar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchById } from "../actions/serviceProvidersAction";

const ViewRestaurant = () => {
    const {id} = useParams();
    const [serviceProvider,setServiceProvider] = useState({})
    
    useEffect(async()=>{
        let provider = await fetchById(id)
        console.table(provider)
        setServiceProvider(provider)
    },[])

    return (
        <>
            <div className="app-top-banner">
                <Navbar />
                <h2 className="app-title">{serviceProvider?.name}</h2>
                <p className="app-slogan">{serviceProvider?.address}</p>
                <img src={serviceProvider?.imageUrl} className="restaurant-image"/>
            </div>
            <div className="app-low-banner-restaurant">
                <Link to={`/restaurants/${serviceProvider?.id}/menu`} className="restaurant-menu-btn">Checkout Menu</Link>
            </div>
        </>
    );
};

export default ViewRestaurant