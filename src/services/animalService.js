import { getFirestore, collection, query, where, addDoc, getDocs, doc, getDoc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();

export function cadastrarAnimal(animal) {
  const auth = getAuth();
  const db = getFirestore();
  const userRef = doc(db, "users", auth.currentUser.uid);

  return addDoc(collection(db, "animais"), {...animal, idDono: userRef})
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

export async function deletarAnimal(animalId) {
  const animalDoc = doc(db, "animais", animalId);
  return deleteDoc(animalDoc)
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
}

export async function listarAnimaisDoUsuario() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Usuário não autenticado.");
  }

  try {
    const q = query(collection(db, "animais"), where("idDono", "==", doc(db, "users", user.uid)));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Erro ao obter os animais do usuário: ", error);
    throw error;
  }
}