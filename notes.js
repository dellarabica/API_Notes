const express = require('express');
const fs = require('fs');
const app = express();
const port = 4200;

//On récupère les données du fichier json
var file = fs.readFileSync("data.json", 'utf-8');
//On les transforme en texte
let notes = JSON.parse(file);

//Affichage de la page d'accueil
app.get('/', (req,res) => res.send('Page d\'accueil banale'));
//Affichage de toutes les notes
app.get('/notes', (req,res) => res.send(notes));
//Affichage d'une note spécifique
app.get('/notes/:id', (req,res) => {
  const id = req.params.id;
  res.send(notes[id-1]);
});

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
      res.status(201).json({message:'Note ajoutée avec succès'});
    })
});

//Modification d'une note
app.patch('/notes/:id', (req, res) => {
    fs.readFile('data.json','utf-8', function(err,data){
        noteMod = JSON.parse(data);
        const id = parseInt(req.params.id);
        const oneNote = noteMod.find(note => note.id == id);

        if(oneNote == null){
            res.status(404).json({message: "Error 404 : Note not found"});
        }else{
           const  newNote = {
                id: id,
                title: req.body.title,
                message: req.body.message
            }
            noteMod.splice(id-1, 1, newNote);
            var dataModif = JSON.stringify(noteMod);
            fs.writeFile('data.json', dataModif, function(err){
                if (err) throw err;
                res.status(201).json({message:'Note modifiée avec succès'});
            });
        }
    });
});

//Suppression d'une note
app.delete('/notes/:id', (req, res) => {
  fs.readFile('data.json','utf-8', function(err,data){
    noteDel = JSON.parse(data);
    const id = parseInt(req.params.id);
    const oneNote = noteDel.find(note => note.id == id)
    if(oneNote == null){
        res.status(404).json({message: "Error 404 : Note not found"});
    }
    else
    {
        noteDel.splice(id-1, 1);
        var dataDel = JSON.stringify(noteDel);
        fs.writeFile('data.json', dataDel, function(err){
            if (err) throw err;
            res.status(201).json({message:'Note supprimée avec succès'});
        });
    }
  });
});

//Confirmation que le serveur est lancé
app.listen(port, () => console.log('Server running at localhost:' + port));
