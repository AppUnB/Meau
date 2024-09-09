import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

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

export async function listarAnimais() {
  const snapshot = await getDocs(collection(db, "animais")).catch((error) => {
    console.error("Error getting documents: ", error);
  });
  return snapshot.docs.map((doc) => doc.data());
}
