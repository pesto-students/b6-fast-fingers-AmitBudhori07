import React, { useEffect,useReducer } from 'react';
import styles from 'styles/Userinput.module.css';
import { useRouter } from 'next/router';
import getCurrentWord from 'src/components/words';
import { DifficultyFactor, setLevel, DIFFICULTY_FACTOR_INCREMENT } from 'src/constants/Difficulty';
import { GetNewWord, TimeForWord } from 'src/constants/getNewWords';


function UserInput({setTime,setTimeForword}) {
    const router = useRouter();
    const { name, level } = router.query;

    const [{difficulty,userText,currentWord},dispatch] =useReducer((state, newState) => ({...state, ...newState}), {
     difficulty:{level:level,factor:DifficultyFactor(level)},
     userText:'',
     currentWord:''
    });

    const setWord = (value) => {
        let userdata = value.toUpperCase()
        if (userdata === currentWord) {
            let difficultyFactor = difficulty.factor + DIFFICULTY_FACTOR_INCREMENT;
            let Level = setLevel(difficultyFactor);
            let newWord = GetNewWord(Level);
            dispatch({difficulty:{level:Level,factor:difficultyFactor},userText:"",currentWord:newWord})
            TimeForWord(newWord, setTimeForword, setTime, difficultyFactor);
        }
        else {
            dispatch({userText:value})
       }
    }

    useEffect(() => {
        router.push(`/Game?name=${name}&level=${difficulty.level}`, undefined, { shallow: true })
    }, [difficulty.level])

    useEffect(() => {
        let word = GetNewWord(difficulty.level);
        TimeForWord(word, setTimeForword, setTime, difficulty.factor);
        dispatch({currentWord:word});
   }, [])


    return (
        <div className={styles.text_align}>
            {getCurrentWord(currentWord, userText)}
            <br />
            <input className={styles.input_box} value={userText} onChange={({target:{value}}) => setWord(value)} autoFocus />
        </div>
    );
}

export default UserInput;