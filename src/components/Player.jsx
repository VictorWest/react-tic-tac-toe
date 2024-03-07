import React, { useState } from 'react'

export default function Player({name, symbol, isActive, onPlayerChange}) {

  const [ isEditing, setIsEditing ] = useState(false)
  const [ playerName, setPlayerName ] = useState(name)

  const handleClick = () => {
    setIsEditing(prevVal => !prevVal)
    if(isEditing){
        onPlayerChange(symbol, playerName)
    }
  }
  const handleChange = (e) => {
    setPlayerName(e.target.value)
  }

  return (
    <li className={isActive ? 'active' : undefined}>
        <span className="player">
            {isEditing 
                ? <input type='text' value={playerName} required onChange={handleChange}/> 
                : <span onClick={handleClick} className="player-name">{playerName}</span>
            }
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  )
}
