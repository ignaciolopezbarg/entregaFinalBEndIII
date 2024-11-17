import { Router } from 'express';
import mocksController from '../controllers/mocks.controller.js'

const router = Router();
//ruta para obtener mascotas
router.get('/mockingpets', mocksController.getMockingPets);

//ruta para obtener usuarios
router.get('/mockingusers', mocksController.getMockingUsers)

//crear una ruta que reciba dos parametros numericos (usuarios y mascotas) e insertarlos en la BD
router.post('/generateData', mocksController.generateData);

export default router;