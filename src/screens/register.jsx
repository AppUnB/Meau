/* eslint-disable react/prop-types */
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from "react-native";
import Textfield from "../components/textField";
import Button from "../components/button";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { register } from "../services/auth";
import React from "react";
import { uploadImage } from "../services/imageUpload.service";
import * as ImagePicker from "expo-image-picker";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const image = result.assets[0].uri;
      const path = "images/users/" + new Date().getTime();
      uploadImage(image, path).then((url) => {
        setImageUrl(url);
      });
    }
  };

  async function handleRegister() {
    if (loading) return;

    if (password !== verifyPassword) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }

    if (!email || !password) {
      setErrorMessage("Preencha todos os campos.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    register(email, password, nome, imageUrl)
      .then(() => {
        navigation.navigate("Lista de animais");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        Alert.alert(
          "Erro no cadastro",
          "Não foi possível realizar o cadastro. Verifique suas informações e tente novamente."
        );
        setLoading(false);
      });
  }

  return (
    <ScrollView contentContainerStyle={styles.registerContainer}>
      <Text style={styles.startText}>
        As informações preenchidas serão divulgadas apenas para a pessoa com a
        qual você realizar o processo de adoção e/ou apadrinhamento, após a
        formalização do processo.
      </Text>
      <Text style={styles.positionText}>INFORMAÇÕES PESSOAIS</Text>
      <View style={styles.fieldsContainer}>
        <Textfield placeholder="Nome" value={nome} onChangeText={setNome} />
        <Textfield placeholder="Endereço" />
        <Textfield placeholder="Telefone" />
      </View>
      <Text style={styles.positionText}>INFORMAÇÕES DE PERFIL</Text>
      <View style={styles.fieldsContainer}>
        <Textfield placeholder="e-mail" value={email} onChangeText={setEmail} />

        <View style={[styles.inputContainer]}>
          <TextInput
            style={[styles.textInput]}
            placeholder="Senha"
            secureTextEntry={isPasswordHidden}
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

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.textInput]}
            placeholder="Confirmação de senha"
            secureTextEntry={isConfirmPasswordHidden}
            value={verifyPassword}
            onChangeText={setVerifyPassword}
          />
          <TouchableOpacity
            style={{ paddingRight: 10 }}
            onPress={() => setIsConfirmPasswordHidden(!isConfirmPasswordHidden)}
          >
            {isConfirmPasswordHidden ? (
              <Entypo name="eye" size={24} color="black" />
            ) : (
              <Entypo name="eye-with-line" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
      </View>

      <Text style={styles.positionText}>FOTO DE PERFIL</Text>
      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        {!imageUrl ? (
          <>
            <FontAwesomeIcon icon={faCirclePlus} style={styles.icon} />
            <Text>adicionar foto</Text>
          </>
        ) : (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        )}
      </TouchableOpacity>

      <Button label="FAZER CADASTRO" onPress={handleRegister} />
    </ScrollView>
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
  textInput: {
    height: 45,
    width: "100%",
    color: "black",
    fontSize: 14,
    opacity: 0.7,
    padding: 0,
    marginVertical: 0,
    paddingLeft: 32,
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
  errorText: {
    color: "red",
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
