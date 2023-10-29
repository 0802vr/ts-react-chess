import React, { FC } from 'react'
import { Cell } from '../models/Cell'
import { Player } from '../models/Player';
import { Colors } from '../models/Colors';
interface CellProps {
    cell:Cell;
    selected:boolean;
    currentPlayer:Player | null;
    click: (cell:Cell)=> void
}
const CellComponent:FC<CellProps> =({cell, selected, click, currentPlayer}) => {
  return (
    <div className={['cell', cell.color, selected? "selected" : "", currentPlayer?.color === Colors.BLACK ? 'rotate_board': ''].join(' ')}
    onClick={()=> click(cell)}
    style={{background:cell.availble && cell.figure? "green" : ""}}
    >
      {cell.availble && !cell.figure && <div className={"available"}/>}
      {cell.figure?.logo && <img src={cell.figure.logo}/> }
    </div>
    
  )
}

export default CellComponent