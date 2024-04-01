const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
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
const prestaRoutes = require("./routes/presta.router");
const commentaireRoutes = require("./routes/commentairePresta.router");
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

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Site Balonu - Groupe n°4',
            description: 'API documentation',
            contact: {
                name: 'Sefa-Elmir-Robin-Noam-Thomas',
            },
            servers: ['http://localhost:8080/'],
        },
    },
    apis: [
        './routes/users.router.js',
        './routes/role.router.js',
        './routes/presta.router.js',
        './routes/commentairePresta.router.js',
        './routes/montgolfiere.router.js',
        './routes/parcours.router.js',
        './routes/planning.router.js',
        './routes/couleur.router.js',
        './routes/vol.router.js',
        './routes/emplacement.router.js',
        './routes/categorieStand.router.js',
        './routes/stand.router.js',
        './routes/produit.router.js',
        './routes/categorie.router.js',
        './routes/horaireVol.router.js',
        './routes/est.router.js',
        './routes/relation.router.js',
        './routes/dateReservation.router.js',
        './routes/passesRoutes.js',
    ],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



app.use('/passes', passesRoutes);
app.use("/utilisateurs", usersRoutes);
app.use("/presta", prestaRoutes);
app.use("/commentaires", commentaireRoutes);
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
