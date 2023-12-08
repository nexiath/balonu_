const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
require('dotenv').config();

dotenv.config();

const app = express();


const corsOptions = {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, 
};
app.use(cors(corsOptions));


app.use(express.json());


const usersRoutes = require("./routes/users.router");
const roleRoutes = require("./routes/role.router");
const montgolfiereRouter = require('./routes/montgolfiere.router');
const parcoursRoutes = require("./routes/parcours.router");
const planningRoutes = require("./routes/planning.router");
const couleurRoutes = require("./routes/couleur.router");
const volRoutes = require("./routes/vol.router");
const emplacementRoutes = require("./routes/emplacement.router");
const categorieStandsRoutes = require("./routes/categorieStand.router")
const standRoutes = require("./routes/stand.router");
const produitRoutes = require("./routes/produit.router");
const categorieRoutes = require("./routes/categorie.router")
const horaireVolRoutes = require("./routes/horaireVol.router");
const estRoutes = require("./routes/est.router");
const relationRoutes = require("./routes/relation.router")
const dateReservationRoutes = require("./routes/dateReservation.router")
const passesRoutes = require('./routes/passesRoutes');

app.use('/passes', passesRoutes);
app.use("/utilisateurs", usersRoutes);
app.use("/roles", roleRoutes);
app.use('/montgolfieres', montgolfiereRouter);
app.use("/parcours", parcoursRoutes);
app.use("/planning", planningRoutes);
app.use("/couleurs", couleurRoutes);
app.use("/vols", volRoutes);
app.use("/emplacements", emplacementRoutes);
app.use("/datesReservations", dateReservationRoutes);
app.use("/categorieStands", categorieStandsRoutes);
app.use("/stands", standRoutes);
app.use("/categories", categorieRoutes);
app.use("/produits", produitRoutes);
app.use("/horaires", horaireVolRoutes);
app.use("/est", estRoutes);
app.use("/relations", relationRoutes);



app.listen(3030, () => {
    console.log('le serveur écoute sur le port 3030')
});
