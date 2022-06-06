import React, { useRef, useState,useEffect } from "react";
import "./accordion.css";
import {FaAngleDown,FaAngleUp} from "react-icons/fa"

export default function accordion(props) {
  const [active, setActive] = useState(false);
  const content = useRef(null);
  const [height, setHeight] = useState("0px");
  useEffect(()=>{
    console.table(props.content)
  },[])
  function toggleAccordion() {
    setActive(!active);
    setHeight(active ? "0px" : `${content.current.scrollHeight}px`);
  }

  return (
    <div className="accordion__section">
      <div
        className={`accordion ${active ? "active" : ""}`}
        onClick={toggleAccordion}
      >
        <h1 className={`accordion__title ${active ? "active_title" : ""}`}>{props.title}</h1>
        <span style={{ marginLeft: "20px" }}>{active ? " " : " "}</span>
        {
          active ? 
            <FaAngleUp 
            className="accordion__icon"
          />
          :

          <FaAngleDown 
            className="accordion__icon"
          />
        }
      </div>
      <div
        ref={content}
        style={{ maxHeight: `${height}` }}
        className="accordion__content"
      >
        {
          props?.content?.map(item=>(
            <div className="menu-item" key={item.id}>
              <img src={item.imageUrl} className="accordion-image" />
              <div className="menu-item__desc">
                <h3 className="menu-item__name">{item.name}</h3>
                <p className="menu-item__price">{item.price} RWF</p>
              </div>
              {
                props.isFoundInCart(item) ? 
                  <button className="remove-from-cart-btn" onClick={() => props.onRemoveFromCart(item)}>Remove</button>              
                :
                  <button className="add-to-cart-btn" onClick={() => props.onAddToCart(item)}>Add</button>
              }
            </div>
          ))
        }
      </div>
      <hr />
    </div>
  );
}
