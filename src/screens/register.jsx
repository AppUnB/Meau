import { View, StyleSheet, Text, ScrollView } from "react-native";
import Header from "../components/header";
import Textfield from "../components/textField";
import Button from "../components/button";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { signUp } from "../../services/auth";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleCadastro() {
    if (password === confirmPassword) {
      const user = await signUp(email, password);
      if (user) {
        navigation.navigate("Login");
      }
    }
  }

  return (
    <>
      <Header label="Cadastro Pessoal" />
      <ScrollView contentContainerStyle={styles.registerContainer}>
        <Text style={styles.startText}>
          As informações preenchidas serão divulgadas apenas para a pessoa com a
          qual você realizar o processo de adoção e/ou apadrinhamento, após a
          formalização do processo.
        </Text>
        <Text style={styles.positionText}>INFORMAÇÕES PESSOAIS</Text>
        <View style={styles.fieldsContainer}>
          <Textfield placeholder="Nome completo" />
          <Textfield placeholder="Idade" />
          <Textfield placeholder="Nome de usuário" />
          <Textfield placeholder="Estado" />
          <Textfield placeholder="Cidade" />
          <Textfield placeholder="Endereço" />
          <Textfield placeholder="Telefone" />
        </View>
        <Text style={styles.positionText}>INFORMAÇÕES DE PERFIL</Text>
        <View style={styles.fieldsContainer}>
          <Textfield
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <Textfield
            placeholder="Senha"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <Textfield
            placeholder="Confirmação de senha"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
        <Text style={styles.positionText}>FOTO DE PERFIL</Text>
        <View style={styles.imageContainer}>
          <FontAwesomeIcon icon={faCirclePlus} style={styles.icon} />
          <Text>adicionar foto</Text>
        </View>
        <Button label="FAZER CADASTRO" onPress={handleCadastro} />
      </ScrollView>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  icon: {
    color: "black",
    fontSize: 24,
  },
  registerContainer: {
    flexGrow: 1,
    paddingTop: 28,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: "center",
  },
  startText: {
    backgroundColor: "#CFE9E5",
    textAlign: "center",
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 14,
  },
  fieldsContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 20,
    gap: 16,
  },
  imageContainer: {
    width: 128,
    height: 128,
    backgroundColor: "#d9d9d9",
    marginVertical: 28,
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  positionText: {
    width: "100%",
    color: "#88C9BF",
    fontSize: 12,
    fontWeight: "normal",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    textAlign: "left",
  },
});
