import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import { Platform, Alert } from "react-native";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
    };
  },
});

export default function NotificationProvider({ children }) {
  useEffect(() => {
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

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
            // alert();
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
          Alert.alert(token);

          AsyncStorage.setItem("pushToken", token);

          const db = getFirestore();

          const auth = getAuth();

          const docRef = doc(collection(db, "users"), auth.currentUser.uid);

          setDoc(docRef, { pushToken: token }, { merge: true });
        })
        .catch((err) => {
          Alert.alert(err.message);
          console.log(err);
          return null;
        });
    }
  }, []);

  useEffect(() => {
    const backgroundSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("background");
        console.log(response);
      });

    const foregroundSubscription =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("foreground");
        console.log(notification);
      });
    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, []);

  return children;
}
