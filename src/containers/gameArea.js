import React,{useState,useEffect} from 'react';
import Timer from 'src/containers/timerUserInuput';
import ScoreList from 'src/components/scoreList';
import GameOver from 'src/components/gameOver';
import { postScore } from 'service/userApi';
import { mutate } from 'swr';
import {useScore} from 'data/useUser';


function GameArea({isGameOver,finalScore,onGameover,clearState}){
    const [highScore, SetHighScore] = useState(0);
    const [scorelist,setScoreList] = useState([]);
    const { scores } =  useScore(); 

    useEffect(async() => {
        if(finalScore) {
          await postScore('/fastfinger/postScore',finalScore);
          mutate('/fastfinger/scorelist')
        }
        if (finalScore > highScore) {
            SetHighScore(finalScore)
          }
    }, [isGameOver])

    if (scores==='undefined') return "Loading...";

    return(
        <>
        <div className="row mt-5">
        <div className="col-md-3 mb-3">
          <div className="text-center">
            <div className="scores-box">
              <div className="mt-2">
                <h5 className="text mb-2">SCORE BOARD</h5>
                <hr />
                {<ScoreList scorelist={scores ? scores : []} highScore={highScore} />}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">{isGameOver ? <GameOver finalScore={finalScore} highScore={highScore} clearState={clearState} /> : <Timer onGameover={onGameover} />}</div>
      </div>
      <style jsx>{`
  .scores-box{
    min-height: 50px;
    width: 80%;
    border: 3px solid #ff5155;
    border-radius: 10px;
    margin: auto;
  }`}</style>
      </>
    )
}

export default GameArea;