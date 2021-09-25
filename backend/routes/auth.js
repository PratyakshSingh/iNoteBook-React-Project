const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'PratyakshSingh';


//create a user using '/api/auth/createUser' . NO LOGIN REQUIRED
router.post('/createuser', [
    body('name', 'Enter a vald name').isLength({min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({min: 5})
] , async (req, res) => {
    let success = false;
//if there are errors return bad requests
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
//check whether the email exists or not
try{
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({success, error: "Sorry a user with this email already exists"})
    }

    const salt = await bcrypt.genSalt(10);
    const secretPassword = await bcrypt.hash(req.body.password, salt);


    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secretPassword,
      })
      const data = {
          user: {
              id: user.id
          }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ success: true, authtoken})
    //   res.json({user})
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
})

//login a user using '/api/auth/login' .
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be empty').exists()
] , async (req, res) => {
    let success = false;
//if there are errors return bad requests
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ success, error: "PLease try to login with correct credentials"})
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({ success, error: "PLease try to login with correct credentials"})
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ success: true, authtoken})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

})


//Get a user using authtoken from '/api/auth/getuser'.
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router;