import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'


function EventInfo(props) {
    const [event, setEvent] = useState({})

    const [date, setDate] = useState("")
    const [name, setName] = useState("")
    const [promoter, setPromoter] = useState("")
    const [discription, setDiscription] = useState("")
    const [ticketLink, setTicketLink] = useState("")
    //general info
    const [genre, setGenre] = useState("")
    const [start, setStart] = useState("")
    const [end , setEnd] = useState("")
    const [cost, setCost] = useState()
    const [age, setAge] = useState("")


    const API_URL = 'http://localhost:5005'
    const id = Object.values(props).join("")
   
    const getEvent = () => {
           axios.get(`${API_URL}/api/map/${id}`)
           .then(res => {
               setEvent(res.data)

               setDate(res.data.date)
               setName(res.data.name)
               setPromoter(res.data.promoter)
               setDiscription(res.data.discription)
               setTicketLink(res.data.ticketLink)

               setGenre(res.data.genre[0]) // db wrong => kein array
               setCost(res.data.cost)
               setAge(res.data.age)

               if(res.data.startTime.length === 1){
                   setStart("0".concat(res.data.startTime))
                } else {
                   setStart(res.data.startTime)
               }

               if(res.data.endTime.length === 1){
                    setEnd("0".concat(res.data.endTime))
                } else {
                    setEnd(res.data.endTime)
            }
       })
    }
   
    useEffect(() => {
       getEvent()
      // console.log(Object.values(props).join(""))
   }, [])

   const ticketToDB = () => {
       const requestBody = {id, cost}
       axios.post(`${API_URL}/api/map`, requestBody)
   }


   if(ticketLink === "" || ticketLink === undefined){
    return (
        <div id="eventInfoSection">
            <div id="profileHeader">
                <div id="eventNameAndPromoter">
                    <h2>{name}</h2>
                    <h5>promoted by : {promoter}</h5>
                </div>
            </div>
            <p>{discription}</p>

            <div id="ticketAndMapsLink">
                   <h4>no online tickets</h4>
            </div>

                <h2>INFO</h2>
                <h4>genre : {genre}</h4>
                <h4>cost : {cost}</h4>
                <h4>age : {age}</h4>
                <h4>start : {start}  end : {end}</h4>

        </div>
    )
   } else {
    return (
        <div>
             <h2>{name}</h2>
             <h5>promoted by : {promoter}</h5>
             <p>{discription}</p>

             <div onClick={ticketToDB}>
                 <a href={ticketLink}>zum online ticket</a>
             </div>

             <h2>INFO</h2>
             <h4>genre : {genre}</h4>
             <h4>cost : {cost}</h4>
             <h4>age : {age}</h4>
             <h4>start : {start}  end : {end}</h4>
        </div>
    )
   }
}

export default EventInfo
