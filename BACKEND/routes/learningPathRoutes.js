const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getLearningPath, createLearningPath, getOneLearningPath, updateLearningPath, deleteLearningPath } = require('../controllers/learningPathController');
const router = express.Router();

router.use(authMiddleware);

router.get('/', getLearningPath);
router.post('/', createLearningPath);
router.get('/:id', getOneLearningPath);
router.put('/:id', updateLearningPath);
router.delete('/:id', deleteLearningPath);

module.exports = router;