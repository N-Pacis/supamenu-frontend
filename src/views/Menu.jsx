import React, { useEffect, useState } from "react";
import "../styles/landing.css";
import "../styles/menu.css";
import Navbar from "../components/Navbar/Navbar";
import MenuCategories from "../components/Menu/MenuCategories";
import CartItems from "../components/Menu/CartItems";
import { connect } from "react-redux";
import { saveCartItemsFn, saveRestaurantInfoFn } from "../actions/cartItemsAction";
import { useParams } from "react-router-dom";
import { fetchById, fetchMenuCategories } from "../actions/serviceProvidersAction";

const Menu = ({
    dispatch,
    cartItemsArr
}) => {
    const {id} = useParams();
    const [serviceProvider,setServiceProvider] = useState({})
    const [categories,setCategories] = useState([])

    useEffect(async()=>{
        let provider = await fetchById(id)
        let categoriesFromBackend = await fetchMenuCategories(id)
        dispatch(saveRestaurantInfoFn(provider))
        setServiceProvider(provider)
        setCategories(categoriesFromBackend)
    },[])

   
    const onAddToCartFn = (item) => {
        if (!isFoundInCart(item)) {
            item.quantity = 1;
            dispatch(saveCartItemsFn([...cartItemsArr, item]))
        }
    }
    const onRemoveFromCartFn = (item) => {
        cartItemsArr?.some((element, index) => {
            if (element.id == item.id) {
                let arr = [...cartItemsArr]
                arr.splice(index, 1)
                dispatch(saveCartItemsFn(arr))
            };
        })
    }

    const onUpdateCartFn = (item, quantity) => {
        cartItemsArr?.some((element, index) => {
            if (element.id == item.id) {
                let arrCheckout = [...cartItemsArr]
                if (quantity <= 0) {
                    return onRemoveFromCartFn(arrCheckout[index])
                }
                arrCheckout[index].quantity = quantity
                dispatch(saveCartItemsFn(arrCheckout))
            };
        })
    }

    const isFoundInCart = (item) => cartItemsArr?.some(element => {
        if (element.id == item.id) return true;
    })

    return (
        <>
            <div className="app-top-banner">
                <Navbar />
                <h2 className="app-title">{serviceProvider?.name}</h2>
                <p className="app-slogan">{serviceProvider?.address}</p>
            </div>
            <div className="app-low-banner">
                <div className="app-restaurant-image">
                    <img
                        src={serviceProvider?.defaultPic?.url}
                        className="app-restaurant-image-img"
                    />
                </div>
                <div className="categories">
                    <h1 className="menu-title">Menu</h1>
                    <MenuCategories
                        categories={categories}
                        onAddToCart={onAddToCartFn}
                        onRemoveFromCart={onRemoveFromCartFn}
                        isFoundInCart={isFoundInCart}
                    />
                </div>
                <div className="cart">
                    <CartItems
                        cartItems={cartItemsArr}
                        onUpdateCart={onUpdateCartFn}
                    />
                </div>
            </div>
        </>
    );
};
const mapStateToProps = (state) => ({
    cartItemsArr: state.cart.cartItems
  });
  
export default connect(mapStateToProps)(Menu);