const express = require('express')
const app = express()
const users = require('./users.json')
const fs = require('node:fs')



app.use(express.json())
app.use(express.urlencoded({extended: true}))

const port = 4000

app.get('/users', (req, res) => {
    res.status(200).json(users)
})

app.post('/users', (req, res) => {
    if (req.body.name.length >= 3 && req.body.age >= 0) {
        fs.writeFile('users.json', `${JSON.stringify({"results": [...users.results, req.body]})}`, (err) => {
        })
        res.status(201).json({message: 'User Created'})
    } else {
        throw new Error('Name - min lenght 3 and age > 0 ')
    }

})

app.put('/users/:id', (req, res) => {
    const {id} = req.params
    const user = users.results[+id]
    if (!user) {
        throw new Error('User isn`t finded')
    } else {
        res.status(200).json({message: 'User updated'})
        users.results[+id] = req.body
        fs.writeFile('users.json', `${JSON.stringify((users))}`, (err) => {
        })
    }
})

app.delete('/users/:id', (req, res) => {
    const {id} = req.params
    const user = users.results[+id]
    if(!user){
        throw new Error('Users isn`t finded')
    }else {
        res.status(200).json({message:'User deleted'})
        users.results.splice(+id,1)
        fs.writeFile('users.json', `${JSON.stringify((users))}`, (err) => {
        })
    }
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})