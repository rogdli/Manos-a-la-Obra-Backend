const Project = require('../model/Project');
const Epic = require('../model/Epic');

// Para que existan proyectos vía Postman. La consigna no pedía crear proyectos por lo que entendí.

exports.createProject = async (req, res) => {
    try {
        const { name, description, icon, members } = req.body;
        
        // El usuario autenticado se convierte en el dueño por default.
        const ownerId = req.user.userId;

        // Me tuve que asegurar que el dueño se incluya en miembros por las dudas.
        const projectMembers = members 
            ? Array.from(new Set([...members, ownerId])) // Remover duplicados.
            : [ownerId];

        const newProject = new Project({
            name,
            description,
            icon,
            owner: ownerId,
            members: projectMembers
        });

        // Proyecto se guarda.
        const savedProject = await newProject.save();

        res.status(201).json(savedProject);
    } catch (err) {
        // 500 -> Serv. no pudo completar solicitud.
        res.status(500).json({ 
            message: "Error creating the project", 
            error: err.message 
        });
    }
};

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find(); 
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.json(project);
    } catch (err) {
        console.error("Error  fetching project by ID:", err);
        res.status(500).json({ message: err.message });
    }
};

exports.getProjectEpics = async (req, res) => {
    try {
        console.log('Error fetching epics by project:', req.params.id);
        const project = await Project.findById(req.params.id);
        console.log('Project found:', project);
        const epics = await Epic.find({ project: project._id });
        console.log('Epics found:', epics);
        res.json(epics);
    } catch (err) {
        console.error('Error fetching epics:', err);
        res.status(500).json({ message: err.message });
    }
};