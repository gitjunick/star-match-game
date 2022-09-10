import {React, useState} from "react";
import { utils } from "../utils/utils";
import PlayNumber from "./PlayNumber";
import StarsDisplay from "./StarsDisplay";

const StarMatch = () => {
    const [stars, setStars] = useState(utils.random(1, 9));
    const buttons = 9;

    const [availableNumbs, setAvailableNums] = useState(utils.range(1, buttons));
    const [candidateNums, setCandidateNums] = useState([]);

    const candidatesAreWrong = utils.sum(candidateNums) > stars;

    const numberStatus = (number) => {
        if (!availableNumbs.includes(number)) {
            return 'used';
        }

        if (candidateNums.includes(number)) {
            return candidatesAreWrong ? 'wrong' : 'candidate';
        }

        return 'available';
    };

    const onNumberClick = (number, currentStatus) => {
        // currentStatus => newStatus
        if (currentStatus === 'used') {
            return;
        }

        // candidateNums
        const newCandidateNums = 
            currentStatus === 'available'
                ? candidateNums.concat(number)
                : candidateNums.filter(cn => cn !== number);
        
        if (utils.sum(newCandidateNums) !== stars) {
            setCandidateNums(newCandidateNums);
        }
        else {
            const newAvailableNums = availableNumbs.filter(
                n => !newCandidateNums.includes(n)
            );
            // redraw stars (from what's available)
            setStars(utils.randomSumIn(newAvailableNums, buttons));

            setAvailableNums(newAvailableNums);
            setCandidateNums([]);
        }

    }

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
                    return <PlayNumber 
                                key={number} 
                                status={numberStatus(number)}
                                number={number} 
                                onClick={onNumberClick}
                            />
                })}
            </div>
        </div>
        <div className="timer">Time Remaining: 10</div>
        </div>
    );
};

export default StarMatch;