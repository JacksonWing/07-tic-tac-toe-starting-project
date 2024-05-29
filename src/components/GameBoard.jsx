export default function GameBoard( { onSelectSquare, board } ) {
  
    // const [ gameBoard, setGameBoard ] = useState(initialGameBoard);

    // function selectSquare(rowIndex, colIndex){
    //     setGameBoard((prevGameBoard) => {
    //         const updateGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         updateGameBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updateGameBoard;
    //     });
    //     selectedSquare();
    // }
    
    return (
        <ol id="game-board">
          {board.map((row, rowIndex) => (
            <li key={rowIndex}>
             <ol>
                {row.map((playerSymbol, colIndex) => (
                <li key={colIndex}>
                    <button onClick={() => onSelectSquare( rowIndex, colIndex )}
                    disabled={playerSymbol !== null}>
                        {playerSymbol}
                        </button>
                </li>
                ))}
            </ol>
          </li>))}
        </ol>
    );
}