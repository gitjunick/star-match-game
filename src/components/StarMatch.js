import React from "react";
import { utils } from "../utils/utils";

const StarMatch = () => {
    const stars = 6;
    const buttons = 9;

    return (
        <div className="game">
        <div className="help">
            Pick 1 or more numbers that sum to the number of stars
        </div>
        <div className="body">
            <div className="left">
                {utils.range(1, stars).map(starId => {
                    return <div key={starId} className="star" />
                })}
            </div>
            <div className="right">
                {utils.range(1, buttons).map(number => {
                    return <button key={number} className="number">{number}</button>
                })}
            </div>
        </div>
        <div className="timer">Time Remaining: 10</div>
        </div>
    );
};

export default StarMatch;