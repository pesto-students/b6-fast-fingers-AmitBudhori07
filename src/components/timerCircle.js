import React from 'react';
import styles from 'styles/Timer.module.css';
import formatTime from 'src/constants/formatTime';
import calculateTimeFraction from 'src/constants/CalulateTimeFraction';
 

function TimerCircle({time,timeForWord}){
    return(
        <div className={styles.basetimer}>
            <svg className={styles.basetimer__svg} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g className={styles.basetimer__circle}>
                    <circle className={styles.basetimer__pathelapsed} cx="50" cy="50" r="45" />
                    <path
                        id="base-timer-path-remaining"
                        strokeDasharray={`${calculateTimeFraction(time,timeForWord)} 283`}
                        className={styles.base_timer_path_remaining}
                        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
                    ></path>
                </g>
            </svg>
            <span className={styles.base_timer__label}>
                {formatTime(time)}
            </span>
        </div>
    )
}

export default TimerCircle;