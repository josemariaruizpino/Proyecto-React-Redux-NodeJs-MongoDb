import { useState } from "react";
import { useSelector } from "react-redux";
import { EventCard } from "../../components";
import './eventsPage.scss'

const EventsPage = (props) => {
    // console.log('info item', props)
    let typeOfData = props.location.typeOfData;
    let isGenre = (typeOfData === "Genres")
    let isArtist = (typeOfData === "Artists")
    let isHall = (typeOfData === "Halls")
    let infoItem = props.location.infoItem;
    let thingToFilter = '';
    if (infoItem){
        if (isGenre) {
            thingToFilter = infoItem
        }
        else {
            thingToFilter = infoItem.name
        }
        console.log('FILTER', thingToFilter)
    }
    const events = useSelector(state => state.events.events)
    const [eventsFiltered, setEventsFiltered] = useState(events)
    console.log('EVENTS',events)

    const handleInput = (e) => {
        // console.log('TARGET',e.target.className)
        // let whichInput = e.target.className;
        let inputValue = e.target.value.toLowerCase();
        let toSetArtist = events.filter(event => event.artists[0].name.includes(inputValue))
        let toSetStyle = events.filter(event => {
            console.log('input value', inputValue)

            console.log('retornado', event.styles.filter(style => style.includes(inputValue)))
            return event.styles.filter(style => style.includes(inputValue)[0])
        })
        // let toFilter = 
        setEventsFiltered()
        // .styles[0].name.includes(inputValue)
        console.log('to filter', toSetStyle)
    }

    // console.log('from jsx', events)
    // console.log('my props', props)
    return (
        <>
            {/* <h1>{thingToFilter}Nothing</h1> */}
            <div className="filters">
                <input type="text" placeholder="artist" className="artist" value={isArtist ? thingToFilter : ''} onChange={handleInput} />
                <input type="text" placeholder="styles" className="styles"  onChange={handleInput} />
                <input type="text" placeholder="halls" className="halls" value={isHall ? thingToFilter : ''} />
                <input type="date" placeholder="date" className="date" />
            </div>
            <div className="events">
                {events && events.map((event, index) => <EventCard key={index} event={event} />)}

            </div>
        </>
    )
}

export default EventsPage