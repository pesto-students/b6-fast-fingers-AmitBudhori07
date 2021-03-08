import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import GameHeader from 'src/components/gameHeader';
import GameArea from 'src/containers/gameArea';
import {useUser} from 'data/useUser';
import Layout from 'src/containers/layout';
import {getWords} from 'service/userApi';
import {getWordStore} from 'src/constants/getNewWords';
import fetchJson from 'service/fetchJson'






/* export async function getStaticPaths() {
  const res = await fetch('http://localhost:5000/api/all')
  const posts = await res.json()

  const paths = posts.map((post) => ({
    params: { email: post.email },
  }))

  return { paths, fallback: false }
}*/

/* export async function getStaticProps({params}) {
  const scores = await getScore('http://localhost:5000/api/scorelist');
  const param= {"1":"2"};
  return {
    props: {context:param,scores:scores}
  };
} */

export async function getStaticProps() {

  const {words} = await getWords('http://localhost:5000/fastfinger/words');
  let easyWords = [], mediumWords = [], hardWords = [];
 for (const word of words) {
    switch(word.type){
      case "easy": 
       easyWords.push(word.words);
       break;
      case "medium": 
       mediumWords.push(word.words);
       break;
      case  "hard": 
       hardWords.push(word.words);
       break
       default:
        easyWords.push(word);
        break;
    }
  } 

  return {
    props: { easy: easyWords, medium
      : mediumWords, hard: hardWords }
  }
}



function Game(props) {
  getWordStore(props);
 
  const router = useRouter();
  const { user, mutateUser } = useUser({ redirectTo: '/' })

  if (!user || user.isLoggedIn === false) {
    return <Layout>loading...</Layout>
  }
/*   const { name, level } = {...localStorage};
 */  const [isGameOver,setIsGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const onGameover = () => {
    setIsGameOver(true);
  }

  const clearState = () => {
    setIsGameOver(false);
    setFinalScore(false);
  };
/* 
  useEffect(() => {
    if (!(name || level)) {
      router.push('/')
    }
  }, [name, level]) */

  const stopGame =()=>{
    localStorage.removeItem('token');
    mutateUser(fetchJson('/api/logout'))
  }

  
 /*  if(loading) return<button style={{color:"red"}}>Loading</button>
  if(!loggedIn) {
    router.push('/');
    return<Layout title="Redirecting"><></></Layout>
  }; */

  return (
    <Layout title="Game">
     <GameHeader isGameOver={isGameOver} setFinalScore={setFinalScore}/>
     <GameArea isGameOver={isGameOver} finalScore={finalScore} onGameover={onGameover} clearState={clearState} /* scorelist = {props.scores} *//>
      <div className="row">
        <div className="col-md-3">
          <div className="start-game-element">
            <Link href="/">
              <button className="btn-quit-game" onClick={stopGame}>
                <img className="icon-play" src="/cross.png" alt="Cross" width="60" height="60" />
                STOP GAME
              </button>
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{`
  
.icon-play {
  max-width: 4rem;
  max-height: 4rem;
  margin-right: 10px;
  padding-bottom: 10px;
}
  .start-game-element {
    margin: auto;
    text-align: center;
    align-content: center;
    object-position: center;
    vertical-align: middle;
  }
  .btn-quit-game {
    background-color: transparent;
    font-size: 1.5rem;
    border: none;
    outline: none;
    color: #ff5155;
  }
      `}</style>
    </Layout>
  );
}

export default Game;