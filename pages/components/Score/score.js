import React, { useState, useEffect } from 'react'

function Score(props) {
  const [score, setscore] = useState(0);

  useEffect(() => {
    if (!props.isGameOver) {
      var timers = setInterval(() => {
        setscore(score + 1);
      }, 1000);
      props.setFinalScore(score);
    }
    if(props.reset){
      debugger;
      setscore(0);
      props.setReset(false);
    }
    return () => clearInterval(timers);
  });

 
  return (
    <h3 className="text">SCORE:{props.formatTime(score)}</h3>
  );
}

export default Score;