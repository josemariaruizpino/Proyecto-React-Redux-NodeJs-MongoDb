import  { useState } from "react";
import {login } from "./../../api/auth.api"
import './Login.scss';

const INITIAL_STATE = {
    username:"",
    email:"",
    password:"",
};

const Login = (props)=>{
    const [form, setForm] = useState(INITIAL_STATE);
    const [error, setError] = useState("");

    const submit = async (ev)=>{
        ev.preventDefault();

        try{
            const user = await login (form);
            console.log ("The user has logged");  
            //props.saveUser(user);//
            setForm(INITIAL_STATE);
            props.history.push("/");
        }catch (error){
            setError(error.message);
        }
    };
    const changeInput=(ev) =>{
        const {name , value } = ev.target;

        setForm({...form, [name]: value});
    };
    
    
    return (
        <div className="background">
            <img className="logo" src="https://i.ibb.co/LtSRCS5/Logo.png" alt="Logo" border="0"/>
            <h1 className="title">Login</h1>
        
            <form onSubmit={submit} className = "form-container">
                <label htmlFor="email">
                <p className="form-container__text">Email</p>
                <input 
                type="email"
                id="email"
                name="email"
                placeholder="put your email"
                onChange={changeInput}
                />
                </label>
                <label htmlFor="password">
                <p className="form-container__text">Password</p>
                <input 
                type="password"
                id="password"
                name="password"
                placeholder="put your password"
                onChange={changeInput}
                />
                </label>
                <button type="submit" className="form-container__button"> Login</button>
                {error && <div className="error">{error}</div>}
            </form>
            <a href="/register" className="link">Registrate</a>
        </div>
        
    );
}
export default Login
