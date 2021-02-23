import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import GameHeader from 'src/components/gameHeader';
import GameArea from 'src/containers/gameArea';

function Game() {

  const router = useRouter();
  const { name, level } = router.query;
  const [isGameOver,setIsGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const onGameover = () => {
    setIsGameOver(true);
  }

  const clearState = () => {
    setIsGameOver(false);
    setFinalScore(false);
  };

  useEffect(() => {
    debugger;
    if (!(name || level)) {
      router.push('/')
    }
  }, [name, level])

  return (
    <>
     <GameHeader isGameOver={isGameOver} setFinalScore={setFinalScore}/>
     <GameArea isGameOver={isGameOver} finalScore={finalScore} onGameover={onGameover} clearState={clearState}/>
      <div className="row">
        <div className="col-md-3">
          <div className="start-game-element">
            <Link href="/">
              <button className="btn-quit-game">
                <img className="icon-play" src="/cross.png" alt="Cross" width="60" height="60" />
                STOP GAME
              </button>
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{`
  
.icon-play {
  max-width: 4rem;
  max-height: 4rem;
  margin-right: 10px;
  padding-bottom: 10px;
}
  .start-game-element {
    margin: auto;
    text-align: center;
    align-content: center;
    object-position: center;
    vertical-align: middle;
  }
  .btn-quit-game {
    background-color: transparent;
    font-size: 1.5rem;
    border: none;
    outline: none;
    color: #ff5155;
  }
      `}</style>
    </>
  );
}

export default Game;