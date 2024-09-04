import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "./firebaseUtils";

function login(email, password) {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
}

async function register(email, password) {
  const auth = getAuth();
  user = await createUserWithEmailAndPassword(auth, email, password);
  if (!user) {
    return null;
  }
  // create a register in users collection
  const db = getFirestore();

  const docRef = doc(collection(db, "users"));
  setDoc(docRef, {
    id: user.uid,
    email: email,
    nome: user.email.split("@")[0],
  }).catch((error) => {
    console.error("Error adding creating user: ", error);
  });
}

export { login, register };
