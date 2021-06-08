const express = require('express')
const fs = require('fs')
const app = express()
const port = 4200

//On récupère les données du fichier json
var file = fs.readFileSync("data.json");
//On les transforme en texte
let notes = JSON.parse(file)

//Affichage de la page d'accueil
app.get('/', (req,res) => res.send('Page d\'accueil banale'))
//Affichage de toutes les notes
app.get('/notes', (req,res) => res.send(notes))
//Affichage d'une note spécifique
app.get('/notes/:id', (req,res) => {
  const id = req.params.id;
  res.send(notes[id-1]);
})
//Création d'une note
app.post('/notes', (req, res) => {
    const id = notes.length + 1;
    const  newNote = {
        id: id,
        title: req.body.title,
        message: req.body.message
    }
    var newData = JSON.stringify(newNote);
    fs.writeFile("data.json", newData, (err) => {
      if(err) throw err;
    })
    res.status(201).json({message:'Note enregistré'});
});

app.listen(port, () => console.log('Server running at localhost:' + port))
