// import petModel from "./models/Pet.js";

// export default class Pet {

//     get = (params) =>{
//         return petModel.find(params)
//     }

//     getBy = (params) =>{
//         return petModel.findOne(params);
//     }

//     save = (doc) =>{
//         return petModel.create(doc);
//     }

//     update = (id,doc) =>{
//         return petModel.findByIdAndUpdate(id,{$set:doc})
//     }

//     delete = (id) =>{
//         return petModel.findByIdAndDelete(id);
//     }
// }

import petModel from "./models/Pet.js";

export default class Pet {
    async get(params) {
        try {
            return await petModel.find(params);
        } catch (error) {
            console.error("Error al obtener mascotas:", error);
            throw error; // Lanza el error si es necesario
        }
    }

    async getBy(params) {
        try {
            return await petModel.findOne(params);
        } catch (error) {
            console.error("Error al obtener una mascota:", error);
            throw error; // Lanza el error si es necesario
        }
    }

    async save(doc) {
        try {
            const savedPet = await petModel.create(doc);
            console.log("Mascota guardada:", savedPet); // Para verificar el documento guardado
            return savedPet;
        } catch (error) {
            console.error("Error al guardar la mascota:", error);
            throw error; // Lanza el error si es necesario
        }
    }

    async update(id, doc) {
        try {
            const updatedPet = await petModel.findByIdAndUpdate(id, { $set: doc }, { new: true });
            return updatedPet;
        } catch (error) {
            console.error("Error al actualizar la mascota:", error);
            throw error; // Lanza el error si es necesario
        }
    }

    async delete(id) {
        try {
            const deletedPet = await petModel.findByIdAndDelete(id);
            return deletedPet;
        } catch (error) {
            console.error("Error al eliminar la mascota:", error);
            throw error; // Lanza el error si es necesario
        }
    }
}
