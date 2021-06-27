const express = require('express')
const router = express.Router()
const Poster = require('../models/Poster')
const verifyAuth = require('./verifyAuth')

router.get('/',verifyAuth, async (req, res) =>{
    try{
    const posters = await Poster.find()
    res.json(posters)
    }catch(err){
        res.json({'error':err})
    }
})

router.get('/:id', async (req, res) =>{
    try{
    const poster = await Poster.findById(req.params.id)
    res.json(poster)
    }catch(err){
        res.json({'error':err})
    }
})

router.delete('/:id', async (req, res) =>{
    try{
    const deletedPoster = await Poster.remove({_id: req.params.id})
    res.json(deletedPoster)
    }catch(err){
        res.json({'error':err})
    }
})

router.patch('/:id', async (req, res) =>{
    try{
    const updatedPoster = await Poster.updateOne({_id: req.params.id}, {$set:{title:req.body.title}})
    res.json(updatedPoster)
    }catch(err){
        res.json({'error':err})
    }
})

router.get('/sp', (req, res) =>{
    res.send('SP')
})

router.post('/', async (req, res)=>{
    const poster = new Poster({
        title: req.body.title,
        description: req.body.description
    })
    try{
        const savedPost = await poster.save()
        res.json(savedPost)
    }catch(err){
        res.json({'error':err})
    }
})



module.exports = router