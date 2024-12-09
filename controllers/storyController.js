const Story = require('../model/Story');
const Task = require('../model/Task');
const mongoose = require('mongoose');

// Crear historia.

exports.createStory = async (req, res) => {
    const {title, description, points, status, epic} = req.body;
    const story = new Story({title, description, points, status, epic});

    try {
        const newStory = await story.save();
        res.status(201).json(newStory);
    } catch(err) {
        res.status(400).json({ message: err.message});
    }
};

// Historias de usuario -MyStories-

exports.getUserStories = async (req, res) => {
    try {
        const userId = req.user.userId;
        console.log("User ID:", userId);
        const stories = await Story.find({ 
            assignedTo: { $in: [userId] } 
        });
        console.log("Stories found:", stories);
    
        res.json({ 
            data: stories,
            success: true 
        });
    } catch(err) {
        console.error("Error fetching user stories:", err);
        res.status(500).json({ 
            message: "Server internal error", 
            success: false 
        });
    }
};

exports.getStoryById = async (req, res) => {
    try {
        const story = await Story.findById(req.params.storyId);
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }
        res.json(story);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getStoryTasks = async (req, res) => {
    const { storyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(storyId)) {
        return res.status(400).json({ message: "Story ID not valid" });
    }
    
    try {
        const tasks = await Task.find({ Story: storyId });
        console.log("Tasks fetched:", tasks);
        res.json(tasks);
    } catch (err) {
        console.error("Error fetching tasks:", err.message);
        res.status(500).json({ message: "Server internal error" });
    }
};

exports.createStoryTask = async (req, res) => {
    const { storyId } = req.params;
    const { name, description, created, dueDate, done } = req.body;

    // Verificar si el ID de la historia es válido.

    if (!mongoose.Types.ObjectId.isValid(storyId)) {
        return res.status(400).json({ message: 'Story ID not valid' });
    }

    try {
        const story = await Story.findById(storyId);
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }

        const task = new Task({
            name,
            description,
            Story: storyId, 
            created,
            dueDate,
            done,
        });

        // Guardar la tarea nueva.
        const newTask = await task.save();
        res.status(201).json(newTask);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteStoryTask = async (req, res) => {
    const { storyId, taskId } = req.params;

    // Si el ID de la historia y el ID de la tarea no son válidos...
    if (!mongoose.Types.ObjectId.isValid(storyId) || !mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({ message: 'Story ID or task not valid' });
    }

    try {
        const story = await Story.findById(storyId);
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }

        const task = await Task.findOneAndDelete({ 
            _id: taskId, 
            Story: storyId 
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found or it doesnt belong to this story' });
        }

        res.json({ message: 'Task successfully deleted' });
    } catch (err) {
        console.error("Error deleting task:", err);
        res.status(500).json({ message: 'Server internal error' });
    }
};