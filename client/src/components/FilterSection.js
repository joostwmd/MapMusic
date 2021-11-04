import React from 'react'
import {useState, useEffect} from 'react'
import DateFilter from './DateFilter'

function FilterSection(props) {
    //date filter logic

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

    const [fridaySelected, setFridaySelected] = useState(false)
    const [saturdaySelected, setSaturdaySelected] = useState(false)
    const [sundaySelected, setSundaySelected] = useState(false)

    const clickedFriday = () => {
        setSelectedDate(nextFriday)
        setDate(nextFriday)

        //visualFeedback
        setFridaySelected(true)
        setSaturdaySelected(false)
        setSundaySelected(false)
    }

    const clickedSaturday = () => {
        setSelectedDate(nextSaturday)
        setDate(nextSaturday)

        //visualFeedback
        setFridaySelected(false)
        setSaturdaySelected(true)
        setSundaySelected(false)
    }

    const clickedSunday = () => {
        setSelectedDate(nextSunday)
        setDate(nextSunday)

        //visualFeedback
        setFridaySelected(false)
        setSaturdaySelected(false)
        setSundaySelected(true)
    }
   
    const filterEvents = () => {
      //lift values up
      props.setEndTime(endTime)
      props.setGenre(genre)
      props.setAge(age)
      props.setCost(cost)
      props.setDate(date)

      //ui 
      props.setFilterMenuOpen(false)
      props.setMapMovementActive(true)
    }

    const [endTime, setEndTime] = useState("1")
    const [genre, setGenre] = useState("default")
    const [age, setAge] = useState("18+")
    const [cost, setCost] = useState("20")
    const [date, setDate] = useState("5.11")

    useEffect(() => {
      getNextFriday()
      getNextSaturday()
      getNextSunday()
  }, [])

   
    return (
        <div id="filterMenu">
            <div id="dateFilter">
              <button onClick={clickedFriday} style={fridaySelected ? {color : "#ffffff", backgroundColor : '#a48beb'}  : { color : "#a48beb" }}>{nextFriday}</button>
              <button onClick={clickedSaturday} style={saturdaySelected ? {color : "#ffffff", backgroundColor : '#a48beb'}  : { color : "#a48beb" }}>{nextSaturday}</button>
              <button onClick={clickedSunday} style={sundaySelected ? {color : "#ffffff", backgroundColor : '#a48beb'}  : { color : "#a48beb" }}>{nextSunday}</button>
            </div>

            <h2>FILTER MENU</h2>

              <p>mindestens bis: {endTime} Uhr</p>
              <input 
                type="range"
                  min={1}
                  max={12}
                  step={1}
                  value={endTime}
                  onChange={e => setEndTime(e.target.value)}
                >
                </input>
                
                <p>genre des events: {genre}</p>
                  <select id="filterGenre"
                    onChange={e => setGenre(e.target.value)}>
                      <option value={"default"}>beliebig</option>
                      <option value={"techno"}>techno</option>
                      <option value={"house"}>house</option>
                      <option value={"electro"}>electro</option>
                      <option value={"acid"}>acid</option>
                  </select>
                
                
                <p>einlass ab: {age}</p>
                  <select id="filterAge"
                    onChange={e => setAge(e.target.value)}>
                      <option value={"18+"}>18+</option>
                      <option value={"21+"}>21+</option>
                  </select>

                <p>maximaler ticketpreis: {cost}€</p>
                  <input 
                    type="range"
                    min={0}
                    max={20}
                    step={1}
                    value={cost}
                    onChange={e => setCost(e.target.value)}
                  >
                  </input>  
                     
                <div id="filterEventsButton">
                  <button onClick={filterEvents}>get results</button>
                </div>
        </div>
    )
}

export default FilterSection
