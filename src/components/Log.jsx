import React from 'react'

export default function Log({turns}) {

  return (
    <ol id="log">
        {turns.map(({row, col, player}) => {
            return <li key={`${row}${col}`}>Player {player} has played. Row {row + 1}, Column {col + 1}</li>
        })}
    </ol>
  )
}
