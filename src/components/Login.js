/* eslint-disable no-undef */
import { Button, Link, TextField, Typography} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import Header from './Header';
const firebaseConfig = {
  apiKey: "AIzaSyCXVvpIH4wN_SEqC7UJk757SPPbKx6kcY0",
  authDomain: "pulsecare-b4ad6.firebaseapp.com",
  projectId: "pulsecare-b4ad6",
  storageBucket: "pulsecare-b4ad6.appspot.com",
  messagingSenderId: "974009132259",
  appId: "1:974009132259:web:b7d988f25275d52d2c91d6"
};
// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const useStyles = makeStyles((theme)=>({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin : "100px auto"
      },
      textField: {
        margin: "auto",
        width: '300px',
      },
      submitButton: {
        margin: "auto",
      },
}))
const LoginForm = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const usernamechange = (e) =>{
        setUsername(e.target.value)
    }
    const pwdchange = (e) =>{
        setPassword(e.target.value)
    }
    const history = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth,username,password).then((usercredential)=>{
            alert("Logged in succesfully...");
            history('/')
        })
        .catch((error)=>{
            toast.error(error.message);
        })
        
    };
    const classes = useStyles();
    return (
        <div>
            <Header/>
            <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
                label="Username"
                variant="outlined"
                className= {classes.textField}
                value={username}
                margin="normal"
                onChange={usernamechange}
            />
            <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                className={classes.textField}
                margin="normal"
                onChange={pwdchange}
            />
            <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                Submit
            </Button>
            <Typography variant="body2" align="center">
                Don't have an account? <Link href="/signup">Sign up</Link>
            </Typography>
            </form>
        </div>
  );
};

export default LoginForm;
