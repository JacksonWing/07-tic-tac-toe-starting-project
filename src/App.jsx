import { useState } from 'react';

import GameBoard from './components/GameBoard.jsx';
import Player from './components/Player.jsx';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const INITIAL_GAME_BOARD = [
  [ null, null, null ],
  [ null, null, null ],
  [ null, null, null ],
];

function deriveActivePlayer(gameTurns) { // Checks the gameTurns state to determine who the active player is, and returns the current player
  let currentPlayer = 'X';

        if( gameTurns.length > 0 && gameTurns[0].player === 'X'){
          currentPlayer = 'O';
        }
        
        return currentPlayer;
}

function deriveGameBoard(gameTurns){ // Gets the row and column of the selected square and setting the value to the active player symbol
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

    for (const turn of gameTurns){
        const { square, player } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player; 
    }

    return gameBoard;
}

function deriveWinner(gameBoard, players){ // Compares the current gameboard to the eight winning combinations to determine if there is a winner

  let winner = null;

    for( const combination of WINNING_COMBINATIONS ) {
      const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

      if (firstSquareSymbol && 
          firstSquareSymbol === secondSquareSymbol && 
          firstSquareSymbol === thirdSquareSymbol
          ){
            winner = players[firstSquareSymbol];
          }
    }
    return winner;
}

function App() {
  const [ players, setPlayers ] = useState(PLAYERS); // State is used to change player name
  const [ gameTurns, setGameTurns ] = useState([]);  // State is used to update the current player and gameboard
  

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare( rowIndex, colIndex ){ // Invokes the function whenever a unselected square on the gameboard is chosen. 
    
    setGameTurns((prevTurns) => {
        
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer},
        ...prevTurns
        ];

        return updatedTurns;
    });
  }

  function handleRematch(){ // Resets the gameboard
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){ // Gets the new name and passes it as a property to the player component
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player onChangeName={handlePlayerNameChange} initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'}/>
          <Player onChangeName={handlePlayerNameChange} initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRematch={handleRematch}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App
