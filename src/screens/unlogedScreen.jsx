import { View, StyleSheet, Text } from "react-native";
import Header from "../components/header";
import Button from "../components/button";
import AppLoading from "expo-app-loading";

const UnlogedScreen = ({ navigation }) => {
  return (
    <>
      <View style={styles.registerContainer}>
        <Text style={styles.startText}>Ops!</Text>
        <Text style={styles.explanationText}>
          Você não pode realizar esta ação sem possuir um cadastro.{" "}
        </Text>
        <Button
          label="FAZER CADASTRO"
          onPress={() => navigation.navigate("Register")}
        />
        <Text style={styles.explanationText2}>Já possui cadastro?</Text>
        <Button
          label="FAZER LOGIN"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </>
  );
};

export default UnlogedScreen;

const styles = StyleSheet.create({
  startText: {
    color: "#88C9BF",
    fontFamily: "Courgette_400Regular",
    fontSize: 53,
    fontWeight: "regular",
    textAlign: "center",
    paddingVertical: 52,
  },
  explanationText: {
    width: 250,
    color: "#757575",
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "regular",
    textAlign: "center",
    paddingBottom: 16,
  },
  registerContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  explanationText2: {
    width: 250,
    color: "#757575",
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "regular",
    textAlign: "center",
    paddingTop: 52,
    paddingBottom: 16,
  },
});
