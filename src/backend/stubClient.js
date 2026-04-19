import { STUB_ANIMAIS, STUB_USER } from "../config/runtime";

let stubAnimals = STUB_ANIMAIS.map((animal) => ({ ...animal, idDonoReal: STUB_USER.uid }));

export const stubClient = {
  async login(email) {
    return {
      user: {
        ...STUB_USER,
        email: email || STUB_USER.email,
      },
    };
  },

  async register(email, _password, nome, imageUrl) {
    return {
      user: {
        ...STUB_USER,
        email: email || STUB_USER.email,
        nome: nome || STUB_USER.nome,
        imageUrl: imageUrl || STUB_USER.imageUrl,
      },
    };
  },

  async cadastrarAnimal(animal) {
    const newAnimal = {
      ...animal,
      id: `stub-animal-${Date.now()}`,
      idDonoReal: STUB_USER.uid,
    };

    stubAnimals = [newAnimal, ...stubAnimals];
    return { id: newAnimal.id };
  },

  async listarAnimais() {
    return [...stubAnimals];
  },

  async getAnimalById(animalId) {
    return stubAnimals.find((animal) => animal.id === animalId) || null;
  },

  async deletarAnimal(animalId) {
    stubAnimals = stubAnimals.filter((animal) => animal.id !== animalId);
  },

  async listarAnimaisDoUsuario() {
    return stubAnimals.filter((animal) => animal.idDonoReal === STUB_USER.uid);
  },

  async uploadImage(uri) {
    return uri;
  },
};
