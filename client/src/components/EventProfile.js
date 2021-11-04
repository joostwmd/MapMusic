import React from 'react'
import {useState} from 'react'
import LineUp from './LineUp'
import EventInfo from './EventInfo'
import LocationInfo from './LocationInfo'

//ui
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

function EventProfile(props) {

    const id = props.match.params.id

    const close = () => {
        props.history.push('/map')
   }

    return (
    <div id="wrapper">
        <div id="profile" >
                <button onClick={close}>x</button>
                <EventInfo {...id} />
                <h2>LINE UP</h2>
                <LineUp {...id} /> 
                <h2>LOCATION</h2>
                <LocationInfo {...id} />
        </div>
    </div>
    )
}

export default EventProfile
