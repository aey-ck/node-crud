const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const APIResponse = require('../models/APIResponse');
const {registerValidation, loginValidation} = require('../routes/validation')

router.post('/', async (req, res) =>{
    console.log("auth route");
    res.status(200).json({'success':0});
})


router.post('/register', async (req, res) =>{
    const {error} = registerValidation(req)
    if (error) return res.status(400)
        .send({status:0,error:error.details[0].message});

    const emailExist = await User.findOne({email:req.body.email})
    if (emailExist) return res.status(400)
        .send({status:0,error:"Email already registered!"});

    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(req. body.password, salt);
    const user = new User({
        name:req.body.name,
        email: req.body.email,
        password: hashPwd
    })

    try{
        const savedUser = await user.save()
        res.json({status:0,error:"",data:savedUser});
    }catch(err){
        res.json({status:0,error:err})
    }

})

//LOGIN
router.post('/login', async (req, res) =>{
    const {error} = loginValidation(req);
    if (error) return res.status(400)
        .send({status:0,error:error.details[0].message});

    const user = await User.findOne({email:req.body.email});
    var validPass = true;
    if (user) validPass = await bcrypt.compare(req.body.password, user.password);

    if (!user || !validPass) return res.status(400)
        .send({status:0,error:"Email or password is incorrect"});

    const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send({token:token});

    // res.json({status:user});

})






module.exports = router