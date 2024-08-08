import { TextInput, StyleSheet, View } from "react-native";
import React from "react";

export default function Textfield({ onChangeText, secureTextEntry, value, placeholder }) {
  return (
    <View>
      <TextInput
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        style={styles.input}
        placeholder={placeholder}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 45,
    width: 312,
    backgroundColor: "transparent",
    borderBottomColor: "#BDBDBD",
    borderBottomWidth: 1,
    color: "black",
    fontSize: 14,
    opacity: 0.7,
    paddingLeft: 14
  }
});