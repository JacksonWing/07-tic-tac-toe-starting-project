import {useState} from 'react';

export default function Player({ initialName, symbol, isActive, onChangeName }) {
    const theName = initialName

    let [ isEdit, setIsEdit ] = useState( false );
    let [ isName, setIsName ] = useState( theName );

    function handleClick() {
        setIsEdit((editState) => !editState);
        if (isEdit){
          onChangeName(symbol, isName)
        }
    }

    function nameChange(event) {
        setIsName(event.target.value);
    }

    let playerEdit = <span className="player-name">{isName}</span>;

    if (isEdit) {
        playerEdit = (
            <input type="text" required value={isName} onChange={nameChange} />
        );
    }

    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
              { playerEdit }
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleClick}>{ isEdit ? 'Save' : 'Edit' }</button>
        </li>  
    );
}