import React, { useState,useEffect } from 'react';
import Timer from '../Timer/timer';
import Score from '../Score/score';
import { useRouter } from 'next/router';


function Game() {

  const initialvalue = {
    isGameOver: false,
    scoreList: [],
    finalscore: 0
  };

  const router = useRouter();
  const {name,level} = router.query
  const [game, setGame] = useState(initialvalue);
  const [finalScore, setFinalScore] = useState(0);
  const [resetScore, setResetScore] = useState(false);
  const [highScore, SetHighScore] = useState(0);
  const [arrayofWords,setWords]=useState({});
  let gameControl;
  let highScoreIndex = game.scoreList.indexOf(highScore);

  const getScoreList = () => {
    if (game.scoreList.length === 0) {
      return;
    }
    const scoresList = game.scoreList.map((score, i) => (
      <div key={i}>
        <p className="high-score-text">
          {highScoreIndex === i ? 'Personal Best' : null}
        </p>
        <p className="text-white">{`Game ${i + 1}: ${formatTime(
          score
        )}`}</p>
        <style jsx>{`
          .high-score-text{
            color: #ff5155;
            font-size: 20px;
            padding-left: 10px;
            margin-bottom: 5px;
          }
        `}</style>
      </div>
    ));
    return scoresList;
  }

  const newHighScore =
    game.finalscore === highScore ? (
      <h3 className="text-white">New High Score!</h3>
    ) : null;

  const onGameover = () => {
    setGame({ ...game, isGameOver: true, scoreList: [...game.scoreList, finalScore], finalscore: finalScore });
    if (finalScore > highScore) {
      SetHighScore(finalScore)
    }
  }

  const clearState = () => {
    setGame({ ...initialvalue, scoreList: game.scoreList });
    setResetScore(true);
  };

  const formatTime = (time) => {
    time = parseInt(time);
    const minutes = Math.floor(time / 60);

    let seconds = time % 60;

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  }

  if (!game.isGameOver) {
    gameControl = (
      <Timer formatTime={formatTime} onGameover={onGameover} arrayofWords={arrayofWords} setWords={setWords}/>
    );
  }

  else {
    gameControl = (
      <div className="text-center text-white">
        <h1>GAME OVER!</h1>
        <br></br>
        <h1>Your Score</h1>
        <br></br>
        <h1>{formatTime(game.finalscore)}</h1>
        <br></br>
        {newHighScore}
        <br></br>
        <button className="btn-play-again" onClick={() => clearState()}>
          <img className="icon-play-again" src="/reload.png" alt="Reload" width="40" height="40" />
          PLAY AGAIN
</button>
        <style jsx>{`
 .btn-play-again {
  border: none;
  background-color: transparent;
  font-size: 1.5rem;
  color: #ff5155;
 }

 .icon-play-again{
   max-width: 2.2em;
   max-height: 2.2em;
   margin-right:20px;
   padding-bottom: 10px;
 }
`}</style>
      </div>
    )
  }

  useEffect(()=>{
    if(!(name || level)){
      router.push('/components/Login')
    }
  },[name,level])

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-sm-9">
          <h3 className="text text-heading">
            <img className="icon-player" src="/person.png" alt="Player" width="40" height="40" />
            {name}</h3>
          <br />
          <h3 className="text text-heading">
            <img className="icon-player" src="/gamepad.png" alt="GamePad" width="40" height="40" />
            LEVEL: {level}</h3>
        </div>
        <div className="col-sm-3">
          <h3 className="text text-heading">fast fingers</h3>
          <Score formatTime={formatTime} isGameOver={game.isGameOver} setFinalScore={setFinalScore} reset={resetScore} setReset={setResetScore} />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-3 mb-3">
          <div className="text-center">
            <div className="scores-box">
              <div className="mt-2">
                <h5 className="text mb-2">SCORE BOARD</h5>
                <hr />
                {getScoreList()}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">{gameControl}</div>
      </div>
      <div className="row">
          <div className="col-md-3">
            <div className="start-game-element">
              <button className="btn-quit-game" onClick={()=>router.back()}>
              <img className="icon-play" src="/cross.png" alt="Cross" width="60" height="60" />
                STOP GAME
              </button>
            </div>
          </div>
        </div>
      <style jsx>{`
       .text-heading {
        padding-top: 20px;
        padding-left: 20px;
    }
    .icon-player {
      max-width: 2rem;
      max-height: 2rem;
  }
  .scores-box{
    min-height: 50px;
    width: 80%;
    border: 3px solid #ff5155;
    border-radius: 10px;
    margin: auto;
  }
  
  .icon-player {
    max-width: 2rem;
    max-height: 2rem;
    margin-right: 20px;
    padding-bottom: 10px;
  }

  .icon-play-again {
    max-width: 2.2rem;
    max-height: 2.2rem;
    margin-right: 20px;
    padding-bottom: 10px;
  }
  
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
    </React.Fragment>
  );
}

export default Game;