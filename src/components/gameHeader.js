import React,{useEffect,useState} from 'react';
import Score from 'src/containers/score';


function GameHeader({isGameOver,setFinalScore}) {
/*     const { name, level } = {...localStorage}
 */   
   const [user,setUser] = useState({name:'',level:''})
    useEffect(() => {
        const { name, level } = {...localStorage};
        setUser({name:name,level:level})
    }, [])
    return (
        <>
            <div className="row">
                <div className="col-sm-9">
                    <h3 className="text text-heading">
                        <img className="icon-player" src="/person.png" alt="Player" width="40" height="40" />
                        {user.name}</h3>
                    <br />
                    <h3 className="text text-heading">
                        <img className="icon-player" src="/gamepad.png" alt="GamePad" width="40" height="40" />
            LEVEL: {user.level}</h3>
                </div>
                <div className="col-sm-3">
                    <h3 className="text text-heading">fast fingers</h3>
                    {isGameOver?null:<Score isGameOver={isGameOver} setFinalScore={setFinalScore}/>}
                </div>
            </div>
            <style jsx>{`
       .text-heading {
        padding-top: 20px;
        padding-left: 20px;
    }
  
  .icon-player {
    max-width: 2rem;
    max-height: 2rem;
    margin-right: 20px;
    padding-bottom: 10px;
  }
  
      `}</style>
        </>
    )
}

export default GameHeader;