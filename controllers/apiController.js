const Project = require('../models/Project');
const Skill = require('../models/Skills');
const Certificate = require('../models/Certificate');

module.exports = {
    Project: async (req, res) => {
        try {
            const project = await Project.find();
            res.status(200).json({
                project
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    Skill: async (req, res) => {
        try {
            const skill = await Skill.find();
            res.status(200).json({
                skill
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    Certificate: async (req, res) => {
        try {
            const certificate = await Certificate.find();
            res.status(200).json({
                certificate
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
}