import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

function MapMarker(props) {

    const [location, setLocation] = useState({})
    const API_URL = 'http://localhost:5005'
    const id = Object.values(props).join("")

    const getEvent = () => {
        axios.get(`${API_URL}/api/events/${id}`)
        .then(res => {
            setLocation(res.data.location)
    })
 }

    useEffect(() => {
        getEvent()
        console.log(id)
    }, [])

    return (
        <div id="markerOnMap">
            <h5 id="nameInMarker">{location.name}</h5>
        </div>
    )
}

export default MapMarker
