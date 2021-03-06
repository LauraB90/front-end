import { FormControl, FormHelperText, Input, InputLabel, Grid, TextField, Button, Link, Paper } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import { useHistory } from 'react-router';
import axios from 'axios';
import './login.css';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const [messages, setMessages] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [wrongCredentials, setWrongCredentials] = useState(false);

    const checkIfUserExists = async (event) => {
        event.preventDefault();
        // look for the users info in the database
        try {
            const response = await axios.post(`http://localhost:8080/profile/login/${username}/${password}`);
            if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
            console.log(localStorage.getItem('user'));
            history.push(`/profile/${response.data.username}`);

            // Take to profile
        } 
        } catch (error) {
            setWrongCredentials(true);
            setUsername('');
            setPassword('');
        }
        
        // fetch(`/profile/login/${username}/${password}`)
        //     .then(response => response.json())
        //     .then(body => body.username === username ? takeUserToProfile() : wrongUsernameOrPassword());

    }

    const takeUserToProfile = () => {
        // If the user exists, this function gets called
        // and takes the user to their profile
        console.log('They got taken to their profile');
    }

    const wrongUsernameOrPassword = () => {
        alert('Wrong Username or Password. Try again!');
        setUsername('');
        setPassword('');
    }

    const goToRegistration = (event) => {
        event.preventDefault();
        history.push('/register');
    }

    const goToAboutUs= (event) => {
        event.preventDefault();
        history.push('/aboutUs');
    }

    
    console.log(username);
    console.log(password);

    return (
        <Grid align='center'>
            <h1>Welcome to Chatter-Box!</h1>
            <Paper className='paper__style' variant='outlined' elevation={10}>
                <TextField className='item__position' fullWidth
                    value={username} onChange={(input) => setUsername(input.target.value)} 
                    label='Username' placeholder='Enter Username'/> <br/><br/>

                <TextField className='item__position' fullWidth
                    value={password} onChange={(input) => setPassword(input.target.value)} 
                    label='Password' placeholder='Enter Password' type='password'/> <br/><br/>
            
                <Button className='item__position' fullWidth variant='contained' disabled={!username || !password} onClick={checkIfUserExists} size='medium' color='primary'>Login</Button> <br/><br/><br/>

                <Link className='item__position link' onClick={goToRegistration}>Create a New Account</Link> <br/>
            </Paper>
            <div>
              <br></br>
              <PersonIcon className='person__icon link' onClick={goToAboutUs} style={{fontSize: '100px'}}/> <p className="caption">About Us </p>
            </div>

        </Grid>
    );
}