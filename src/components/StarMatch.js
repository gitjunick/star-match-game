import {React, useState} from "react";
import { utils } from "../utils/utils";
import PlayNumber from "./PlayNumber";
import StarsDisplay from "./StarsDisplay";

const StarMatch = () => {
    const [stars, setStars] = useState(utils.random(1, 9));
    const buttons = 9;

    return (
        <div className="game">
        <div className="help">
            Pick 1 or more numbers that sum to the number of stars
        </div>
        <div className="body">
            <div className="left">
                <StarsDisplay count={stars}/>
            </div>
            <div className="right">
                {utils.range(1, buttons).map(number => {
                    return <PlayNumber key={number} number={number} />
                })}
            </div>
        </div>
        <div className="timer">Time Remaining: 10</div>
        </div>
    );
};

export default StarMatch;