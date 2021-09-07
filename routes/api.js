const router = require('express').Router();
const apiController = require('../controllers/apiController');
const { uploadSingle } = require('../middlewares/multer');

router.get('/project', apiController.Project);
router.get('/skill', apiController.Skill);
router.get('/certificate', uploadSingle, apiController.Certificate);
module.exports = router;
