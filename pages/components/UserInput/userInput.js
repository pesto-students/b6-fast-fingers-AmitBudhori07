import React, { useEffect, useState, useRef } from 'react';
import styles from '../../../styles/UserInput.module.css';
import data from '../../../data/dictionary.json';
import {useRouter} from 'next/router';

function UserInput(props) {
    const router =useRouter();
    const {level} = router.query
    const [userText, SetUserText] = useState('');
    const [currentWord, setCurrentWord] = useState('')
    const [difficulty, setDifficulty] = useState({ level: level, factor: 1});

    const getWords = () => {
       let easyWords = [],mediumWords = [],hardWords = [];

       let difficultyfactor;
       if (difficulty.level === 'easy') {
           difficultyfactor = 1;
       } else if (difficulty.level === 'medium') {
           difficultyfactor = 1.5;
       } else {
           difficultyfactor = 2;
       }

       setDifficulty({ level: difficulty.level, factor: difficultyfactor });
       var words = props.arrayofWords;
       if(Object.keys(props.arrayofWords).length === 0){
        for (const word of data) {
            if (word.length <= 4) {
                easyWords.push(word)
            }
            else if (word.length <= 8) {
                mediumWords.push(word);
            }
            else{
                hardWords.push(word);
            }
        }
        words = { easy: easyWords, medium: mediumWords, hard: hardWords };
        props.setWords(words);
    }
       return getNewWord(words,difficultyfactor)

    }
  
    const getCurrentWord = () => {
        const wordCharacters = currentWord.split('');
        const userInputCharacters = userText.toUpperCase().split('');
        return (
            <div className={styles.new_word}>
                {wordCharacters.map((char, i) => {
                    let color;
                    if (i < userText.length) {
                        color = char === userInputCharacters[i] ? '#54ba18' : '#445298';
                    }
                    return (
                        <span key={i} style={{ color: color }}>
                            {char}
                        </span>
                    );
                })}
            </div>
        );
    };
    const getNewWord = ({easy,medium,hard},difficultyFactor) => {
        let word;
        if (difficultyFactor >= 1.5 && difficultyFactor < 2) {
            const random = Math.round(Math.random() * (medium.length - 1));
            word = medium[random].toUpperCase();
          }
         else if (difficultyFactor < 1.5) {
            const random = Math.round(Math.random() * (easy.length - 1));
            word = easy[random].toUpperCase();
          }
         else{
          const random = Math.round(Math.random() * (hard.length - 1));
          word = hard[random].toUpperCase();
         }
        
         const timeForWord =  Math.max(Math.round(word.length / difficultyFactor),2);
         props.settimeword(timeForWord)
         props.setTime(timeForWord);
         return word;
    }

    const setWord = (e) => {
        let value = e.target.value.toUpperCase()
        if (value === currentWord) {
            debugger;
            let difficultyFactor = difficulty.factor + 0.01;
            let level;
            if (difficultyFactor >= 2) level = 'hard';
            else if (difficultyFactor < 1.5) level = 'easy';
            else level = 'medium';
            SetUserText('');
            setDifficulty({ level: level, factor: difficultyFactor });
            let newWord = getNewWord(props.arrayofWords,difficultyFactor)
            setCurrentWord(newWord);
            const timeForWord =Math.max(Math.round(newWord.length / difficultyFactor),2);
            props.settimeword(timeForWord)
            props.setTime(timeForWord);
        }
        else {
            SetUserText(e.target.value)
        }
    }
    useEffect(() => {
        let word = getWords()
        setCurrentWord(word);
    }, [])

    return (
        <div className={styles.text_align}>
            {getCurrentWord()}
            <br />
            <input className={styles.input_box} value={userText} onChange={(e) => setWord(e)} autoFocus />
        </div>
    );
}

export default UserInput;