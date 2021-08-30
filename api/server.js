// BUILD YOUR SERVER HERE
const express = require("express")
const User = require("./users/model")

const server = express()

server.use(express.json())

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (user){
                res.status(200).json(user)
            }else{
                res.status(404).json({message: "The user with the specified ID does not exist"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: err.message})
        })
})

server.get('/api/users', (req, res) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(err => {
            console.log(err)
            res.status(500).json({message: err.message})
        })
})

server.post('/api/users', (req, res) => {
    const newUser = req.body
    console.log(req.body)
    if (newUser.name && newUser.bio){
        User.insert(newUser)
            .then(user => res.status(201).json(user))
            .catch(err => {
                console.log(err)
                res.status(500).json({message: err.message})
            })
    }else{
        res.status(400).json({message: 'Please provide name and bio for the user'})
    }
})

server.put('/api/users/:id', (req, res) => {
    const upUser = req.body;
    const { id } = req.params;
    if (upUser.name && upUser.bio){
        User.update(id, upUser)
            .then(user => {
                if (user){
                    res.status(200).json(user)
                }else{
                    res.status(404).json({message: 'The user with the specified ID does not exist'})
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({message: err.message})
            })
    }else{
        res.status(400).json({message :'Please provide name and bio for the user'})
    }
})

server.delete('/api/users/:id', (req, res) => {
    User.remove(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json(user)
            }else{
                res.status(404).json({message: 'The user with the specified ID does not exist'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: err.message})
        })
})

server.use('*', (req, res) => {
    res.json('Wrong endpoint')
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
