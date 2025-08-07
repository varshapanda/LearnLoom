const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');
const{ 
    getUserProfile, 
    updateUserProfile, 
    deleteUserProfile, 
    updatePassword 
} = require('../controllers/userController');

router.use(authMiddleware);

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.put('/password', updatePassword);
router.delete('/account', deleteUserProfile);

module.exports = router;