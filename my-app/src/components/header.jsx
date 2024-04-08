import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faBars } from "@fortawesome/free-solid-svg-icons";

export default function Header({ turnBack = false, label }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {turnBack ? (
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{ width: 24, height: 24, color: "#434343" }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faBars}
            style={{ width: 24, height: 24, color: "#434343" }}
          />
        )}
        <Text style={styles.text}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 46,
  },
  container: {
    marginTop: 32,
    height: 49,
    backgroundColor: "#CFE9E5",
    paddingHorizontal: 20,
    width: "100%",
  },
  text: {
    color: "#434343",
    fontSize: 20,
    fontWeight: "medium",
    fontFamily: "Roboto",
  },
});
