import Adoption from "../src/dao/Adoption.dao.js";
import mongoose from "mongoose";
// importamos modulo nativo de node js que permite realizar validaciones
import assert from "assert";

mongoose.connect(
  "mongodb+srv://nacho:holanacho@cluster0.g6mfb4u.mongodb.net/adoptme?retryWrites=true&w=majority&appName=Cluster0"
);

describe("Testeamos el DAO de Adoption", function () {
  before(function () {
    this.adoptionDao = new Adoption();
  });

  this.beforeEach(async function () {
    await mongoose.connection.collections.adoptions.drop();
  });

  it("El get de adoptions me debe retornar un array", async function () {
    const resultado = await this.adoptionDao.get();
    assert.strictEqual(Array.isArray(resultado), true);
  });

  it("Debe crear una nueva adopción con owner y pet", async function () {
    const ownerId = new mongoose.Types.ObjectId(); // Simula un ID de usuario
    const petId = new mongoose.Types.ObjectId(); // Simula un ID de mascota

    // Crear una nueva adopción usando el método save
    const nuevaAdopcion = await this.adoptionDao.save({
      owner: ownerId,
      pet: petId,
    });

    // Validar que la adopción se creó correctamente
    assert.strictEqual(nuevaAdopcion.owner.toString(), ownerId.toString());
    assert.strictEqual(nuevaAdopcion.pet.toString(), petId.toString());
    assert.ok(nuevaAdopcion._id, "Debe retornar un _id generado por MongoDB");

    // Verificar que está en la base de datos
    const todasAdopciones = await this.adoptionDao.get({});
    const adopcionCreada = todasAdopciones.find(
      (adopcion) => adopcion._id.toString() === nuevaAdopcion._id.toString()
    );
    assert.ok(adopcionCreada, "La adopción debería estar en la lista");
  });

  it("Debe obtener una adopción existente por su _id", async function () {
    // Insertamos una adopción de prueba y obtenemos su ID
    const ownerId = new mongoose.Types.ObjectId();
    const petId = new mongoose.Types.ObjectId();

    const nuevaAdopcion = await this.adoptionDao.save({
      owner: ownerId,
      pet: petId,
    });

    const adoptionId = nuevaAdopcion._id.toString(); // El _id insertado

    console.log("Buscando adopción con _id:", adoptionId);

    // Verifica que el _id sea un ObjectId
    const adoptionIdObject = new mongoose.Types.ObjectId(adoptionId);

    // Realiza la búsqueda por _id
    const adopcionEncontrada = await this.adoptionDao.getBy({ _id: adoptionIdObject });

    console.log("Resultado de la búsqueda:", adopcionEncontrada);

    // Validaciones utilizando assert
    assert(adopcionEncontrada !== null, 'La adopción no fue encontrada');
    assert.strictEqual(adopcionEncontrada._id.toString(), adoptionId, 'Los _id no coinciden');

    console.log("La prueba pasó con éxito.");
});
  
  after(async function () {
    await mongoose.disconnect();
  });
});
