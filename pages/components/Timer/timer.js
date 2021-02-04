import React, { useState, useEffect, useRef } from 'react';
import UserInput from '../UserInput/userInput';
import styles from '../../../styles/Timer.module.css';


function Timer(props) {
    const [time, setTime] = useState(20);
    const timerRef = useRef();
    const [timeForWord,settimeword] = useState(time);
    let timers=null

    const calculateTimeFraction = () => {
        const rawTimeFraction = time / timeForWord;
        return rawTimeFraction - (1 / timeForWord) * (1 - rawTimeFraction);
    };

    const setCircleDasharray = () => {
        if (timerRef && timerRef.current) {

            const circleDasharray = `${(calculateTimeFraction() * 283).toFixed(
                0
            )} 283`;
            timerRef.current.setAttribute('stroke-dasharray', circleDasharray);
        }
    };
    useEffect(() => {
        if (time > 0) {
            var timers = setInterval(() => {
                setTime(time - 1);
                setCircleDasharray();
            }, 1000);
        }
        else {
            setCircleDasharray();
            setTimeout(()=>{
               props.onGameover();
            },1000)
        }
        return () => clearInterval(timers);
    });
    return (
        <React.Fragment>
        <div className={styles.basetimer}>
            <svg className={styles.basetimer__svg} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g className={styles.basetimer__circle}>
                    <circle className={styles.basetimer__pathelapsed} cx="50" cy="50" r="45" />
                    <path
                        ref={timerRef}
                        id="base-timer-path-remaining"
                        strokeDasharray="283"
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
                {props.formatTime(time)}
            </span>
        </div>
        <br/>
        <UserInput settimeword = {settimeword} setTime = {setTime} arrayofWords = {props.arrayofWords} setWords = {props.setWords}/>
        </React.Fragment>
    );
}

export default Timer;