import React, { useEffect, useState } from "react";
import "../../styles/menu.css";
import { Link } from "react-router-dom"
import Select from "react-select";
import { useParams } from "react-router-dom";
import { fetchSeats, postOrder } from "../../actions/orderAction";
import { Button } from "react-alert-confirm";
import { useHistory } from "react-router-dom";
import { saveCartItemsFn, saveOrderInfoFn } from "../../actions/cartItemsAction";
import { connect } from "react-redux";

const CartItems = ({ 
    dispatch,
    cartItemsArr
}) => {
    let totalAmount = cartItemsArr.map(item => item.unitPrice * item.quantity).reduce((a, b) => a + b, 0);
    const [orderType, setOrderType] = useState('PICK_AND_GO')
    const { id } = useParams();
    const [seats, setSeats] = useState([]);
    const [chosenSeat, setChosenSeat] = useState();
    const [loading, setLoading] = useState(false)
    
    const history = useHistory();

    useEffect(()=>{
    },[cartItemsArr])

    const options = [
        {
            value: "PICK_AND_GO",
            label: "Pick and go"
        },
        {
            value: "SEAT",
            label: "Seat"
        },
        {
            value: "BOOKING",
            label: "Booking"
        }
    ]


    const selectHandler = (payload) => {
        if (payload.name == 'orderType') {
            setOrderType(payload.value);
        }
        else if (payload.name == 'seats') {
            setChosenSeat(payload.value)
        }
    };

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

    const onRemoveFromCartFn = (item) => {
        cartItemsArr?.some((element, index) => {
            if (element.id == item.id) {
                let arr = [...cartItemsArr]
                arr.splice(index, 1)
                dispatch(saveCartItemsFn(arr))
            };
        })
    }

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        let orderDetails = []
        cartItemsArr.map(item => {
            orderDetails.push({
                item: item.id,
                quantity: item.quantity
            })
        })

        let formData = {
            orderDetails,
            orderType,
            seat: chosenSeat,
            status: "ORDERING"
        }
        postOrder(formData)
            .then((res) => {
                setLoading(false)
                dispatch(saveOrderInfoFn(res.data.id))
                history.push("/checkout");
            })
            .catch((err) => {
                setLoading(false)
            });
    }

    useEffect(async () => {
        let seatsFromBackend = await fetchSeats(id);
        let seatsArr = []
        seatsFromBackend?.map(seat => {
            seatsArr.push({
                value: seat.id,
                label: seat.seatNumber
            })
        })
        setSeats(seatsArr)
    }, [])
    useEffect(() => {
        if (orderType != 'SEAT') {
            setChosenSeat(undefined)
        }
    }, [orderType])

    return (
        <>
            {cartItemsArr.map(item => (
                    <div key={item.id} className="cart-item">
                        <img src={item.imageUrl} className="cart-item-image" />
                        <div className="cart-item__desc">
                            <h3 className="cart-item__name">{item.name}</h3>
                            <p className="cart-item__price">{item.unitPrice} RWF</p>
                        </div>
                        <div className="cart-buttons">
                            <button className="cart-item__btn" onClick={() => onUpdateCartFn(item, item.quantity - 1)}>-</button>
                            <p className="cart-item__quantity">{item.quantity}</p>
                            <button className="cart-item__btn" onClick={() => onUpdateCartFn(item, item.quantity + 1)}>+</button>
                        </div>
                    </div>
            ))}
            {
                cartItemsArr.length > 0 && (
                    <>
                        <p className="total-amount">{totalAmount} RWF</p>
                        <form onSubmit={handleSubmit}>

                            <div className="order-types">
                                <label>Order Type</label>
                                <Select
                                    options={options}
                                    name="orderType"
                                    onChange={(payload) =>
                                        selectHandler({ ...payload, name: "orderType" })
                                    }
                                    className="mt-3 order-select"
                                    placeholder={
                                        <div className="select-placeholder-text">
                                            Select Order Type
                                        </div>
                                    }
                                />
                                {
                                    orderType == 'SEAT' && (
                                        <>
                                            <label>Seat</label>
                                            <Select
                                                options={seats}
                                                name="seat"
                                                onChange={(payload) =>
                                                    selectHandler({ ...payload, name: "seats" })
                                                }
                                                className="mt-3 order-select"
                                                placeholder={
                                                    <div className="select-placeholder-text">
                                                        Select Seat
                                                    </div>
                                                }
                                            />
                                        </>
                                    )
                                }
                            </div>
                            <Button disabled={loading} className="checkout-btn">{loading ? <span>Wait ...</span> : <span>Proceed</span>}</Button>
                        </form>
                    </>
                )

            }

        </>
    );
};

const mapStateToProps = (state) => ({
    cartItemsArr: state.cart.cartItems
});

export default connect(mapStateToProps)(CartItems);