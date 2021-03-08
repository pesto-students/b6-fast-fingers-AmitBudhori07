import React, { useReducer, useEffect } from 'react';
import styles from 'styles/Login.module.css';
import Image from 'next/image';
import LoginHeaders from 'src/components/loginHeaders';
import { register } from 'service/userApi';
import Router from 'next/router';
import Layout from 'src/containers/layout'
import Link from 'next/link';

function Register() {
    const [{ name, email, password, formErrors }, dispatch] = useReducer((state, newState) => ({ ...state, ...newState }), {
        name: '',
        email: '',
        password: '',
        formErrors: {}
    });
    /*        useEffect(() => {
               debugger;
               console.log(user);
               if(user && !user.error){
                   Router.push({
                    pathname: '/Game',
                    query: { name: localStorage.getItem('name'), : localStorage.getItem('') }
                })
               }
           }, [user]) */
    function handleFormValidation() {
        let formErrors = {};

        let formIsValid = true;

        if (!email) {
            formIsValid = false;
            formErrors["UsernameErr"] = "Please enter your name.";
        }

        if(!password){
            formIsValid = false;
            formErrors["PASSWORD"] = "Invalid Password.";
        }

        dispatch({ formErrors: formErrors })

        return formIsValid;
    }

    const onLoginSubmit = async (e) => {
        e.preventDefault();
        if (handleFormValidation()) {
            const res = await register({ name, email, password });
            const error = { "error": "User Already exist" }
            res instanceof Error ? dispatch({ formErrors: error }) : Router.push('/')
        }
    }

    return (
        <Layout title="Register">
        <div className={styles.main}>
                <LoginHeaders />
                <form className={styles.forms} onSubmit={onLoginSubmit}>
                    <span style={{ color: "red" }}>{formErrors["error"]}</span>
                    <input type="text" placeholder="USERNAME" value={name} onChange={({ target: { value } }) => dispatch({ name: value })} required />
                    <span style={{ color: "red" }}>{formErrors["UsernameErr"]}</span>
                    <input type="email" placeholder="EMAIL" value={email} onChange={({ target: { value } }) => dispatch({ email: value })} required/>
                    <span style={{ color: "red" }}>{formErrors["EMAIL"]}</span>                    
                    <input type="password" placeholder="PASSWORD" value={password} onChange={({ target: { value } }) => dispatch({ password: value })} required minLength="8"/>
                    <span style={{ color: "red" }}>{formErrors["PASSWORD"]}</span>

                    {/*                     <Link href={email !== '' ? {
                        pathname: '/Game',
                        query: { name: email, :  }
                    } : "#"}> */}
                    <button type="submit" className={styles.btn_start_game}>
                        <Image className={styles.icon_play} src="/play.png" alt="play" width="50" height="50" />
                        REGISTER</button>
                    {/*                     </Link>
 */}                </form>
            </div>
        </Layout>
    )
}

export default Register;