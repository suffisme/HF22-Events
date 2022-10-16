const express = require('express');
const router = express.Router();

const bugController = require('../controller/bug');


router.post('/addBug', bugController.postBug);

router.post('/deleteBug', bugController.deleteBug);

router.post('/verifyBug', bugController.verifyBug   );

router.post('/getBug', bugController.getBug);

router.get('/getUserReportedBugs', bugController.getUserReportedBugs);

router.get('/getTesterPendingBugs', bugController.getTesterPendingBugs);

router.get('/getDeveloperPendingBugs', bugController.getDeveloperPendingBugs);

router.get('/getTesterVerificationPendingBugs', bugController.getTesterVerificationPendingBugs);

router.get('/getDeveloperUnworkedBugs', bugController.getDeveloperUnworkedBugs);

router.post('/rollBackToDev', bugController.rollBackToDev);

router.get('/getTesterApprovalPendingBugs', bugController.getTesterApprovalPendingBugs);



module.exports = router;