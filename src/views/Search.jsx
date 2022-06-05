import React, { useEffect, useState } from "react";
import "../styles/landing.css";
import "../styles/search.css"
import Navbar from "../components/Navbar/Navbar";
import Input from "../components/Input";
import { FaSearch } from "react-icons/fa";
import RestaurantCard from "../components/Search/RestaurantCard";

const Search = ({ }) => {
    const [searchData, setSearchData] = useState('')
    const [isSearching, setIsSeaching] = useState(false)

    const inputHandler = (e) => {
        var value = e.target.value;
        setSearchData(value);
    };

    useEffect(() => {
        searchData != '' ? setIsSeaching(true) : setIsSeaching(false)
    }, [searchData])

    const nearbyRestaurants = [
        {
            "id": "1",
            "imageUrl": "https://img.freepik.com/free-photo/glass-papaya-juice-put-white-marble-floor_1150-28077.jpg?size=626&ext=jpg",
            "name": "Restaurant 1",
            "description": "World,African,Pizzeria,Coffee"
        },
        {
            "id": "2",
            "imageUrl": "https://img.freepik.com/free-photo/glass-papaya-juice-put-white-marble-floor_1150-28077.jpg?size=626&ext=jpg",
            "name": "Restaurant 2",
            "description": "World,African,Pizzeria,Coffee"
        },
        {
            "id": "3",
            "imageUrl": "https://img.freepik.com/free-photo/glass-papaya-juice-put-white-marble-floor_1150-28077.jpg?size=626&ext=jpg",
            "name": "Restaurant 3",
            "description": "World,African,Pizzeria,Coffee"
        },
        {
            "id": "4",
            "imageUrl": "https://img.freepik.com/free-photo/glass-papaya-juice-put-white-marble-floor_1150-28077.jpg?size=626&ext=jpg",
            "name": "Restaurant 4",
            "description": "World,African,Pizzeria,Coffee"
        },
        {
            "id": "5",
            "imageUrl": "https://img.freepik.com/free-photo/glass-papaya-juice-put-white-marble-floor_1150-28077.jpg?size=626&ext=jpg",
            "name": "Restaurant 5",
            "description": "World,African,Pizzeria,Coffee"
        },
        {
            "id": "6",
            "imageUrl": "https://img.freepik.com/free-photo/glass-papaya-juice-put-white-marble-floor_1150-28077.jpg?size=626&ext=jpg",
            "name": "Restaurant 6",
            "description": "World,African,Pizzeria,Coffee"
        },
    ]

    return (
        <>
            <div className="app-top-banner">
                <Navbar />
                <h2 className="app-title">Your favorite restaurant at glance</h2>
                <p className="app-slogan">Search for your prefered restaurant</p>
                <div className="search-container">
                    <FaSearch
                        className="search-restaurant-icon"
                    />
                    <Input
                        name="search"
                        inputHandler={inputHandler}
                        placeholder="Search"
                    ></Input>
                </div>
            </div>
            <div className="app-low-banner">
                {
                    isSearching ?
                        <div className="search-result-container">
                        </div>
                        :
                        <div className="nearby-restaurants-container">
                            <h1 className="nearby-title">Nearby Restaurants</h1>
                            <div className="nearby-restaurants-card-holder">
                                {
                                    nearbyRestaurants.map(restaurant => (
                                        <RestaurantCard
                                            key={restaurant.id}
                                            imageUrl={restaurant.imageUrl}
                                            title={restaurant.name}
                                            description={restaurant.description}
                                            id={restaurant.id}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                }
            </div>
        </>
    );
};

export default Search;
