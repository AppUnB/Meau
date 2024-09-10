import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "./firebaseUtils";
import { saveUserNotificationToken } from "./notificationService";

async function login(email, password) {
  const auth = getAuth();
  const user = await signInWithEmailAndPassword(auth, email, password);

  saveUserNotificationToken();
  return user;
}

async function register(email, password) {
  const auth = getAuth();
  authData = await createUserWithEmailAndPassword(auth, email, password);
  if (!authData) {
    throw new Error("Erro ao criar usuário");
  }
  // create a register in users collection
  const db = getFirestore();

  const docRef = doc(collection(db, "users"), authData.user.uid);

  const payload = {
    email: email,
    nome: email.split("@")[0],
  };

  setDoc(docRef, payload).then(() => {
    saveUserNotificationToken();
  });
}

export { login, register };
