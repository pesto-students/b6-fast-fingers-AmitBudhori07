import React, { useState, useEffect } from 'react';
import formatTime from 'src/constants/formatTime'

function Score({isGameOver,setFinalScore}) {
  const [score, setscore] = useState(0);

  useEffect(() => {
    if (!isGameOver) {
      var timers = setInterval(() => {
        setscore(score + 1);
      }, 1000);
      setFinalScore(score-1); 
    }
    else{
      setscore(0)
    }
    return () => clearInterval(timers);
  },[score,isGameOver]);

 
  return (
    <h3 className="text">SCORE:{formatTime(score)}</h3>
  );
}

export default Score;