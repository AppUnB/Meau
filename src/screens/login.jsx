/* eslint-disable react/prop-types */
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Textfield from "../components/textField";
import Button from "../components/button";
import { useState } from "react";
import { login } from "../services/auth";
import React from "react";
import { Entypo } from "@expo/vector-icons";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

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

        {/* Campo de senha com o ícone de exibir/ocultar senha */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Senha"
            secureTextEntry={isPasswordHidden} // Alterna entre exibir ou ocultar a senha
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={{ paddingRight: 10 }}
            onPress={() => setIsPasswordHidden(!isPasswordHidden)}
          >
            {isPasswordHidden ? (
              <Entypo name="eye" size={24} color="black" />
            ) : (
              <Entypo name="eye-with-line" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Button label="ENTRAR" onPress={handleLogin} />
      <Button
        label="CADASTRAR-SE"
        onPress={() => navigation.navigate("Cadastro")}
      />
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
  inputContainer: {
    backgroundColor: "transparent",
    borderBottomColor: "#BDBDBD",
    borderBottomWidth: 1,
    width: 312,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 0,
    justifyContent: "flex-end",
  },
  textInput: {
    height: 45,
    width: 260, // Diminuído para acomodar o ícone ao lado
    color: "black",
    fontSize: 14,
    opacity: 0.7,
    padding: 0,
    marginVertical: 0,
  },
});
