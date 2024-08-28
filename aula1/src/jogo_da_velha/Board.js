import React, { useState } from "react";
import Square from "./Square";

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    const newSquares = squares.slice();
    
    if (newSquares[index] || calculateWinner(squares)) return;

    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const renderSquare = (index) => {
    return <Square value={squares[index]} onClick={() => handleClick(index)} />;
  };

  const winner = calculateWinner(squares);
  const boardFull = isBoardFull(squares);
  let status;

  if (winner) {
    status = `Vencedor: ${winner}`;
  } else if (boardFull) {
    status = "Empate!";
  } else {
    status = `Próximo jogador: ${isXNext ? "X" : "O"}`;
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  
  return null;
}

function isBoardFull(squares) {
  return squares.every(square => square !== null);
}

export default Board;
