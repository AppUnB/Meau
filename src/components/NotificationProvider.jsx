import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { Platform } from "react-native";

if (Platform.OS !== "web") {
  Notifications.setNotificationHandler({
    handleNotification: async () => {
      return {
        shouldShowAlert: true,
      };
    },
  });
}

export default function NotificationProvider({ children }) {
  useEffect(() => {
    if (Platform.OS === "web") return;

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    const backgroundSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {});

    const foregroundSubscription =
      Notifications.addNotificationReceivedListener((notification) => {});
    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, []);

  return children;
}
