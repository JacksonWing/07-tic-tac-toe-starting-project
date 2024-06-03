export default function Log({turns}) { // Records and displays the turn history based on the index of the gameboard and which player's turn it is
    return(
        <ol id="log">
            {turns.map((turn) => (<li key={`${turn.square.row}, ${turn.square.col}`}>
                {turn.player} selected {turn.square.row}, {turn.square.col}
            </li>))}
        </ol>
    );
}