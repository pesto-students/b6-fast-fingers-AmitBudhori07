import React from 'react';
import formatTime from 'src/constants/formatTime'

function GameOver({ finalScore, highScore, clearState }) {
    let headerElement = ["GAME OVER!","Your Score", formatTime(finalScore)]
    return (
        <div className="text-center text-white">
            {headerElement.map((headers,Iindex)=>(
                <h1 key={Iindex}>{headers}</h1>
            ))}
            {finalScore === highScore ? (
                <h3 className="text-white">New High Score!</h3>
            ) : null}
            <button className="btn-play-again" onClick={() => clearState()}>
                <img className="icon-play-again" src="/reload.png" alt="Reload" width="40" height="40" />
      PLAY AGAIN
</button>
            <style jsx>{`
            h1,h3{
                margin-top:20px
            }

.btn-play-again {
border: none;
background-color: transparent;
font-size: 1.5rem;
color: #ff5155;
margin:2rem
}

.icon-play-again{
    max-width: 4rem;
    max-height: 4rem;
    margin-right: 10px;
    padding-bottom: 10px;
}
`}</style>
        </div>
    )
}

export default GameOver;