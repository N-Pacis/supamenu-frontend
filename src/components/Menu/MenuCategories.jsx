import React from "react";
import Accordion from "../Accordion/accordion"
const MenuCategories = ({categories,onAddToCart,isFoundInCart,onRemoveFromCart  }) => {
    return (
        <>
            {categories.map(category => (
                <Accordion
                    key={category.id}
                    title={category.name}
                    content={category.menu}
                    onAddToCart={onAddToCart}
                    onRemoveFromCart={onRemoveFromCart}
                    isFoundInCart={isFoundInCart}
                />
            ))}
        </>
    );
};

export default MenuCategories