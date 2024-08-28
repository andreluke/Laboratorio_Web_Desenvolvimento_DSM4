import React from "react";
import Board from "./Board";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Jogo da Velha</h1>
      <Board />
      <Refresh/>
    </div>
  );
}
export default App;

function Refresh(){

  return(
    <div>
      <button className="botao-daora" onClick={() => window.location.reload()}>
        Try again!
      </button>
    </div>
  )
}

