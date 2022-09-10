import { useState, useEffect } from "react";
import { utils } from "../utils/utils";

function useGameState() {
    const buttons = 9;

    const [stars, setStars] = useState(utils.random(1, buttons));
    const [availableNumbs, setAvailableNums] = useState(utils.range(1, buttons));
    const [candidateNums, setCandidateNums] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(10);

    // setInterval, setTimeout
    useEffect(() => {
        if (secondsLeft > 0 && availableNumbs.length > 0) {
            const timerId = setTimeout(() => {
                setSecondsLeft(prevSecondsLeft => prevSecondsLeft - 1);
            }, 1000);

            return () => clearTimeout(timerId);
        }
    });


    const setGameState = (newCandidateNums) => {
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
    };

    return { buttons, stars, availableNumbs, candidateNums, secondsLeft, setGameState };
};

export default useGameState;