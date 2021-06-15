/*

import {useState} from "react";
import {PayForm} from "../../pages/PayForm/PayForm";
*/
import './payform.scss'
/*
const INITIAL_STATE={
    username:"",
    email:"",
}
const Payform = (props)=>{
    const[form,setForm] = useState(INITIAL_STATE);
    const[error,setError]= useState("")

    const submit = async(ev)=>{
        ev.preventDefault();
    }
    try{
    }cacth (error)}
    setError(error.message)
    const changeInput = (ev)=>{
    }
}
*/

const Payform = (props)=>{

    const {myProps} = props.location

    const postBuy = async() => {
        console.log(myProps.user._id, myProps.eventData._id)
        let urlBuy = `http://localhost:4000/users/${myProps.user._id}/buy/${myProps.eventData._id}`;
        const req = await fetch(urlBuy, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            credentials: 'include',
            // body: form,
        });
        console.log(req)
    }
    console.log(myProps)
    return(
        <div className="form-page">
            <div className="form">
                <div className="header-form">
                <p>Compra Tus Entradas </p>
                </div>
                <div className="form-body">
                    <h3>
                        Entrada General: 25 €
                    </h3>
                    <select>
                        <option value="1 entrada">1 entrada</option>
                        <option value="2 entrada">2 entrada</option>
                        <option value="3 entrada">3 entrada</option>
                        <option value="4 entrada">4 entrada</option>
                    </select>
                    <p>Gastos de gestión: 0,90€</p>
                    <hr/>
                    <p>Total: 25,9€</p>
                        
                    <h2>Datos del comprador</h2>
                    
                    <input type="text" placeholder="Nombre y apellidos"></input>
                    <input type="email" placeholder="Email"></input>
                    <input type="text" placeholder="Cod.Postal"></input>

                    <h2>Pago con tarjeta</h2>

                    <input type="number" placeholder="Nº Tarjeta"></input>
                    <input type="number" placeholder="mes/año"></input>
                    <input type = "number" placeholder="CVV"></input>
                    <input type="text" placeholder="Titular"></input>
                    <div className="button-container">
                    <buton className="pay" type="submit" 
                    onClick={postBuy}>Pagar</buton>
                    </div>
                </div> 
            </div>
        </div>
    )
}
export default Payform;
