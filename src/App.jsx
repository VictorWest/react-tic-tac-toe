import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log"
import GameOver from "./components/GameOver"
import {WINNING_COMBINATIONS} from './winning-combinations'

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]
function App() {
  const [player, setPlayer] = useState({
    'X': 'Player 1',
    'O': 'Player 2'
  })
  const [gameTurns, setGameTurns] = useState([])
  const [ activePlayer, setActivePlayer ] = useState("X")

  const handleSelect = (rowIndex, colIndex) => {
    setActivePlayer(prevVal => prevVal === 'X' ? 'O' : 'X')
    setGameTurns(prevVal => {
      let currentPlayer = 'X'
      if(prevVal.length > 0 && prevVal[0].player === 'X'){
        currentPlayer = 'O'
      }

      const updatedTurns = [{row: rowIndex, col: colIndex, player: currentPlayer}, ...prevVal] 
      return updatedTurns
    })
  }

  let gameBoard = [...initialGameBoard.map(item => [...item])]
  for(const turn of gameTurns){
      const {row, col, player} = turn
      gameBoard[row][col] = player
  }

  let winner 
  for (const combinations of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column]
    const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column]
    const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column]
    
    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = player[firstSquareSymbol]
    }
  }
  
  const hasDraw = gameTurns.length === 9 && !winner

  function handlePlayerNameChange(symbol, name){
    setPlayer(prevVal => {
      return {
        ...prevVal,
        [symbol]: name
      }
    })
  }
    return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
        <Player name="Player 1" symbol="X" isActive={activePlayer === 'X'} onPlayerChange={handlePlayerNameChange}/>
        <Player name="Player 2" symbol="O" isActive={activePlayer === 'O'}onPlayerChange={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) &&
          <GameOver winner={winner}/>
        }
        <GameBoard onSelect = {handleSelect} board = {gameBoard}/>
      </div>
      <Log turns = {gameTurns}/>
    </main>
  )
}

export default App
