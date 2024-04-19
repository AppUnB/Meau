import { initializeApp, getApp } from "firebase/app";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBVLeDwI7P7R5j2cH_3A-B6eW00W9J0DgQ",
  authDomain: "meau-53b06.firebaseapp.com",
  projectId: "meau-53b06",
  storageBucket: "meau-53b06.appspot.com",
  messagingSenderId: "499655111951",
  appId: "1:499655111951:web:724469535e93549c0efa7a",
  measurementId: "G-DQXY9GXD71",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export {
  app,
  auth,
  getApp,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
};
