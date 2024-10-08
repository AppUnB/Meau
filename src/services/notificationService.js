import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export function saveUserNotificationToken() {
  if (Device.isDevice) {
    Notifications.getPermissionsAsync()
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          return Notifications.requestPermissionsAsync();
        }
        return statusObj;
      })
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          throw new Error("Permission not granted.");
        }
      })
      .then(() => {
        return Notifications.getExpoPushTokenAsync({
          projectId: "992c0279-203c-479c-af8f-bfbf1e0210c5",
        });
      })
      .then((response) => {
        const token = response.data;

        const db = getFirestore();

        const auth = getAuth();

        const docRef = doc(collection(db, "users"), auth.currentUser.uid);

        setDoc(docRef, { pushToken: token }, { merge: true }).catch((error) => {
          console.error("Error adding document: ", error);
        });
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }
}

export function enviarNotificacao(token, title, message) {
  console.log(token, title, message);
  fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: token,
      title: title,
      body: message,
    }),
  });
}
