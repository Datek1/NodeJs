const fs = require('fs')
const path = require('path')

fs.mkdir(path.join(__dirname,'mainFolder'), (err) => {
    for (let i = 1; i <= 5; i++) {
        fs.mkdir(path.join(__dirname, 'mainFolder',`folder${i}`),(err)=>{})
        fs.writeFile(path.join(__dirname, 'mainFolder',`text${i}.txt`) , 'gfhghf' ,(err)=>{})
    }
})
fs.readdir(path.join(__dirname ,'mainFolder'),{withFileTypes: true}, (err, files)=>{
    files.forEach(value => {
        console.log(value.isFile());
    })
})