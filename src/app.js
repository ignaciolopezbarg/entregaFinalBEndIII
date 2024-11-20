import express from 'express';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import './database.js';
import dotenv from 'dotenv';
dotenv.config()

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const app = express();
const PORT = process.env.PORT||3000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks',mocksRouter);

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))

const swaggerOptions = {
    definition: {
        openapi: "3.0.1", 
        info: {
            title: "Documentación de la App Adoptame",
            description: "App dedicada a la adopcion de mascotas abandonadas"
        }
    },
    apis: ["./src/docs/**/*.yaml"]
}

//4) Conectamos Swagger a nuestro servidor de Express: 

const specs = swaggerJSDoc(swaggerOptions);

app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs)); 