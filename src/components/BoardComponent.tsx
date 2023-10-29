import React, { useEffect, useState } from 'react'
import { Board } from '../models/Board'
import CellComponent from './CellComponent';
import { Cell } from '../models/Cell';
import { Player } from '../models/Player';
import { Colors } from '../models/Colors';

interface BoardProps{
  board:Board;
  setBoard:(board:Board)=> void;
  currentPlayer:Player | null;
  swapPlayer:()=> void;
}

const BoardComponent:React.FC<BoardProps> =({board, setBoard, currentPlayer, swapPlayer})=> {
 
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
  const [b] =[setBoard]
 /*  const a =setSelectedCell */
  console.log(b)
  function click(cell:Cell){
    /* if(cell.figure)setSelectedCell(cell) */
    if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)){
      selectedCell.moveFigure(cell)
      swapPlayer()
      setSelectedCell(null)
    }
    else{
      if(cell.figure?.color === currentPlayer?.color){
        setSelectedCell(cell)
      }
      
    }
  }
  useEffect(()=>{
    hightLightCells()
  }, [selectedCell])
  function hightLightCells(){
      board.hightLightCells(selectedCell)
      upDateBoard()
  }
  function upDateBoard(){
      const newBoard = board.getCopyBoard()
      setBoard(newBoard)
  }
  return (
    <div>
    <h3>Текущий игрок {currentPlayer?.color}</h3>
    <div className={['board', currentPlayer?.color === Colors.BLACK ? 'rotate_board': ''].join(' ')}> 
      {board.cells.map((row,index)=> 
      <React.Fragment key={index}>
            {row.map((cell) => <CellComponent click={click} key={cell.id} cell={cell} currentPlayer={currentPlayer} selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y && !!cell.figure}/>)}
      </React.Fragment>  
      )}
    </div>
    </div>
    
  )
}

export default BoardComponent