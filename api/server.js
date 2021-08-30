// BUILD YOUR SERVER HERE
const express = require("express")
const User = require("./users/model")

const server = express()

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (user){
                res.status(200).json(user)
            }else{
                res.status(404).json("User not found")
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err.message)
        })
})

server.get('/api/users', (req, res) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(err => {
            console.log(err)
            res.status(500).json(err.message)
        })
})

server.post('/api/users', (req, res) => {
    const newUser = req.body
    console.log(req.body)
    User.insert(newUser)
        .then(user => res.status(201).json(user))
        .catch(err => {
            console.log(err)
            res.status(500).json(err.message)
        })
})

server.put('/api/users/:id', (req, res) => {
    res.json('Update user')
})

server.delete('/api/users/:id', (req, res) => {
    res.json('Delete user')
})

server.use('*', (req, res) => {
    res.json('Wrong endpoint')
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
