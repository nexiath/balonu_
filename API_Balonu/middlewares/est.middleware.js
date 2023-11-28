const validator = require("validator");

exports.validateEstInput = (req, res, next) => {
    const { id_montgolfiere,id_couleur} = req.body;
    if (!id_montgolfiere || !id_couleur ) {
        return res.status(400).send("Tous les champs sont requis !");
    }
    next();
};
