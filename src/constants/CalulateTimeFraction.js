const TOTAL_ARC_LENGTH =  283;

const calculateTimeFraction = (time,timeForWord) => {
    const ARC_LENGTH_PER_ONE_MINIUTE = TOTAL_ARC_LENGTH / timeForWord;
    return Math.round(time * ARC_LENGTH_PER_ONE_MINIUTE);
};

export default calculateTimeFraction;