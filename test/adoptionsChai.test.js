import mongoose from "mongoose";
import Adoption from "../src/dao/Adoption.dao.js";
import {expect} from 'chai';

mongoose.connect("mongodb+srv://nacho:holanacho@cluster0.g6mfb4u.mongodb.net/adoptme?retryWrites=true&w=majority&appName=Cluster0");

describe("Testeamos el DAO de Adoption, ahora con Chai", function () {
    before(function () {
      this.adoptionDao = new Adoption();
    });
  
    this.beforeEach(async function () {
      await mongoose.connection.collections.adoptions.drop();
    })

    it('El get de Adoptions retorna un array', async function(){
        const resultadoChai = await this.adoptionDao.get();
        expect(Array.isArray(resultadoChai)).to.be.true;
    })

    it("Debe crear una nueva adopción con owner (uid) y pet (pid)", async function () {
        const ownerId = new mongoose.Types.ObjectId(); 
        const petId = new mongoose.Types.ObjectId(); 
      
        const nuevaAdopcion = await this.adoptionDao.save({
          owner: ownerId,
          pet: petId,
        });
      
        // Validar que la adopción se creó correctamente
        expect(nuevaAdopcion.owner.toString()).to.equal(ownerId.toString());
        expect(nuevaAdopcion.pet.toString()).to.equal(petId.toString());
        expect(nuevaAdopcion).to.have.property("_id").that.is.not.null;
      
        // Verificar que está en la base de datos
        const todasAdopciones = await this.adoptionDao.get({});
        const adopcionCreada = todasAdopciones.find(
          (adopcion) => adopcion._id.toString() === nuevaAdopcion._id.toString()
        );
        expect(adopcionCreada).to.not.be.undefined; 
      });

      it("Debe obtener una adopción existente por su _id", async function () {
        // Insertamos una adopción de prueba y obtenemos su ID
        const ownerId = new mongoose.Types.ObjectId();
        const petId = new mongoose.Types.ObjectId();
    
        const nuevaAdopcion = await this.adoptionDao.save({
          owner: ownerId,
          pet: petId,
        });
    
        const adoptionId = nuevaAdopcion._id.toString(); 
    
        console.log("Buscando adopción con _id:", adoptionId);
    
        const adoptionIdObject = new mongoose.Types.ObjectId(adoptionId);
    
        const adopcionEncontrada = await this.adoptionDao.getBy({ _id: adoptionIdObject });
    
        console.log("Resultado de la búsqueda:", adopcionEncontrada);
    
        // Validaciones utilizando Chai
        expect(adopcionEncontrada).to.not.be.null;
        expect(adopcionEncontrada._id.toString()).to.equal(adoptionId); 
    
        console.log("La prueba pasó con éxito.");
    });
    

      after(async function () {
        await mongoose.disconnect();
      });
    })