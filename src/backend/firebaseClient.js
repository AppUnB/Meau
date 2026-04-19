import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
} from "firebase/auth";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import "../services/firebaseUtils";
import { saveUserNotificationToken } from "../services/notificationService";

export const firebaseClient = {
  async login(email, password) {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    saveUserNotificationToken();
    return userCredential;
  },

  async register(email, password, nome, imageUrl) {
    const auth = getAuth();
    const authData = await createUserWithEmailAndPassword(auth, email, password);

    if (!authData) {
      throw new Error("Erro ao criar usuário");
    }

    const db = getFirestore();
    const docRef = doc(collection(db, "users"), authData.user.uid);
    const payload = {
      email,
      nome,
      imageUrl,
    };

    await setDoc(docRef, payload);
    saveUserNotificationToken();

    return authData;
  },

  async cadastrarAnimal(animal) {
    const auth = getAuth();
    const db = getFirestore();

    if (!auth.currentUser) {
      throw new Error("Usuário não autenticado.");
    }

    const userRef = doc(db, "users", auth.currentUser.uid);
    const docRef = await addDoc(collection(db, "animais"), {
      ...animal,
      idDono: userRef,
    });

    return docRef;
  },

  async listarAnimais() {
    const db = getFirestore();
    const snapshot = await getDocs(collection(db, "animais"));
    return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
  },

  async getAnimalById(animalId) {
    const db = getFirestore();
    const animalDoc = doc(db, "animais", animalId);
    const snapshot = await getDoc(animalDoc);

    if (!snapshot.exists()) {
      return null;
    }

    return { id: snapshot.id, ...snapshot.data() };
  },

  async deletarAnimal(animalId) {
    const db = getFirestore();
    const animalDoc = doc(db, "animais", animalId);
    await deleteDoc(animalDoc);
  },

  async listarAnimaisDoUsuario() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("Usuário não autenticado.");
    }

    const db = getFirestore();
    const q = query(
      collection(db, "animais"),
      where("idDono", "==", doc(db, "users", user.uid))
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
  },

  async uploadImage(uri, path) {
    const storage = getStorage();
    const storageRef = ref(storage, path);

    const response = await fetch(uri);
    const blob = await response.blob();

    await uploadBytes(storageRef, blob);

    return getDownloadURL(storageRef);
  },
};
