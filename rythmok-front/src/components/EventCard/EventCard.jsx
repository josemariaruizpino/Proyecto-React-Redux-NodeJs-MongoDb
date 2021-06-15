import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './eventCard.scss'
import { checkSession } from "../../api/auth.api";

const EventCard = (props) => {
    // console.log(props.event)
    const eventData = props.event;
    const [user, setUser] = useState(null);

    const [isFav, setIsFav] = useState(false);
    const state = useSelector(state=>state)
    console.log(state)
    
    const addRemoveFav = () => {
        setIsFav(!isFav)
    }
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
        console.log(user._id, eventData._id)
        let urlBuy = `http://localhost:4000/users/${user._id}/buy/${eventData._id}`;
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

    console.log(eventData._id)
   
    // const URL_ADD_FAV = `${URL_BASE}/users/:id/add-favourite/:idEvent`;
    // props.event
    return (
        <div className="event-card">
            <div className="event-card__image">
                <img src={eventData.artists[0].image} alt="" />
            </div>
            <div className="event-card__info">
                <span className="event-card__hall">{eventData.location.name}</span>
                <Link to={{ pathname: "/events/eventdetail", myProps:{eventData, user}, props: {...props} }}>
                    <h3 className="event-card__artist">{eventData.artists[0].name}</h3>
                </Link>
                <span className="event-card__styles">
                    {eventData.styles.map((style, index, styles)=> {
                        {/* console.log('index: ', index, 'length: ', styles.length) */}
                        if (index === (styles.length - 1)) return `${style}`
                        else return `${style} / `
                    })}
                </span>
                <span className="event-card__attendees">{eventData.attendees.length} asistentes</span>
                <span className="event-card__price">{eventData.prize} €</span>
                <div className="event-card__buttons">
                    <button className="event-card__fav" onClick={()=>{addRemoveFav(); postAddFav()}}>
                    {/*  */}
                        <img 
                            src={isFav ? '/assets/remove-fav.svg' : '/assets/add-fav.svg'} 
                            alt="" />
                    </button>
                    <button className="event-card__buy" onClick={postBuy} >
                        <Link to={{ pathname: "/pay", myProps:{eventData, user}, props: {...props} }}>Buy</Link>
                    </button>
                </div>
            </div>
        </div>
    )
    // <h1>{props.event.artists.name}</h1>
}

export default EventCard