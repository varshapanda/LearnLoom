const LearningPath = require("../model/learningPath.js");

const getLearningPath = async (req, res) => {
  try {
    const learningPaths = await LearningPath.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .select(
        "title description difficulty estimatedDuration progressPercentage completedSteps totalSteps isCompleted createdAt updatedAt"
      );

    return res.status(200).json({
      success: true,
      count: learningPaths.length,
      data: learningPaths,
    });
  } catch (err) {
    console.error("Get learning paths error: ", err);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching learning paths",
    });
  }
};

const createLearningPath = async (req, res) => {
  try {
    const { title, description, difficulty, estimatedDuration, steps } =
      req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }
    if (!steps || steps.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one learning step is required",
      });
    }
    const newLearningPath = new LearningPath({
      userId: req.user._id,
      title: title.trim(),
      description: description.trim(),
      difficulty: difficulty || "beginner",
      estimatedDuration: estimatedDuration || "4 weeks",
      steps: steps.map((step, index) => ({
        stepNumber: index + 1,
        title: step.title.trim(),
        description: step.description.trim(),
        estimatedHours: step.estimatedHours || 2,
        resources: step.resources || [],
        completed: false,
      })),
    });
    await newLearningPath.save();
    return res.status(201).json({
      success: true,
      message: "Learning path successfully created",
      data: newLearningPath,
    });
  } catch (error) {
    console.error("Create learning path error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating learning path",
    });
  }
};

const getOneLearningPath = async (req, res) => {
  try {
    const learningPath = await LearningPath.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!learningPath) {
      return res.status(404).json({
        success: false,
        message: 'Learning path not found'
      });
    }

    res.status(200).json({
      success: true,
      data: learningPath
    });

  } catch (error) {
    console.error('Get learning path error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Learning path not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while fetching learning path'
    });
  }
};


const updateLearningPath = async (req, res) => {
  try {
    const { title, description, steps, markStepComplete, stepId } = req.body;

    let learningPath = await LearningPath.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!learningPath) {
      return res.status(404).json({
        success: false,
        message: 'Learning path not found'
      });
    }

    // Handle marking step as complete/incomplete
    if (markStepComplete !== undefined && stepId) {
      const stepIndex = learningPath.steps.findIndex(
        step => step._id.toString() === stepId
      );

      if (stepIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Step not found'
        });
      }

      learningPath.steps[stepIndex].completed = markStepComplete;
      learningPath.steps[stepIndex].completedAt = markStepComplete ? new Date() : null;

      await learningPath.save(); // This will trigger the pre-save middleware to update progress

      return res.status(200).json({
        success: true,
        message: `Step ${markStepComplete ? 'completed' : 'marked as incomplete'}`,
        data: learningPath
      });
    }

    // Handle updating learning path content
    if (title !== undefined) learningPath.title = title.trim();
    if (description !== undefined) learningPath.description = description.trim();
    
    if (steps && Array.isArray(steps)) {
      learningPath.steps = steps.map((step, index) => ({
        stepNumber: index + 1,
        title: step.title.trim(),
        description: step.description.trim(),
        estimatedHours: step.estimatedHours || 2,
        resources: step.resources || [],
        completed: step.completed || false,
        completedAt: step.completed && step.completedAt ? step.completedAt : null
      }));
    }

    await learningPath.save();

    res.status(200).json({
      success: true,
      message: 'Learning path updated successfully',
      data: learningPath
    });

  } catch (error) {
    console.error('Update learning path error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Learning path not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating learning path'
    });
  }
};


const deleteLearningPath = async (req, res) => {
  try {
    const learningPath = await LearningPath.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!learningPath) {
      return res.status(404).json({
        success: false,
        message: 'Learning path not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Learning path deleted successfully'
    });

  } catch (error) {
    console.error('Delete learning path error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Learning path not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while deleting learning path'
    });
  }
};

module.exports = {getLearningPath, createLearningPath, getOneLearningPath, updateLearningPath, deleteLearningPath};
