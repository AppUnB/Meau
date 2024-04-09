import { View, StyleSheet } from "react-native";
import Header from "../components/header";
import Textfield from "../components/textField";
import Button from "../components/button";
import { faSquareFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";

const Login = ({ navigation }) => {
  return (
    <>
      <Header label="Login" />
      <View style={styles.homeContainer}>
        <View style={styles.fieldsContainer}>
          <Textfield placeholder="Nome de usuário" secureTextEntry={true} />
          <Textfield placeholder="Senha" secureTextEntry={true} />
        </View>
        <Button label="ENTRAR" />
        <View style={styles.platformsContainer}>
          <Button
            label="ENTRAR COM O FACEBOOK"
            backgroundColor="#124F7C"
            textColor="#ffffff"
            Icon={faSquareFacebook}
          />
          <Button
            label="ENTRAR COM O GOOGLE"
            backgroundColor="#F15F5C"
            textColor="#ffffff"
            Icon={faGoogle}
          />
        </View>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 52,
    paddingTop: 64,
    gap: 20,
  },
  fieldsContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    paddingBottom: 64,
  },
  platformsContainer: {
    marginTop: 72,
    gap: 8,
  },
});
