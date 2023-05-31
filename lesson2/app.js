const express = require('express')
const app = express()
const users = require('./users.json')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const port = 4000

app.get('/users', (req, res) => {
    res.status(200).json(users)
})

app.post('/users' ,(req,res)=>{
    console.log(req.body);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})