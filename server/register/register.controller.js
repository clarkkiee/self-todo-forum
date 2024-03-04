const express = require('express')
const { register } = require('./register.service')
const router = express.Router()
const prisma = require('../db')

router.post('/register', async (req, res) => {

    const emailCheck = await prisma.user.findFirst({
        where: {
            email: req.body.email
        }
    })
    
    if (emailCheck) {
        return res.send({
            message: "Email already exists"
        })
    }
    
    const usernameCheck = await prisma.user.findFirst({
        where: {
            username: req.body.username
        }
    })
    
    if (usernameCheck) {
        return res.send({
            message: "Username already exists"
        })
    }

    const response = await register(req.body)
    
    res.send({
        data: {
            email: response.email,
            username: response.username,
        },
        message: "Register Success"
    })
})

module.exports = router