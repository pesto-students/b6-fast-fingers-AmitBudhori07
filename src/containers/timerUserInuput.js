import React, { useState, useEffect } from 'react';
import UserInput from 'src/containers/userInput';
import TimerCircle from 'src/components/timerCircle';

function Timer(props) {
    const [time, setTime] = useState(1);
    const [timeForWord, setTimeForword] = useState(time);
    let timerId;
    
    useEffect(() => {
        if (time >= 0) {
            timerId = setInterval(() => {
                setTime(time - 1);
            }, 1000);
        }
        else {
            props.onGameover()
        }
        return () => clearInterval(timerId);
    }, [time]);

    return (
        <React.Fragment>
            <TimerCircle time={time} timeForWord={timeForWord} />
            <br />
            <UserInput setTimeForword={setTimeForword} setTime={setTime} />
        </React.Fragment>
    );
}

export default Timer;