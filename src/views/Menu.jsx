import React, { useEffect, useState } from "react";
import "../styles/landing.css";
import "../styles/menu.css";
import Navbar from "../components/Navbar/Navbar";
import MenuCategories from "../components/Menu/MenuCategories";
import CartItems from "../components/Menu/CartItems";
import { connect } from "react-redux";
import { saveCartItemsFn } from "../actions/cartItemsAction";
import { useParams } from "react-router-dom";
import { fetchById } from "../actions/serviceProvidersAction";

const Menu = ({
    dispatch,
    cartItemsArr
}) => {
    const {id} = useParams();
    const [serviceProvider,setServiceProvider] = useState({})

    useEffect(async()=>{
        let provider = await fetchById(id)
        setServiceProvider(provider)
    },[])

    const categories = [
        {
            id: "1",
            name: "Appetizer",
            menu: [
                {
                    id: "1000",
                    name: "Meat soup",
                    imageUrl: "https://media.istockphoto.com/photos/diverse-keto-dishes-picture-id1280158821?b=1&k=20&m=1280158821&s=170667a&w=0&h=ibwKxBzWcygq6NMKO5FTD-3ljLvwM8E1WVevw7XSmlk=",
                    quantity:1,
                    price: 15
                },
                {
                    id: "2000",
                    name: "Chinese soup",
                    imageUrl: "https://media.istockphoto.com/photos/diverse-keto-dishes-picture-id1280158821?b=1&k=20&m=1280158821&s=170667a&w=0&h=ibwKxBzWcygq6NMKO5FTD-3ljLvwM8E1WVevw7XSmlk=",                    
                    quantity:1,
                    price: 15
                },
            ]
        },
        {
            id: "2",
            name: "Starter",
            menu: [
                {
                    id: "3000",
                    name: "Salad",
                    imageUrl: "https://media.istockphoto.com/photos/diverse-keto-dishes-picture-id1280158821?b=1&k=20&m=1280158821&s=170667a&w=0&h=ibwKxBzWcygq6NMKO5FTD-3ljLvwM8E1WVevw7XSmlk=",
                    quantity:1,
                    price: 15
                },
                {
                    id: "4000",
                    name: "Spaghetti",
                    imageUrl: "https://media.istockphoto.com/photos/diverse-keto-dishes-picture-id1280158821?b=1&k=20&m=1280158821&s=170667a&w=0&h=ibwKxBzWcygq6NMKO5FTD-3ljLvwM8E1WVevw7XSmlk=",
                    quantity:1,
                    price: 16
                }
            ]
        },
        {
            id: "3",
            name: "Main",
            menu: [
                {
                    id: "6000",
                    name: "Eggs",
                    imageUrl: "https://media.istockphoto.com/photos/diverse-keto-dishes-picture-id1280158821?b=1&k=20&m=1280158821&s=170667a&w=0&h=ibwKxBzWcygq6NMKO5FTD-3ljLvwM8E1WVevw7XSmlk=",
                    quantity:1,
                    price: 10
                },
                {
                    id: "7000",
                    name: "Burger",
                    imageUrl: "https://media.istockphoto.com/photos/diverse-keto-dishes-picture-id1280158821?b=1&k=20&m=1280158821&s=170667a&w=0&h=ibwKxBzWcygq6NMKO5FTD-3ljLvwM8E1WVevw7XSmlk=",
                    quantity:1,
                    price: 10
                }
            ]
        },
        {
            id: "4",
            name: "Dessert"
        },
        {
            id: "5",
            name: "Drink",
            menu: [
                {
                    id: "8000",
                    name: "Fanta",
                    imageUrl: "https://media.istockphoto.com/photos/diverse-keto-dishes-picture-id1280158821?b=1&k=20&m=1280158821&s=170667a&w=0&h=ibwKxBzWcygq6NMKO5FTD-3ljLvwM8E1WVevw7XSmlk=",
                    quantity:1,
                    price: 15
                },
                {
                    id: "9000",
                    name: "Beer",
                    imageUrl: "https://media.istockphoto.com/photos/diverse-keto-dishes-picture-id1280158821?b=1&k=20&m=1280158821&s=170667a&w=0&h=ibwKxBzWcygq6NMKO5FTD-3ljLvwM8E1WVevw7XSmlk=",
                    quantity:1,
                    price: 23
                }
            ]
        }
    ]
    const onAddToCartFn = (item) => {
        if (!isFoundInCart(item)) {
            dispatch(saveCartItemsFn([...cartItemsArr, item]))
        }
    }
    const onRemoveFromCartFn = (item) => {
        cartItemsArr.some((element, index) => {
            if (element.id == item.id) {
                let arr = [...cartItemsArr]
                arr.splice(index, 1)
                dispatch(saveCartItemsFn(arr))
            };
        })
    }

    const onUpdateCartFn = (item, quantity) => {
        cartItemsArr.some((element, index) => {
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

    const isFoundInCart = (item) => cartItemsArr.some(element => {
        if (element.id == item.id) return true;
    })

    return (
        <>
            <div className="app-top-banner">
                <Navbar />
                <h2 className="app-title">{serviceProvider.name}</h2>
                <p className="app-slogan">{serviceProvider.address}</p>
            </div>
            <div className="app-low-banner">
                <div className="app-restaurant-image">
                    <img
                        src={serviceProvider.defaultPic?.url}
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