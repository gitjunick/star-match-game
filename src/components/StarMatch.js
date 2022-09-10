import {React, useEffect, useState} from "react";
import { utils } from "../utils/utils";
import PlayNumber from "./PlayNumber";
import StarsDisplay from "./StarsDisplay";
import PlayAgain from "./PlayAgain";

const StarMatch = () => {
    const buttons = 9;

    const [stars, setStars] = useState(utils.random(1, buttons));
    const [availableNumbs, setAvailableNums] = useState(utils.range(1, buttons));
    const [candidateNums, setCandidateNums] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(10);

    // setInterval, setTimeout
    useEffect(() => {
        if (secondsLeft > 0) {
            const timerId = setTimeout(() => {
                setSecondsLeft(prevSecondsLeft => prevSecondsLeft - 1);
            }, 1000);

            return () => clearTimeout(timerId);
        }
    });

    const candidatesAreWrong = utils.sum(candidateNums) > stars;
    const gameIsDone = availableNumbs.length === 0;

    const resetGame = () => {
        setStars(utils.random(1, buttons));
        setAvailableNums(utils.range(1, buttons));
        setCandidateNums([]);
    }

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
                {
                    gameIsDone 
                        ? (<PlayAgain onClick={resetGame}/> )
                        : (<StarsDisplay count={stars}/>)
                }
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
        <div className="timer">Time Remaining: {secondsLeft}</div>
        </div>
    );
};

export default StarMatch;