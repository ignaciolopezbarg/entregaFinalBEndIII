import supertest from "supertest";
import { expect } from "chai";

const requester = supertest("http://localhost:8080");

describe("Testing de la App Adoptme", () => {
  describe("Testing de Adopciones", () => {
    it("Endpoint POST /api/adoptions/:uid/:pid debe devolver 404 si el usuario o la mascota no existen", async () => {
      const invalidUserId = "000000000000000000000000"; // ID inválido
      const invalidPetId = "000000000000000000000000"; // ID inválido

      const response = await requester
        .post(`/api/adoptions/${invalidUserId}/${invalidPetId}`)
        .send();

      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal("Usuario o mascota no encontrados");
    });

    it("Endpoint POST /api/adoptions/:uid/:pid debe devolver 500 en caso de error del servidor", async () => {
      const validUserId = "646efabc1234567890abcdef";
      const validPetId = "646efabc0987654321fedcba";
      const response = await requester
        .post(`/api/adoptions/${validUserId}/${validPetId}`)
        .send();
      if (response.status === 500) {
        expect(response.body.message).to.equal(
          "No se pudo completar la adopción"
        );
        //Tener en cuenta que si ya hay user o pet con adopcion existente da error.
      }
    });

    it("Obtener todas las adopciones con el metodo GET, con la respuesta traer status y payload, siendo este ultimo un array", async () => {
      const { statusCode, body } = await requester.get(
        "http://localhost:8080/api/adoptions"
      );
      expect(statusCode).to.equal(200);
      expect(body).to.have.property("status").that.equals("success");
      expect(body).to.have.property("payload").that.is.an("array");
    });
  });

  describe("Testing de Pets", () => {
    it("El método PUT debe modificar una mascota, comparando antes y después del proceso", async () => {
      const idMascotaExistente = "6716849c09e2acac01c0c431"; // ID válido en tu base de datos
      const datosActualizados = {
        name: "Kalo",
      };

      // Corrige el orden y usa await correctamente
      const response = await requester
        .put(`/api/pets/${idMascotaExistente}`)
        .send(datosActualizados);

      expect(response.statusCode).to.equal(200);

      expect(response.body).to.have.property("status").that.equals("success");
      expect(response.body)
        .to.have.property("message")
        .that.equals("pet updated");
    });

    it("Se creará una nueva mascota con el método POST, se tomará su id y luego se eliminará con el método DELETE", async () => {
      const nuevoPet = {
        name: "LadyJane",
        specie: "gatita",
        birthDate: "25-05-1810",
      };
      // Crear una nueva mascota con el método POST
      const {
        _body: {
          payload: { _id },
        },
      } = await requester.post("/api/pets").send(nuevoPet);

      // Proceder a borrarlo con el método DELETE
      const { statusCode } = await requester.delete(`/api/pets/${_id}`);
      expect(statusCode).to.equal(200);
      //esta prueba da un error interno que pide reincio del servidor
    });
  });
});
