import React from 'react';
import { FaStar, FaRegStarHalfStroke, FaRegStar } from "react-icons/fa6";

const RatingsStar = ({ rating = 0 }) => {
    // if(rating === 0){
    //     return;
    // }
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            stars.push(<FaStar key={i} />);
        } else if (rating >= i - 0.5) {
            stars.push(<FaRegStarHalfStroke key={i} />);
        } else {
            stars.push(<FaRegStar key={i} />);
        }
    }

    return (
        <div className="add_review">
            <ul className="stars_list">
                {stars.map((star, index) => (
                    <li key={index}>{star}</li>
                ))}
            </ul>
            <span>{rating}</span>
        </div>
    );
};

export default RatingsStar;
