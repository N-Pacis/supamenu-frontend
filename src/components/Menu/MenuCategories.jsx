import React from "react";
import Accordion from "../Accordion/accordion"
const MenuCategories = ({categories,onAddToCart,isFoundInCart,onRemoveFromCart  }) => {
    return (
        <>
            {categories.map(category => (
                <Accordion
                    key={category.category.id}
                    title={category.category.name}
                    content={category.items}
                    onAddToCart={onAddToCart}
                    onRemoveFromCart={onRemoveFromCart}
                    isFoundInCart={isFoundInCart}
                />
            ))}
        </>
    );
};

export default MenuCategories