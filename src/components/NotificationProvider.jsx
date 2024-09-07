import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

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
