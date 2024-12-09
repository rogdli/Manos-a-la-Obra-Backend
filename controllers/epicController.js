const Epic = require('../model/Epic');
const Story = require('../model/Story');
const mongoose = require('mongoose');

// Crear épica - más que nada para el Postman.

exports.createEpic = async (req, res) => {
    // Cumple con el modelo...
    const { project, name, description, icon } = req.body;
    const epic = new Epic({ project, name, description, icon });
  
    try {
      const newEpic = await epic.save();
      // 201 -> Solicitud se procesó correctamente y se creó una épica.
      res.status(201).json(newEpic);
    } catch (err) {
      // 400 -> Problema con la solicitud.
      res.status(400).json({ message: err.message });
    }
};

exports.getAllEpics = async (req, res) => {
    try {
        const epics = await Epic.find();
        res.json(epics);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getEpicById = async (req, res) => {
    try {
        const epic = await Epic.findById(req.params.epicId);
        if (!epic) {
            return res.status(404).json({ message: 'Epic not found' });
        }
        res.json(epic);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Más legible sería: get Epics' Stories.

exports.getEpicStories = async (req, res) => {
    const { epicId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(epicId)) {
        return res.status(400).json({ message: "Epic ID isn't valid" });
    }
    
    try {
        const stories = await Story.find({ Epic: epicId });
        console.log("Stories fetched:", stories);
        res.json(stories);
    } catch (err) {
        console.error("Error fetching stories:", err.message);
        res.status(500).json({ message: "Server internal error" });
    }
};