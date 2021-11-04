const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const ticketSchema = new Schema ({
    cost : Number,
    event : {
        type : Schema.Types.ObjectId,
        ref : "Event"
    }
})


const Ticket = mongoose.model('Ticket', ticketSchema)
module.exports = Ticket;