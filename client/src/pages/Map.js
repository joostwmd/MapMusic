import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import ReactMapGl, {Marker} from "react-map-gl"
import { Link } from 'react-router-dom'


import Nav from '../components/Nav'
import FilterSection from '../components/FilterSection'

function Map(props) {

    const berlinViewport = {
        latitude : 52.520008, 
        longitude : 13.404954,
        width : "100w",
        height : "100vh",
        zoom : 9,
        //minZoom: 9,
    }
    
    const [viewport, setViewport] = useState(berlinViewport)
    
    const [allEvents, setAllEvents] = useState([])
    const [mapMovementActive, setMapMovementActive] = useState(true)
    
    const API_URL = 'http://localhost:5005';


    // test 

    const [locations, setLocations] = useState([])
    
    const getAllLocations = () => {
    axios.get(`${API_URL}/api/locations`)
         .then(res => {
             setLocations(res.data)
         })
         .catch(err => console.log(err))
    }


    const getAllEvents = () => {
        axios.get(`${API_URL}/api/events`)
             .then(res => {
                 console.log(res.data)
                 setAllEvents(res.data)
             })
             .catch(err => console.log(err))
    }
    useEffect(() => {
        getAllEvents()
        getAllLocations()
    }, [])


    const [filterMenuOpen, setFilterMenuOpen] = useState(false)

    const [date, setDate] = useState("5.11")

    const [endTime, setEndTime] = useState(1)
    const [genre, setGenre] = useState("")
    const [age, setAge] = useState("")
    const [cost, setCost] = useState(15)


    //filter the events 

    const dateFilter = allEvents.filter(event => {
        if (event.date === date){
            return event
        } 
    })

    const ageFilter = allEvents.filter(event => {
        if (age === ""){
            return event
        } else {
            if (Number(event.age) >= Number(age.slice(0,2))){
                return event
            }
        }
    })

    const costFilter = allEvents.filter(event => {
        if (event.cost <= Number(cost)){
            return event
        } 
    })

    const endTimeFilter = allEvents.filter(event => {
        if (Number(event.endTime) >= Number(endTime)){
            return event
        } 
    })

    const genreFilter = allEvents.filter(event => {
        if(genre === "default"){
            return event
        } else {
            return event.genre[0] === genre
        }
    })

    const filteredEvents = dateFilter.filter(event => {
        if (ageFilter.includes(event) && costFilter.includes(event) && endTimeFilter.includes(event) && genreFilter.includes(event)){
            return event
        }
    })
        
    if(filterMenuOpen === false){
        return (
            <div id="mapPage">
                <ReactMapGl 
                    {...viewport}
                    mapboxApiAccessToken = "pk.eyJ1Ijoiam9vc3R3bWQiLCJhIjoiY2t1NDQ3NmJqMXRwbzJwcGM5a3FuY3B3dCJ9.yyon_mO5Y9sI1WgD-XFDRQ"
                    mapStyle = "mapbox://styles/joostwmd/ckufanbzo4qlm18qj3w744lbx"
                    onViewportChange={viewport => {
                        if(mapMovementActive === true){
                            setViewport(viewport)
                        } 

                        if(viewport.latitude < 52.25 || viewport.latitude > 52.75 || viewport.longitude < 13.25 || viewport.longitude > 13.75){
                            setViewport(berlinViewport)
                        }

                        
                    }}
                >
                <Nav setFilterMenuOpen={setFilterMenuOpen} setMapMovementActive={setMapMovementActive} {...date}/>
                    {/* filteredEvents */}
                    {filteredEvents.map(event => {
                        return (
                            <Marker
                                latitude={event.location.coordinates[0]} 
                                longitude={event.location.coordinates[1]}
                                // latitude={event.coordinates[0]}
                                // longitude={event.coordinates[1]}
    
                            >
                            <Link to={`/map/${event._id}`}>
                            <div id="markerOnMap">
                                <img alt="clubLogo" src={event.location.logo} />    
                            </div>
                            </Link>
                    
                            </Marker>
                        )
                    })}
    
                </ReactMapGl>
            </div>
        )
    } else if (filterMenuOpen === true) {
        return (
            <div>
                <ReactMapGl 
                    {...viewport}
                    mapboxApiAccessToken = "pk.eyJ1Ijoiam9vc3R3bWQiLCJhIjoiY2t1NDQ3NmJqMXRwbzJwcGM5a3FuY3B3dCJ9.yyon_mO5Y9sI1WgD-XFDRQ"
                    mapStyle = "mapbox://styles/joostwmd/ckufanbzo4qlm18qj3w744lbx"
                    onViewportChange={viewport => {
                        if(mapMovementActive === true){
                            setViewport(viewport)
                        } 
                    }}
                >
                    <FilterSection setDate={setDate} setAge={setAge} setGenre={setGenre} setCost={setCost} setEndTime={setEndTime} setFilterMenuOpen={setFilterMenuOpen} setMapMovementActive={setMapMovementActive}/>
                </ReactMapGl>
            </div>
        )
    }
        
}

export default Map


