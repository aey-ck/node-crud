const express = require('express')
const app = express()

const courses = [
    {id: 1, name: 'A'},
    {id: 2, name: 'B'},
    {id: 3, name: 'C'},
    {id: 4, name: 'D'}
]
app.get('/',(req, res)=>{
    res.send('Hello World')
})

app.get('/api/courses',(req, res)=>{
    res.send(courses)
})

// app.post()
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c=> c.id === parseInt(req.params.id))
    if (!course) res.status(404).send({'success':0, 'message':'not found'})
    res.send(course)
})

app.get('/api/courses/:year/:month', (req, res) => {
    res.send(req.query)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening to ${port}`))