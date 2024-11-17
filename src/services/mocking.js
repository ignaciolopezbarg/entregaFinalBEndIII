import { faker } from "@faker-js/faker";
import { createHash } from "../utils/index.js";

class MockingService {
  static async generateMockingUsers(num) {
    const roles = ["user", "admin"];
    const users = [];

    for (let i = 0; i < num; i++) {
      const hashedPassword = await createHash("Coder123"); // Encriptar la contraseña
      const role = roles[Math.floor(Math.random() * roles.length)]; // Elegir rol aleatoriamente

      users.push({
       first_name: faker.person.firstName(),
       last_name: faker.person.lastName(),
       email: faker.internet.email(),
        password: hashedPassword,
        role: role, // Rol aleatorio
        pets: [],
      })
    }
   
console.log(users)
    return users;
  }

  static async generateMockingPets(num) {
    const pets = [];
    for (let i = 0; i < num; i++) {
      pets.push({
        name: faker.animal.dog(),
        specie: faker.animal.type(),
        adopted: false,
        birthDate: faker.date.past(),
        image: 'https://via.placeholder.com/150'
      })
    }
    console.log(pets)
    return pets;
  }
}

export default MockingService;
