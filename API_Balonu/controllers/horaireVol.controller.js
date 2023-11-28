const horaireVolService = require('../services/horaireVolService');

exports.getHorairesVol = (req, res) => {
    horaireVolService.getHorairesVol()
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).send("Internal error"));
};

exports.getHoraireVolById = (req, res) => {
    const id = req.params.id;
    horaireVolService.getHoraireVolById(id)
        .then((data) => {
            if (!data) {
                res.status(404).send("Horaire de vol not found");
            } else {
                res.status(200).json(data);
            }
        })
        .catch((error) => res.status(500).send("Internal error"));
};

exports.createHoraireVol = async (req, res) => {
    const { date_vol, horaire_vol } = req.body;
    try {
        const horaireVol = await horaireVolService.createHoraireVol(date_vol, horaire_vol);
        res.status(201).json(horaireVol);
    } catch (error) {
        res.status(500).send("Internal error");
    }
};

exports.deleteHoraireVol = (req, res) => {
    const id = req.params.id;
    horaireVolService.deleteHoraireVol(id)
        .then(() => res.status(204).send())
        .catch((error) => res.status(500).send(error));
};

exports.updateHoraireVol = async (req, res) => {
    const id_horaire_vol = req.params.id_horaire_vol;
    const { date_vol, horaire_vol } = req.body;
    try {
        console.log("Updating horaire_vol in controller");
        const updatedHoraireVol = await horaireVolService.updateHoraireVol(id_horaire_vol, date_vol, horaire_vol);
        console.log("Updated horaire_vol:", updatedHoraireVol);
        res.status(200).json(updatedHoraireVol);
    } catch (error) {
        console.error("Controller error:", error);
        if (error === "Horaire de vol not found") {
            res.status(404).send("Horaire de vol not found");
        } else {
            res.status(500).send("Internal error");
        }
    }
};



