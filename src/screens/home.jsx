import { View, StyleSheet, Text, Image } from "react-native";
import Header from "../components/header";
import Button from "../components/button";
import AppLoading from "expo-app-loading";
import { useFonts, Courgette_400Regular } from "@expo-google-fonts/courgette";

const Home = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Courgette_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <Header label="Home" turnBack={false} />
        <View style={styles.registerContainer}>
          <Text style={styles.startText}>Olá!</Text>
          <Text style={{ ...styles.explanationText, paddingBottom: 48 }}>
            Bem vindo ao Meau! {"\n"} Aqui você pode adotar, doar e ajudar cães
            e gatos com facilidade. {"\n"}Qual o seu interesse?
          </Text>
          <View style={{ flexDirection: "col", gap: 12 }}>
            <Button
              label="ADOTAR"
              backgroundColor="#fdcf58"
              onPress={() => navigation.navigate("UnlogedScreen")}
            />
            <Button
              label="AJUDAR"
              backgroundColor="#fdcf58"
              onPress={() => navigation.navigate("UnlogedScreen")}
            />
            <Button
              label="CADASTRAR ANIMAL"
              backgroundColor="#fdcf58"
              onPress={() => navigation.navigate("UnlogedScreen")}
            />
          </View>
          <Text
            style={styles.explanationText2}
            onPress={() => navigation.navigate("Login")}
          >
            Já possui cadastro?
          </Text>
          <Image
            source={require("../assets/Meau_marca_2.png")}
            style={{
              width: 100,
              height: 100,
              resizeMode: "contain",
            }}
          />
        </View>
      </>
    );
  }
};

export default Home;

const styles = StyleSheet.create({
  startText: {
    color: "#fdcf58",
    fontFamily: "Courgette_400Regular",
    fontSize: 72,
    fontWeight: "regular",
    textAlign: "center",
    paddingVertical: 56,
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
