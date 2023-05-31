import React, { useState, useEffect, useRef } from "react";

export default function SpeedSum() {
    const [seconds, setSeconds] = useState(30);
    const [isNewGame, setIsNewGame] = useState(false);
    const [aNum, setANum] = useState(0);
    const [bNum, setBNum] = useState(0);
    const [operator, setOperator] = useState("");
    const [answer, setAnswer] = useState("");
    const [score, setScore] = useState(0);
    console.log(score)

    const timerRef = useRef(null);

    const operations = ['+', '-', '*', '/'];

    useEffect(() => {
        generateNumbers();
        generateOperator();
    }, []);

    useEffect(() => {
        if (seconds !== 0) {
            timerRef.current = setInterval(() => {
                setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
            }, 1000);
        } else {
            clearInterval(timerRef.current);
            setIsNewGame(true);
        }

        return () => clearInterval(timerRef.current);
    }, [seconds]);

    const handleChange = (event) => {
        setAnswer(event.target.value);
    };

    useEffect(() => {
        const calculatedAnswer = calculateAnswer();
        if (answer === calculatedAnswer.toString()) {
            setScore((prevScore) => prevScore + 1);
            
            generateNumbers();
            generateOperator();
            setAnswer("");
        }
    }, [answer]);

    const generateNumbers = () => {
        const randomNum1 = Math.floor(Math.random() * 10) + 1;
        const randomNum2 = Math.floor(Math.random() * 10) + 1;
        setANum(randomNum1);
        setBNum(randomNum2);
    };

    const generateOperator = () => {
        const randomOperator = operations[Math.floor(Math.random() * operations.length)];
        setOperator(randomOperator);
    };

    const calculateAnswer = () => {
        switch (operator) {
            case "+":
                return aNum + bNum;
            case "-":
                return aNum - bNum;
            case "*":
                return aNum * bNum;
            case "/":
                if (aNum / bNum === 0) {
                    return aNum / bNum;
                }
                else{

                }
            default:
                return "";
        }
    };

    function startNewGame() {
        setIsNewGame(false);
        setSeconds(30);
        setScore(0);
    }

    return (
        <div className="speedSumContainer">
            <p>30 seconds to as many sums as you can</p>
            <p>{seconds}</p>
            <p>
                {aNum} {operator} {bNum}
            </p>
            <input className="answerInput" type="text" value={answer} onChange={handleChange} />
            {isNewGame && (
                <div className="gameOverContainer">
                    <p>Game Over!</p>
                    <p>Score: {score}</p>
                    <button className="newGameButton" onClick={startNewGame}>New Game</button>
                </div>
            )}
        </div>
    );
}
