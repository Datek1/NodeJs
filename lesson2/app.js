const express = require('express')
const app = express()
const users = require('./users.json')
const fs = require('node:fs')
const {json} = require("express");


app.use(express.json())
app.use(express.urlencoded({extended: true}))

const port = 4000

app.get('/users', (req, res) => {
    res.status(200).json(users)
})

app.post('/users', (req, res) => {
    fs.writeFile('users.json',`${JSON.stringify({"results":[...users.results, req.body]})}`,(err)=>{})
    res.status(201).json({message:'User Created'})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})