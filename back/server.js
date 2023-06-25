const express = require('express');
const cors = require('cors');
const playerRoutes = require('./public/routes/player');
const postRoutes = require('./public/routes/poste');
const nationalitiesRoutes = require('./public/routes/nationalite');
const clubsRoutes = require('./public/routes/club');
const app = express();
app.use(cors());

app.use('/player', playerRoutes);
app.use('/posts', postRoutes);
app.use('/nationalities', nationalitiesRoutes);
app.use('/clubs', clubsRoutes);

app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});

module.exports = app;