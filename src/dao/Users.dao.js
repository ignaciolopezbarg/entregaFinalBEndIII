import userModel from "./models/User.js";

export default class Users {
    async get(params) {
        try {
            return await userModel.find(params);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            throw error; // Vuelve a lanzar el error si es necesario
        }
    }

    async getBy(params) {
        try {
            return await userModel.findOne(params);
        } catch (error) {
            console.error("Error al obtener un usuario:", error);
            throw error;
        }
    }

    async save(doc) {
        try {
            return await userModel.create(doc);
        } catch (error) {
            console.error("Error al guardar el usuario:", error);
            throw error;
        }
    }

    async update(id, doc) {
        try {
            return await userModel.findByIdAndUpdate(id, { $set: doc }, { new: true });
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            throw error;
        }
    }

    async delete(id) {
        try {
            return await userModel.findByIdAndDelete(id);
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
            throw error;
        }
    }
}
