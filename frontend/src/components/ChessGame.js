import React, { useState } from "react";

function ChessGame({ setScore }) {

    const questions = [

        {
            piece: "♛",
            answer: "Queen"
        },

        {
            piece: "♞",
            answer: "Knight"
        },

        {
            piece: "♜",
            answer: "Rook"
        }

    ];

    const [current, setCurrent] = useState(0);

    const [score, setLocalScore] = useState(0);

    const handleAnswer = (choice) => {

        if (choice === questions[current].answer) {

            setLocalScore(score + 1);

        }

        if (current + 1 < questions.length) {

            setCurrent(current + 1);

        } else {

            setScore(score + 1);

            alert("Game Complete");

        }

    };

    return (

        <div>

            <h2>
                Identify the Chess Piece
            </h2>

            <h1>
                {questions[current].piece}
            </h1>

            <button onClick={() => handleAnswer("Queen")}>
                Queen
            </button>

            <button onClick={() => handleAnswer("Knight")}>
                Knight
            </button>

            <button onClick={() => handleAnswer("Rook")}>
                Rook
            </button>

        </div>

    );

}

export default ChessGame;