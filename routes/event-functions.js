const router = require("express").Router();
const Event = require("../models/Event");
const Location = require("../models/Location");
const Ticket = require("../models/Ticket");

//get all event 
router.get("/events", (req, res, next) => {
    Event.find().populate("location")
         .then(events => {
           console.log(events)
           res.status(200).json(events)
         })
  
         .catch(err => next(err))
  })

// //get specific event
// router.get("/events/:id", (req, res, next) => {
//     Event.findById(req.params.id).populate("location")
//             .then(event => {
                
//                 res.status(200).json(event)
//             })
//             .catch(err => next(err))
//   })

router.get("/map/:id", (req, res, next) => {
    Event.findById(req.params.id).populate("location")
            .then(event => {
                console.log("x")
                res.status(200).json(event)
            })
            .catch(err => next(err))
  })


// TICKET 

router.post("/map", (req, res, next) => {
  const event = req.body.id
  const cost = req.body.cost
  console.log(event, cost)

  Ticket.create({
    cost : cost,
    event : event
  })

  .then(ticket => {
    console.log(ticket)
    res.status(201).json(ticket)
  })
  .catch(err => next(err))
})


//HOMEPAGE 

router.get("/", (req, res, next) => {
    res.json("All good in here");
  });


  router.get("/locations", (req, res, next) => {
    console.log("backend")
    Location.find()
            .then(locations => {
              res.status(200).json(locations)
            })
            .catch(err => next(err))
  })

module.exports = router;