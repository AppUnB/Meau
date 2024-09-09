import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import Textfield from "../components/textField";
import Button from "../components/button";
import { faSquareFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { login } from "../services/auth";
import React from "react";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (loading || !email || !password) return;

    setLoading(true);
    try {
      const user = await login(email, password);
      if (!user) {
        Alert.alert("Erro", "Falha no login. Verifique suas credenciais.");
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "Lista de animais" }],
        });
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Ocorreu um erro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (loading)
    return (
      <View style={styles.homeContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );

  return (
    <View style={styles.homeContainer}>
      <View style={styles.fieldsContainer}>
        <Textfield placeholder="Email" value={email} onChangeText={setEmail} />
        <Textfield
          placeholder="Senha"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Button label="ENTRAR" onPress={handleLogin} />
      <Button
        label="CADASTRAR-SE"
        onPress={() => navigation.navigate("Cadastro")}
      />
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
  );
};

export default Login;

export const styles = StyleSheet.create({
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
