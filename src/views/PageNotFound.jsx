import React from 'react';
import {useHistory} from 'react-router-dom';

const PageNotFound = () => {
    const history = useHistory();
    return (
        <div className="not-found-container">
            <h1>404 | Page not found 
                <span>Page you're looking was not found</span>
                <small onClick={() => history.push('/')}>
                    <p>{"Go to home"}</p> 
                </small>
            </h1>
        </div>
    )
}
export default PageNotFound;