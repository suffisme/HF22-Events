const express = require('express');
const router = express.Router();

const userController = require('../controller/user');


router.get('/getUnassignedUsers', userController.getUnassignedUsers);

router.get('/getTester', userController.getTester);

router.get('/getDeveloper', userController.getDeveloper);

router.post('/assignRole', userController.assignRole);

router.post('/deleteUser', userController.deleteUser);

router.post('/AssignBugToTester', userController.assignBugToTester);

router.post('/AssignBugToDeveloper', userController.assignBugToDeveloper);


module.exports = router;