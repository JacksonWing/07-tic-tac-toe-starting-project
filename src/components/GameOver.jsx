export default function GameOver({winner, onRematch}) { // Returns a gameover screen when winner/draw has been determined
    return(
    <div id="game-over">
        <h2>Game Over!</h2>
        {winner && <p>{winner} won the Game!</p>}
        {!winner && <p>DRAW!</p>}
        <p>
          <button onClick={onRematch}>Rematch?</button>
        </p>
    </div>
    );
}