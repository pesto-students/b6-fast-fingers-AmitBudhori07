export let WordStore = {};

export function getWordStore(props){
WordStore=props
}

export function GetNewWord(difficulty){
    const {easy,medium,hard} = WordStore
    switch(difficulty){
        case "EASY": {
            const random = Math.round(Math.random() * (easy.length - 1));
            return easy[random].toUpperCase();
        }
        case "MEDIUM":{
            const random = Math.round(Math.random() * (medium.length - 1));
            return medium[random].toUpperCase();
        }
        case "HARD":{
            const random = Math.round(Math.random() * (hard.length - 1));
            return hard[random].toUpperCase();
        }
        default:{
            return '';
        }
            
    }
}

export function TimeForWord(word,settimeword,setTime,difficultyFactor){
    const timeForWord =  Math.max(Math.round(word.length / difficultyFactor),2);
    settimeword(timeForWord)
    setTime(timeForWord);
}