import { backendClient } from "../backend/client";

export function cadastrarAnimal(animal) {
  return backendClient.cadastrarAnimal(animal)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      throw error;
    });
}

export async function listarAnimais() {
  return backendClient.listarAnimais().catch((error) => {
    console.error("Error getting documents: ", error);
    throw error;
  });
}

export async function getAnimalById(animalId) {
  const animal = await backendClient.getAnimalById(animalId);

  if (!animal) {
    console.error("No such document!");
    return null;
  }

  return animal;
}

export async function deletarAnimal(animalId) {
  return backendClient
    .deletarAnimal(animalId)
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
      throw error;
    });
}

export async function listarAnimaisDoUsuario() {
  try {
    return await backendClient.listarAnimaisDoUsuario();
  } catch (error) {
    console.error("Erro ao obter os animais do usuário: ", error);
    throw error;
  }
}
