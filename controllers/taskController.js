const Story = require('../model/Story');
const Task = require('../model/Task');

// Acá fue más que nada para cargar historias via Postman. 

exports.createTask = async (req, res) => {
    const { name, description, Story, created, dueDate, done } = req.body;
    if (!Story) {
        return res.status(400).json({ message: 'Story ID is required' });
    }
    const task = new Task({name, description, Story, created, dueDate, done});

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};