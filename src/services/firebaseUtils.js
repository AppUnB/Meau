import { getApp, initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    initializeAuth,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { USE_STUB_BACKEND } from "../config/runtime";

const parseLegacyFirebaseConfig = () => {
  const rawConfig = process.env.REACT_APP_FIREBASE_CONFIG;

  if (!rawConfig) {
    return {};
  }

  try {
    return JSON.parse(rawConfig);
  } catch (error) {
    console.warn("Invalid REACT_APP_FIREBASE_CONFIG JSON", error);
    return {};
  }
};

const legacyConfig = parseLegacyFirebaseConfig();

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY || legacyConfig.apiKey,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN || legacyConfig.authDomain,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID || legacyConfig.projectId,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET || legacyConfig.storageBucket,
  messagingSenderId:
    process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID || legacyConfig.messagingSenderId,
  appId: process.env.EXPO_PUBLIC_APP_ID || legacyConfig.appId,
};

const missingRequiredConfig = [
  "apiKey",
  "authDomain",
  "projectId",
  "storageBucket",
  "messagingSenderId",
  "appId",
].filter((key) => !firebaseConfig[key]);

if (missingRequiredConfig.length) {
  if (USE_STUB_BACKEND) {
    console.warn(
      "Running in stub mode without Firebase credentials. Using demo config."
    );
  } else {
    throw new Error(
      `Missing Firebase config: ${missingRequiredConfig.join(", ")}. Configure EXPO_PUBLIC_* variables in .env or provide REACT_APP_FIREBASE_CONFIG.`
    );
  }
}

const effectiveFirebaseConfig = USE_STUB_BACKEND
  ? {
      apiKey: firebaseConfig.apiKey || "demo-api-key",
      authDomain: firebaseConfig.authDomain || "demo.firebaseapp.com",
      projectId: firebaseConfig.projectId || "demo-project",
      storageBucket: firebaseConfig.storageBucket || "demo.appspot.com",
      messagingSenderId: firebaseConfig.messagingSenderId || "000000000000",
      appId: firebaseConfig.appId || "1:000000000000:web:demo",
    }
  : firebaseConfig;

const app = initializeApp(effectiveFirebaseConfig);

const auth = initializeAuth(app);
const storage = getStorage(app);

export {
    app,
    auth, createUserWithEmailAndPassword, getApp,
    getAuth, getDownloadURL, ref, signInWithEmailAndPassword,
    storage, uploadBytes
};

