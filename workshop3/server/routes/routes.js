const express = require('express');
const router = express.Router();
const teacherController = require('./controllers/teacherController');

router.post('/teachers', teacherController.createTeacher);
router.get('/teachers', teacherController.getTeachers);
router.put('/teachers/:id', teacherController.updateTeacher);
router.delete('/teachers/:id', teacherController.deleteTeacher);

module.exports = router;
