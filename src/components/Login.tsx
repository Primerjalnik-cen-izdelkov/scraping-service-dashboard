import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './Login.scss';
import { Config } from '../config';

type LoginProps = {
    setToken: any;
};

// http://localhost:8080/v1/login
const LOGIN_URL:string = Config.LOGIN_URL;

async function loginUser(user:string, pass:string) {
    console.log("login_url from env:", LOGIN_URL);
    console.log("login_url from env:", process.env.PUBLIC_URL);
    console.log("login_url from env:", process.env.REACT_APP_PUBLIC_URL);
    return fetch(LOGIN_URL, {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"name":user, "password":pass})
    }).then(data => data.json())
}

export default function Login({ setToken }: LoginProps) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const token = await loginUser(username, password);
        setToken(token);
    }

  return(
    <div className="login-wrapper">
        <h1>Please log in</h1>
        <form onSubmit={handleSubmit}>
        <label>
            <p>Username</p>
            <input type="text" onChange={e => setUsername(e.target.value)}/>
        </label>
        <label>
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
            <button type="submit">Submit</button>
        </div>
        </form>
    </div>
  )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}