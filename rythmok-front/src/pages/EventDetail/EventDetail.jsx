import {InfoCard, Section} from './../../components'
import {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'


const EventDetail = (props) => {

    // const [inputValue, setInputValue] = useState()
    
    const {events, eventDetail, } = useSelector(state => state.data)
    
    // console.log('data', artists)
    // console.log('data', halls)
    // console.log('data', styles)

    const [eventsState, setEventsState] = useState(events)
    const [eventDetailState, setEventDetailState] = useState(eventDetail)

    console.log("HOLA" , props)


    return (
        
        <InfoCard myProps={props.location.myProps}/>
                
                       
        
    )
}

export default EventDetail