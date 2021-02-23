import React from 'react';
import formatTime from 'src/constants/formatTime'


function ScoreList({ scorelist,highScore }) {
    const highScoreIndex = scorelist.indexOf(highScore);
    const scoresList = scorelist.map((score, i) => (
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

export default ScoreList;
