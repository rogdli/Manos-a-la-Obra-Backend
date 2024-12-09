// 1. Dependencias - imports.

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Carga la variable de entorno desde .env
console.log(process.env.JWT_SECRET);  // ...Debería mostrar clavesecreta en el archivo .env


// 2. Inicializar app.

const app = express();
// Puerto en el que correrá el servidor.
const PORT = 3000;

// 3. Middlewares globales.

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Origen permitido (frontend)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  //Seguramente ese 'auth' no sea necesario en lo absoluto.
  allowedHeaders: ['Content-Type', 'Authorization', 'auth']
}));

// Middleware de registro de solicitudes (logging)

app.use((req, res, next) => {
  // Imprimo método y URL de cada solicitud. Sirve mucho.
  console.log(`${req.method} ${req.url}`);
  // Continúa con el siguiente middleware.
  next(); 
});

// 4. Conexión a la BD.

// No debería exponer credenciales directamente en el código, pero bueno.
// Lo de esta línea podría haberse resuelto mejor. Intenta usar MONGO_URI del archivo .env. No lo encuentra porque no lo coloqué en ese archivo, por lo que usa una URI por defecto.
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://OmarVillegas:pobrediabla@normandy.p7oeo.mongodb.net/");

const db = mongoose.connection;
db.on('error', (error) => console.error(error)); // Registra errores de conexión.
db.once('open', () => console.log('Connected to Database!'));

// 5. Definición de rutas.

// Importar los routers para diferentes recursos de la API.

const usersRouter = require('./routes/Users');
const authRoutes = require('./routes/Routes');

const projectsRouter = require('./routes/Projects');
const epicsRouter = require('./routes/Epics');
const storiesRouter = require('./routes/Stories');
const tasksRouter = require('./routes/Tasks');

// Configurar los endpoints de la API.
app.use('/api', authRoutes); // Esto incluye /api/login
app.use('/api/users', usersRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/epics', epicsRouter);
app.use('/api/stories', storiesRouter);
app.use('/api/tasks', tasksRouter);

// 6. Iniciar servidor
app.listen(PORT, () => {
  console.log(`The server is ready! http://localhost:${PORT}`);
});
