import React, { useEffect, useState } from "react";
import "../styles/search.css"
import LoadingSvg from "../assets/loading.svg"

const LoadingComponent = () => {
    return (
        <>
            <div className="restaurants-loading-div">
                <img
                    src={LoadingSvg}
                    draggable={false}
                />
            </div>
        </>
    );
};

export default LoadingComponent;
