const router = require('express').Router();
const adminController = require('../controllers/adminController');
const { uploadSingle, uploadMultiple } = require('../middlewares/multer');
const auth = require('../middlewares/auth');

router.get('/signin', adminController.viewSignin);
router.post('/signin', adminController.actionSignin);
router.use(auth);
router.get('/logout', adminController.actionLogout);
router.get('/dashboard', adminController.viewDashboard);
//project
router.get('/project', adminController.viewProject);
router.post('/project', uploadSingle, adminController.addProject);
router.put('/project', uploadSingle, adminController.editProject);
router.delete('/project/:id', uploadSingle, adminController.deleteProject);
//skill
router.get('/skill', adminController.viewSkill);
router.post('/skill', uploadSingle, adminController.addSkill);
router.put('/skill', uploadSingle, adminController.editSkill);
router.delete('/skill/:id', uploadSingle, adminController.deleteSkill);
//certificate
router.get('/certificate', adminController.viewCertificate);
router.post('/certificate', uploadSingle, adminController.addCertificate);
router.put('/certificate', uploadSingle, adminController.editCertificate);
router.delete('/certificate/:id', uploadSingle, adminController.deleteCertificate);
module.exports = router;