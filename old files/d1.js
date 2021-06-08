/*const fs = require("fs")

const pen = [
   {title:"Ma note", message: "Le contenu de ma note"},
   {title: "Ma note numéro 2", message: "Le contenu de ma note numéro 2"}
]

penString = JSON.stringify(pen);
fs.writeFile("data.json", penString, (err) => {
  if(err) throw err;
  console.log("Pen stored in file!")
});*/

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req,res) => res.send('Bienvenue sur mon site'))
app.get('/blog', (req,res) => res.send('Mes articles'))
app.get('/contact', (req,res) => res.send('Me contacter'))

app.listen(port, () => console.log('Server running'))
