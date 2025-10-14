const express = require('express');
const app = express();
const port = 3000

app.use(express.json());

let tasks = [];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/new-task', (req, res) => {
  tasks.push(req.body);
  res.json(req.body);
});

app.patch('/update-task/:id', (req, res) => {
  const id = req.params.id;
  const champs = req.body;

  for (let champ in champs) {
    tasks[id][champ] = champs[champ];
  }

  res.json(tasks[id]);
});

app.delete('/delete-task/:id', (req, res) => {
  const id = req.params.id;
  tasks.splice(id, 1);
  res.json({ message: 'supprimé' });
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`)
})
