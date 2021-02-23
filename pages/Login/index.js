import React, {useReducer } from 'react';
import styles from 'styles/Login.module.css';
import Image from 'next/image';
import LoginHeaders from 'src/components/loginHeaders';
import { DIFFICULTY_LEVEL } from 'src/constants/Difficulty';
import Link from 'next/link';

function Login() {

    const [{name,level,formErrors},dispatch] =useReducer((state, newState) => ({...state, ...newState}), {
        name:'',
        level:'EASY',
        formErrors:{}
       });

    function handleFormValidation() {
        debugger;
        let formErrors = {};

        let formIsValid = true;

        if (!name) {
            formIsValid = false;
            formErrors["UsernameErr"] = "Please enter your name.";
        }

        dispatch({formErrors:formErrors})

        return formIsValid;
    }

    return (
        <React.Fragment>
            <div className={styles.main}>
                <LoginHeaders />
                <div className={styles.forms}>
                    <input type="text" placeholder="TYPE YOUR NAME" value={name} onChange={({target:{value}}) => dispatch({name:value})} />
                    <span style={{ color: "red" }}>{formErrors["UsernameErr"]}</span>


                    <select value={level} onChange={({target:{value}}) => dispatch({level:value})}>

                        {DIFFICULTY_LEVEL.map(({ label, value }) => (
                            <option key={value}>{label}</option>
                        ))}

                    </select>
                    
                    <Link href={name !== '' ? {
                        pathname: '/Game',
                        query: { name: name, level: level }
                    } : "#"}>
                        <button className={styles.btn_start_game} onClick={handleFormValidation}>
                            <Image className={styles.icon_play} src="/play.png" alt="play" width="50" height="50" />
                        START THE GAME</button>
                    </Link>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login;