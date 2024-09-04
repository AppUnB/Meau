import { getFirestore, collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";

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
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getAnimalById(animalId) {
  const animalDoc = doc(db, "animais", animalId);
  const snapshot = await getDoc(animalDoc);

  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() };
  } else {
    console.error("No such document!");
    return null;
  }
}
