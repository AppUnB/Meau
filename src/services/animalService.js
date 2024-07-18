import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore();

export function cadastrarAnimal(animal) {
  return addDoc(collection(db, "animais"), animal)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}
