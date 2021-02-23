import Login from './Login';
import data from 'data/dictionary.json';
import {getWordStore} from 'src/constants/getNewWords'

export async function getStaticProps() {
  
  let easyWords = [], mediumWords = [], hardWords = [];
  for (const word of data) {
    if (word.length <= 4) {
      easyWords.push(word)
    }
    else if (word.length <= 8) {
      mediumWords.push(word);
    }
    else {
      hardWords.push(word);
    }
  }

  return {
    props: { easy: easyWords, medium: mediumWords, hard: hardWords }
  }
}

export default function Home(props) {
  getWordStore(props);
   return (
   <Login/>
  )
}
