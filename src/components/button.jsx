import React from "react";
import { Text, Pressable, StyleSheet, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function Button({
  label,
  onPress,
  backgroundColor = "#88C9BF",
  textColor = "#434343",
  Icon,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, { backgroundColor: backgroundColor }]}
    >
      <View style={styles.content}>
        {Icon && <FontAwesomeIcon icon={Icon} style={styles.icon} />}
        <Text style={[styles.text, { color: textColor }]}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 232,
    height: 40,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 12,
    fontFamily: "Roboto",
    fontWeight: "regular",
    textAlign: "center",
  },
  icon: {
    marginRight: 5,
    color: "white",
  },
});
