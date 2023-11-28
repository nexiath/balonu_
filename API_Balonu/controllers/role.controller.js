const roleService = require("../services/role.service");

exports.getRole = async (req, res) => {
    try {
        const data = await roleService.getRole();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error during getRole", error);
        res.status(500).send("Internal error");
    }
};


exports.getRoleById = (req, res) => {
    const id = req.params.id;
    roleService.getRoleByid(id)
        .then((data) => {
            if (!data) {
                res.status(404).send("role not found");
            } else {
                res.status(200).json(data);
            }
        })
        .catch((error) => res.status(500).send("Internal error"));
};

