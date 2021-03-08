import React, { useReducer } from 'react';
import styles from 'styles/Login.module.css';
import Image from 'next/image';
import LoginHeaders from 'src/components/loginHeaders';
import { DIFFICULTY_LEVEL } from 'src/constants/Difficulty';
import { useUser } from 'data/useUser';
import fetchJson from 'service/fetchJson'

function Login() {
    const { mutateUser } = useUser({
        redirectTo: '/Game',
        redirectIfFound: true,
      })
        const [{ email, password, level, formErrors }, dispatch] = useReducer((state, newState) => ({ ...state, ...newState }), {
        email: '',
        password: '',
        level: 'EASY',
        formErrors: {}
    });
    function handleFormValidation() {
        let formErrors = {};

        let formIsValid = true;

        if (!email) {
            formIsValid = false;
            formErrors["UsernameErr"] = "Please enter your name.";
        }

        dispatch({ formErrors: formErrors })

        return formIsValid;
    }

    const onLoginSubmit = async (e) => {
        e.preventDefault();
        if (handleFormValidation()) {
            try {
                await mutateUser(
                  fetchJson('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({email:email,password:password}),
                  })
                )
              } catch (err) {
                console.error('An unexpected error happened:', err);
                const error = { "error": "Invalid Email or password" }
                dispatch({ formErrors: error })             
             }
              localStorage.setItem('level',level);
        }
    }

   return (
        <React.Fragment>
            <div className={styles.main}>
                <LoginHeaders />
                <form className={styles.forms} onSubmit={onLoginSubmit}>
                    <span style={{ color: "red" }}>{formErrors["error"]}</span>
                    <input type="email" placeholder="EMAIL" value={email} onChange={({ target: { value } }) => dispatch({ email: value })} />
                    <span style={{ color: "red" }}>{formErrors["UsernameErr"]}</span>

                    <input type="password" placeholder="PASSWORD" value={password} onChange={({ target: { value } }) => dispatch({ password: value })} />

                    <select value={level} onChange={({ target: { value } }) => dispatch({ level: value })}>

                        {DIFFICULTY_LEVEL.map(({ label, value }) => (
                            <option key={value}>{label}</option>
                        ))}

                    </select>

                    {/*                     <Link href={email !== '' ? {
                        pathname: '/Game',
                        query: { name: email, level: level }
                    } : "#"}> */}
                    <button type="submit" className={styles.btn_start_game}>
                        <Image className={styles.icon_play} src="/play.png" alt="play" width="50" height="50" />
                        START THE GAME</button>
                    {/*                     </Link>
 */}                </form>
            </div>
        </React.Fragment>
    )
}

export default Login;