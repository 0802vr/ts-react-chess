import React, { FC, useState, useRef, useEffect } from 'react'
import { Player } from '../models/Player'
import { Colors } from '../models/Colors';
interface TimerProps {
    currentPlayer: Player |null;
    restart:()=> void
}
const Timer:FC<TimerProps> =({currentPlayer, restart}) =>{
    const [blackTime, setBlackTime] = useState(300)
    const [whiteTime, setWhiteTime] = useState(300)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)
    useEffect(() => {
        startTimer()
      }, [currentPlayer])
      function startTimer() {
         if (timer.current) {
          clearInterval(timer.current)
        } 
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000) 
        console.log(timer)
      }
    
      function decrementBlackTimer() {
        setBlackTime(prev => prev - 1)
      }
      function decrementWhiteTimer() {
        setWhiteTime(prev => prev - 1)
      }
    
      const restartBtn = () => {
        setWhiteTime(300)
        setBlackTime(300)
        restart()
      }
  return (
    <div>
        <div>
            <button onClick={restartBtn}>
                restart game
            </button>
        </div>
       <h3>time black ={blackTime}</h3>
       <h3>time white ={whiteTime}</h3>
       
       </div>
  )
}

export default Timer