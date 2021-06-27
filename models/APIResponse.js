const mongoose = require('mongoose')

const responseSchema = mongoose.Schema({
    status:{
        type: Number,
        default : 0,
    },
    data:{
        type: Object,
        default : {}
    },
    error:{
        type: String,
        default : "Error occured"
    }
})

module.exports = mongoose.model('APIResponse', responseSchema)