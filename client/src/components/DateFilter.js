import React from 'react'
import { useState, useEffect } from 'react'

function DateFilter(props) {
   
   const [nextFriday, setNextFriday] = useState("")
   const [nextSaturday, setNextSaturday] = useState("")
   const [nextSunday, setNextSunday] = useState("")

   const [selectedDate, setSelectedDate] = useState("")

   const getNextFriday = () => {
        var indexOfFriday = 5
        var today = new Date();
        var diff = today.getDay() - indexOfFriday;
        if (diff > 0) {
            today.setDate(today.getDate() + 6);
        }
        else if (diff < 0) {
            today.setDate(today.getDate() + ((-1) * diff))
        }
        const nextFriday = (today.toLocaleDateString())

        const end = nextFriday.lastIndexOf(".")
        const nextFridayWithoutYear = nextFriday.slice(0, end)

        setNextFriday(nextFridayWithoutYear)
   }

   const getNextSaturday = () => {
        var indexOfSaturday = 6
        var today = new Date();
        var diff = today.getDay() - indexOfSaturday;
        if (diff > 0) {
            today.setDate(today.getDate() + 6);
        }
        else if (diff < 0) {
            today.setDate(today.getDate() + ((-1) * diff))
        }
        const nextSaturday = (today.toLocaleDateString())

        const end = nextSaturday.lastIndexOf(".")
        const nextSaturdayWithoutYear = nextSaturday.slice(0, end)

        setNextSaturday(nextSaturdayWithoutYear)
    }

    const getNextSunday = () => {
        var indexOfSunday = 7
        var today = new Date();
        var diff = today.getDay() - indexOfSunday;
        if (diff > 0) {
            today.setDate(today.getDate() + 6);
        }
        else if (diff < 0) {
            today.setDate(today.getDate() + ((-1) * diff))
        }
        const nextSunday = (today.toLocaleDateString())

        const end = nextSunday.lastIndexOf(".")
        const nextSundayWithoutYear = nextSunday.slice(0, end)

        setNextSunday(nextSundayWithoutYear)
    }

    useEffect(() => {
        getNextFriday()
        getNextSaturday()
        getNextSunday()
    }, [])

    const [fridaySelected, setFridaySelected] = useState(false)
    const [saturdaySelected, setSaturdaySelected] = useState(false)
    const [sundaySelected, setSundaySelected] = useState(false)

    const clickedFriday = () => {
        setSelectedDate(nextFriday)
        props.setDate(nextFriday)

        //visualFeedback
        setFridaySelected(true)
        setSaturdaySelected(false)
        setSundaySelected(false)
    }

    const clickedSaturday = () => {
        setSelectedDate(nextSaturday)
        props.setDate(nextSaturday)

        //visualFeedback
        setFridaySelected(false)
        setSaturdaySelected(true)
        setSundaySelected(false)
    }

    const clickedSunday = () => {
        setSelectedDate(nextSunday)
        props.setDate(nextSunday)

        //visualFeedback
        setFridaySelected(false)
        setSaturdaySelected(false)
        setSundaySelected(true)
    }

   
    return (
        <div>
            <button onClick={clickedFriday} style={fridaySelected ? {color : "#ffffff", backgroundColor : '#a48beb'}  : { color : "#a48beb" }}>{nextFriday}</button>
            <button onClick={clickedSaturday} style={saturdaySelected ? {color : "#ffffff", backgroundColor : '#a48beb'}  : { color : "#a48beb" }}>{nextSaturday}</button>
            <button onClick={clickedSunday} style={sundaySelected ? {color : "#ffffff", backgroundColor : '#a48beb'}  : { color : "#a48beb" }}>{nextSunday}</button>
        </div>
    )
}

export default DateFilter
