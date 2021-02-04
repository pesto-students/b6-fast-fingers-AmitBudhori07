import React, { useState } from 'react';
import styles from '../../../styles/Login.module.css';
import { useRouter } from 'next/router';
import Image from 'next/image'

function Login() {
    const [name, setName] = useState('');
    const [level, setlevel] = useState('EASY');
    const [formErrors, setError] = useState({});
    const router = useRouter()
    function handleFormValidation() {
        let formErrors = {};

        let formIsValid = true;

        if (!name) {
            formIsValid = false;
            formErrors["UsernameErr"] = "Please enter your name.";
        }

        setError(formErrors)

        return formIsValid;
    }

    const onsubmit = (e) => {
        e.preventDefault();

        if (!handleFormValidation()) {
            return;
        }
        router.push({pathname:'/components/Game',
        query:{name:name,level:level}
    })
    }

    return (
        <React.Fragment>
            <div className={styles.main}>
                <div className={styles.div_title}>
                    <Image src="/keyboard.png" alt="keyboard" width="150" height="100"/>
                    <br></br>
                    <br></br>
                    <h1 className="text">FAST FINGERS</h1>
{/*                     <h3><span>the ultimate typing game  </span></h3>
 */}                </div>
                <div className={styles.forms}>
                    <input type="text" placeholder="TYPE YOUR NAME" value={name} onChange={(e) => setName(e.target.value)} />
                    <br></br>
                    <span style={{ color: "red" }}>{formErrors["UsernameErr"]}</span>
                    <br />
                    <select value={level} onChange={(e) => setlevel(e.target.value)}>
                        <option>EASY</option>
                        <option>MEDIUM</option>
                        <option>HARD</option>
                    </select>
                    <br />
                    <button className={styles.btn_start_game} onClick={(e) => onsubmit(e)}>
                    <Image className={styles.icon_play} src="/play.png" alt="play" width="50" height="50"/>
                        START THE GAME</button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login;