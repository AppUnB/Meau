import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Button from "../components/button";
import { Stack } from "native-base";
import * as ImagePicker from "expo-image-picker";

import { uploadImage } from "../services/imageUpload.service";

const UploadComp = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [enviada, setEnviada] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  function handleUploadImage() {
    const path = "images/" + new Date().getTime();
    uploadImage(image, path).then((url) => {
      setEnviada(url);
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.registerContainer}>
      <Text style={styles.LabelText}>Enviar nova foto</Text>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        <Text>escolher foto para enviar +</Text>
      </TouchableOpacity>
      <Stack mt="10" />
      <Button label="Enviar" onPress={handleUploadImage} />
      <Text style={styles.LabelText}>Fotos já enviadas</Text>
      <View style={{ display: "flex", flexDirection: "column", gap: "10em" }}>
        {enviada && <Image source={{ uri: enviada }} style={styles.image} />}
        {enviada && <Image source={{ uri: enviada }} style={styles.image} />}
      </View>
    </ScrollView>
  );
};

export default UploadComp;

const styles = StyleSheet.create({
  icon: {
    color: "black",
    fontSize: 24,
  },
  LabelText: {
    width: "100%",
    color: "#88C9BF",
    fontSize: 16,
    fontWeight: "normal",
    paddingTop: 16,
    paddingBottom: 16,
    textAlign: "left",
  },
  registerContainer: {
    flexGrow: 1,
    paddingTop: 28,
    paddingHorizontal: 20,
    paddingBottom: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  fieldsContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 6,
  },
  imageContainer: {
    width: 320,
    height: 80,
    backgroundColor: "#d9d9d9",
    marginVertical: 28,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 10,
    marginHorizontal: "auto",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
