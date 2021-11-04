import React from 'react'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import MapMusicLogo from '../public/mapmusic-logo.png'

function Nav(props) {


   useEffect(() => {
       setDate(Object.values(props))
    }, [])

    const [date, setDate] = useState("5.11")

    const openFilterMenu = () => {
        props.setFilterMenuOpen(true)
        props.setMapMovementActive(false)
    }

    
        return (
        <div id="navMap">
            <button id="filterMenuButton" onClick={openFilterMenu}>open filter menu</button>
            <div id="selectedDate">
                <h2>{date}</h2>
            </div>
            <img id="mapMusicLogo" alt="mapmusic logo" src={MapMusicLogo} />
        </div>
        )
    
}

export default Nav
