 
 
import { useEffect, useState } from 'react'
import './App.css'
import BoardComponent from './components/BoardComponent'
import { Board } from './models/Board'
import { Player } from './models/Player'
import { Colors } from './models/Colors'
import LostFigure from './components/LostFigure'
import Timer from './components/Timer'

function App() {
   const [board, setBoard] = useState(new Board())
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
    useEffect(()=>{
      setCurrentPlayer(whitePlayer)
      restart()
    }, [])

   function restart(){
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
   }
   function swapPlayer(){
      setCurrentPlayer(currentPlayer?.color === Colors.BLACK ? whitePlayer : blackPlayer )
   }
  return (
    <div className='app'>
    <Timer currentPlayer={currentPlayer} restart={restart}/>
    <BoardComponent board={board} setBoard={setBoard} currentPlayer={currentPlayer} swapPlayer={swapPlayer}/>
    <div className='lost_check'>
      <LostFigure title="Черные фигуры" figures={board.lostBlackFigure}/>
      <LostFigure title="Белые фигуры" figures={board.lostWhiteFigure}/>
    </div>
    </div> 
  )
}

export default App
