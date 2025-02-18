const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const courseController = require('../controllers/courseController');





router.post('/', teacherController.teacherCreate);  // POST /teachers/
router.get('/', teacherController.teacherGet);     // GET /teachers/
router.post('/', courseController.createCourse)
router.post('/', courseController.getCourses)
module.exports = router;
