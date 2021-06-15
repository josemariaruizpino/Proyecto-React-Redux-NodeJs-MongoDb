import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { checkSession } from "../../api/auth.api";
import { useSelector } from 'react-redux';
import './infoCard.scss'



const InfoCard = (props) => {
    // console.log(props.event)
    const eventData = props.myProps.eventData;
    const [user, setUser] = useState(null);

    const [isFav, setIsFav] = useState(false);
    const state = useSelector(state=>state);
    
    const addRemoveFav = () => {
        setIsFav(!isFav)
    }
    // console.log("HOLA OTRA VEZ", eventData)

    useEffect(() => {
        checkUserSession()
        // console.log('user', user._id)
        
    }, [])


    const checkUserSession = async () => {
        try {
            const user = await checkSession();
            // if (user.message) redirect()
            if (!user.message) {
                saveUser(user);
            } else {
                saveUser(false);
            }
        } catch (error) {
            // console.log("Error", error);
        }
    };
    const saveUser = (user) => setUser(user);
    // const {eventData} = props.myProps
    console.log(props.myProps.eventData)
    console.log("user",user)
    console.log("eventdata",eventData)
    const postAddFav = async() => {
        let urlAddFav = `http://localhost:4000/users/${user._id}/add-favourite/${eventData._id}`;
        const req = await fetch(urlAddFav, {
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

    const postBuy = async() => {
        // console.log(myProps)
        let urlBuy = `http://localhost:4000/users/${user._id}/buy/${eventData._id}`;
        const req = await fetch(urlBuy, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            credentials: 'include',
            // body: form,
        }); }
    // props.event
    console.log(eventData)
    return (
        <div className="info-card">
            <div className="info-card__info">
           
                <img className="info-card__image" src={eventData.artists[0].image} alt="" />
                <div className="info-card__flexbox">
                <h3 className="info-card__artist">{eventData.artists[0].name}</h3>
                <span className="info-card__price">{eventData.prize} €</span>
                </div>
            </div>

            <div className="button-container">
            <button className="event-card__fav" onClick={()=>{addRemoveFav(); postAddFav()}}>
                    {/*  */}
                        <img 
                            src={isFav ? '/assets/remove-fav.svg' : '/assets/add-fav.svg'} 
                            alt="" />
                    </button>
                    <button className="event-card__buy" onClick={postBuy} >
                        <Link to={{ pathname: "/pay", myProps:props.myProps, props: {...props} }}>Buy</Link>
                    </button>
                    
            
            <div className="info-card__buttons">

                    <button className="info-card__buy">Buy</button>
                    </div>
                <span className="info-card__attendees">{eventData.attendees.length} asistentes</span>
                    </div>
                    

                <div className="info-card__details">
                <span className="info-card__hall">{eventData.location.name}</span>
                </div>

                <div className="info-card__description">
                <span className="info-card__text">{eventData.artists[0].bio}</span>
                </div>
        </div>
    )
    // <h1>{props.event.artists.name}</h1>
}


export default InfoCard;