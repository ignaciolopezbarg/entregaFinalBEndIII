import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Cargo las variables de entorno desde el archivo .env
dotenv.config();
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Conectados a la BD'))
  .catch((error) => console.log('Error al conectarnos:', error));