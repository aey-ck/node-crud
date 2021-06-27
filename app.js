const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv/config')
const cors = require('cors')

//IMPORT ROUTES
const postersRoutes = require('./routes/posters')
const authRoutes = require('./routes/auth')



//MIDDLEWARES
app.use(cors())
app.use(express.json())
app.use('/posters', postersRoutes)
app.use('/api/user', authRoutes)

//DB CONNECTION
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true }, (err)=>{
    console.log('Connected to DB!')
})

//START SERVER
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening to ${port}...`))
