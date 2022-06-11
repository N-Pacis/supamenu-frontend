import React, { useEffect, useState } from "react";
import "../styles/landing.css";
import "../styles/search.css"
import Navbar from "../components/Navbar/Navbar";
import Input from "../components/Input";
import { FaSearch } from "react-icons/fa";
import RestaurantCard from "../components/Search/RestaurantCard";
import { connect } from "react-redux";
import { fetchServiceProviders, searchServiceProviders } from "../actions/serviceProvidersAction"

const Search = ({
    dispatch,
    serviceProvidersArr,
    loading
}) => {
    const [searchData, setSearchData] = useState('')
    const [isSearching, setIsSeaching] = useState(false)

    const inputHandler = (e) => {
        var value = e.target.value;
        setSearchData(value);
    };

    useEffect(() => {
        if (searchData != '') {
            dispatch(searchServiceProviders(searchData))
            setIsSeaching(true)
        }
        else {
            setIsSeaching(false)
        }
    }, [searchData])

    useEffect(() => {
        dispatch(fetchServiceProviders())
    }, [dispatch])

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
                        className="search-input"
                    ></Input>
                </div>
            </div>
            <div className="app-low-banner">
                {

                    <div className="nearby-restaurants-container">
                        <h1 className="nearby-title">Nearby Restaurants</h1>
                        <div className="nearby-restaurants-card-holder">
                            {
                                serviceProvidersArr.map(restaurant => (
                                    <RestaurantCard
                                        key={restaurant.id}
                                        imageUrl={restaurant.defaultPic?.url}
                                        title={restaurant.name}
                                        description={restaurant.address}
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
const mapStateToProps = (state) => {
    return ({
        serviceProvidersArr: state.serviceProv.serviceProviders,
        loading: state.serviceProv.loading,
    })
};

export default connect(mapStateToProps)(Search);
