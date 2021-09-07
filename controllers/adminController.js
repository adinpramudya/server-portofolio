const Project = require('../models/Project');
const Skill = require('../models/Skills');
const Certificate = require('../models/Certificate');
const Users = require('../models/Users');
const bcrypt = require('bcryptjs');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
    viewSignin: async (req, res) => {
        try {
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = { message: alertMessage, status: alertStatus };
            if (req.session.user == null || req.session.user == undefined) {
                res.render('index', {
                    title: "Portofolio | Login",
                    alert

                });
            } else {
                res.redirect('/admin/dashboard')
            }
        } catch (error) {
            res.redirect('/admin/signin');
        }
    },
    actionSignin: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await Users.findOne({ username: username });
            if (!user) {
                req.flash('alertMessage', 'User yang anda masukkan tidak terdaftar');
                req.flash('alertStatus', 'danger');
                res.redirect('/admin/signin');
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                req.flash('alertMessage', 'Password yang anda masukkan tidak cocok');
                req.flash('alertStatus', 'danger');
                res.redirect('/admin/signin');
            }
            req.session.user = {
                id: user.id,
                username: user.username
            }
            res.redirect('/admin/dashboard')
        } catch (error) {
            res.redirect('admin/signin')
        }
    },

    actionLogout: (req, res) => {
        req.session.destroy();
        res.redirect('/admin/signin');
    },

    viewDashboard: async (req, res) => {
        try {
            const project = await Project.find();
            const skill = await Skill.find();
            const certificate = await Certificate.find();
            res.render('admin/dashboard/view_dashboard', {
                title: "Portofolio | Dashboard",
                user: req.session.user,
                project,
                skill,
                certificate


            });
        } catch (error) {

        }
    },

    viewProject: async (req, res) => {
        try {
            const project = await Project.find();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = { message: alertMessage, status: alertStatus };
            res.render('admin/project/view_project', {
                title: "Portofolio | Project",
                user: req.session.user,
                alert,
                project
            });
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/project')
        }
    },

    addProject: async (req, res) => {
        try {
            const { nameProject, type, description } = req.body;
            await Project.create({
                nameProject,
                type,
                description,
                imageUrl: `images/${req.file.filename}`
            });
            req.flash('alertMessage', 'Success Add Project');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/project');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/project');
        }
    },

    editProject: async (req, res) => {
        try {
            const { id, nameProject, type, description } = req.body;
            const project = await Project.findOne({ _id: id });
            if (req.file == undefined) {
                project.nameProject = nameProject;
                project.type = type;
                project.description = description;
                await project.save();
                req.flash('alertMessage', 'Success Update Project');
                req.flash('alertStatus', 'success');
                res.redirect('/admin/project');
            } else {
                await fs.unlink(path.join(`public/${project.imageUrl}`));
                project.nameProject = nameProject;
                project.type = type;
                project.description = description;
                project.imageUrl = `images/${req.file.filename}`
                await project.save();
                req.flash('alertMessage', 'Success Update Project');
                req.flash('alertStatus', 'success');
                res.redirect('/admin/project');
            }
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/project');
        }
    },

    deleteProject: async (req, res) => {
        try {
            const { id } = req.params;
            const project = await Project.findOne({ _id: id });
            await fs.unlink(path.join(`public/${project.imageUrl}`));
            await project.remove();
            req.flash('alertMessage', 'Success Delete project');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/project');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/project');
        }
    },

    viewSkill: async (req, res) => {
        try {
            const skill = await Skill.find();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = { message: alertMessage, status: alertStatus };
            res.render('admin/skill/view_skill', {
                title: "Portofolio | Skills",
                user: req.session.user,
                alert,
                skill
            });

        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/skill')
        }
    },

    addSkill: async (req, res) => {
        try {
            const { name, experience } = req.body;
            await Skill.create({
                name,
                experience,
                imageUrl: `images/${req.file.filename}`
            });
            req.flash('alertMessage', 'Success Add skill');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/skill');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/skill');
        }
    },

    editSkill: async (req, res) => {
        try {
            const { id, name, experience } = req.body;
            const skill = await Skill.findOne({ _id: id });
            if (req.file == undefined) {
                skill.name = name;
                skill.experience = experience;
                await skill.save();
                req.flash('alertMessage', 'Success Update Skill');
                req.flash('alertStatus', 'success');
                res.redirect('/admin/skill');
            } else {
                await fs.unlink(path.join(`public/${skill.imageUrl}`));
                skill.name = name;
                skill.experience = experience;
                skill.imageUrl = `images/${req.file.filename}`
                await skill.save();
                req.flash('alertMessage', 'Success Update Skill');
                req.flash('alertStatus', 'success');
                res.redirect('/admin/skill');
            }
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/skill');
        }
    },

    deleteSkill: async (req, res) => {
        try {
            const { id } = req.params;
            const skill = await Skill.findOne({ _id: id });
            await fs.unlink(path.join(`public/${skill.imageUrl}`));
            await skill.remove();
            req.flash('alertMessage', 'Success Delete skill');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/skill');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/skill');
        }
    },

    viewCertificate: async (req, res) => {
        try {
            const certificate = await Certificate.find();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = { message: alertMessage, status: alertStatus };
            res.render('admin/certificate/view_certificate', {
                title: "Portofolio | Certificate",
                user: req.session.user,
                alert,
                certificate
            });

        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/certificate')
        }
    },

    addCertificate: async (req, res) => {
        try {
            const { title, type, description } = req.body;
            await Certificate.create({
                title,
                type,
                description,
                imageUrl: `images/${req.file.filename}`
            });
            req.flash('alertMessage', 'Success Add Certificate');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/certificate');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/certificate');
        }
    },

    editCertificate: async (req, res) => {
        try {
            const { id, title, type, description } = req.body;
            const certificate = await Certificate.findOne({ _id: id });
            if (req.file == undefined) {
                certificate.title = title;
                certificate.type = type;
                certificate.description = description;
                await certificate.save();
                req.flash('alertMessage', 'Success Update certificate');
                req.flash('alertStatus', 'success');
                res.redirect('/admin/certificate');
            } else {
                await fs.unlink(path.join(`public/${certificate.imageUrl}`));
                certificate.title = title;
                certificate.type = type;
                certificate.description = description;
                certificate.imageUrl = `images/${req.file.filename}`
                await certificate.save();
                req.flash('alertMessage', 'Success Update certificate');
                req.flash('alertStatus', 'success');
                res.redirect('/admin/certificate');
            }
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/certificate');
        }
    },

    deleteCertificate: async (req, res) => {
        try {
            const { id } = req.params;
            const certificate = await Certificate.findOne({ _id: id });
            await fs.unlink(path.join(`public/${certificate.imageUrl}`));
            await certificate.remove();
            req.flash('alertMessage', 'Success Delete certificate');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/certificate');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/certificate');
        }
    },
}