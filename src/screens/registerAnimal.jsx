import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Textfield from "../components/textField";
import Button from "../components/button";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Stack, Checkbox } from "native-base";
import * as ImagePicker from "expo-image-picker";
import { RadioButton } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { cadastrarAnimal } from "../services/animalService";

const AnimalRegister = ({ navigation }) => {
  const [image, setImage] = useState(null);

  const { register, setValue, handleSubmit, watch, control } = useForm();

  useEffect(() => {
    register("nome");
    register("especie");
    register("sexo");
    register("imageUrl");
  }, [register]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      const image = result.assets[0].uri;
      const path = "images/pet/" + new Date().getTime();
      uploadImage(image, path).then((url) => {
        setValue("imageUrl", url);
      });
    }
  };

  function onSubmit(data) {
    console.log(data);
    cadastrarAnimal(data);
  }

  return (
    <ScrollView contentContainerStyle={styles.registerContainer}>
      <View style={styles.fieldsContainer}>
        <Text style={styles.LabelText}>NOME DO ANIMAL</Text>
        <Textfield
          placeholder="Nome do animal"
          onChangeText={(text) => setValue("nome", text)}
        />
        <Text>{watch("nome")}</Text>
        <Text>{watch("especie")}</Text>
        <Text>{watch("sexo")}</Text>
        <Text style={styles.LabelText}>FOTOS DO ANIMAL</Text>
        <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
          {!watch("imageUrl") ? (
            <>
              <Text>escolher foto para enviar +</Text>
            </>
          ) : (
            <Image source={{ uri: watch("imageUrl") }} style={styles.image} />
          )}
        </TouchableOpacity>
        <Text style={styles.LabelText}>ESPÉCIE</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              <View style={styles.radioContainer}>
                <RadioButton value="cachorro" />
                <Text>Cachorro</Text>
              </View>
              <View style={styles.radioContainer}>
                <RadioButton value="gato" />
                <Text>Gato</Text>
              </View>
            </RadioButton.Group>
          )}
          name="especie"
          defaultValue="cachorro"
        />
        <Text style={styles.LabelText}>SEXO</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              <View style={styles.radioContainer}>
                <RadioButton value="macho" />
                <Text>Macho</Text>
              </View>
              <View style={styles.radioContainer}>
                <RadioButton value="femea" />
                <Text>Fêmea</Text>
              </View>
            </RadioButton.Group>
          )}
          name="sexo"
          defaultValue="macho"
        />
        {/* <Text style={styles.LabelText}>PORTE</Text>
          <RadioButton.Group
            onValueChange={(value) => setValue(value)}
            value={value}
          >
            <View style={styles.radioContainer}>
              <RadioButton value="Pequeno" />
              <Text>Pequeno</Text>
            </View>
            <View style={styles.radioContainer}>
              <RadioButton value="Médio" />
              <Text>Médio</Text>
            </View>
            <View style={styles.radioContainer}>
              <RadioButton value="Grande" />
              <Text>Grande</Text>
            </View>
          </RadioButton.Group>
          <Text style={styles.LabelText}>IDADE</Text>
          <RadioButton.Group
            onValueChange={(value) => setValue(value)}
            value={value}
          >
            <View style={styles.radioContainer}>
              <RadioButton value="Filhote" />
              <Text>Filhote</Text>
            </View>
            <View style={styles.radioContainer}>
              <RadioButton value="Adulto" />
              <Text>Adulto</Text>
            </View>
            <View style={styles.radioContainer}>
              <RadioButton value="Idoso" />
              <Text>Idoso</Text>
            </View>
          </RadioButton.Group>
          <Text style={styles.LabelText}>TEMPERAMENTO</Text>
          <View style={styles.checkboxContainer}>
            <Checkbox>Brincalhão</Checkbox>
            <Checkbox>Tímido</Checkbox>
            <Checkbox>Calmo</Checkbox>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox>Guarda</Checkbox>
            <Checkbox>Amoroso</Checkbox>
            <Checkbox>Preguiçoso</Checkbox>
          </View>
          <Text style={styles.LabelText}>SAÚDE</Text>
          <View style={styles.checkboxContainer}>
            <Checkbox>Vacinado</Checkbox>
            <Checkbox>Vermifugado</Checkbox>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox>Castrado</Checkbox>
            <Checkbox>Doente</Checkbox>
          </View>
          <Textfield placeholder="Doenças do animal" />
          <Text style={styles.LabelText}>NECESSIDADES DO ANIMAL</Text>
          <View style={styles.checkboxContainer}>
            <Checkbox>Alimento</Checkbox>
            <Checkbox>Auxílio financeiro</Checkbox>
            <Checkbox>Medicamento</Checkbox>
            <Textfield placeholder="Nome do medicamento" />
            <Checkbox>Objetos</Checkbox>
            <Textfield placeholder="Especifique o(s) objeto(s)" />
          </View>
          <Text style={styles.LabelText}>SOBRE O ANIMAL</Text>
          <Textfield placeholder="Compartilhe a história do animal" /> */}
        <Stack mt="10" />
      </View>
      <Button label="CADASTRAR" onPress={handleSubmit(onSubmit)} />
    </ScrollView>
  );
};

export default AnimalRegister;

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
    width: 320,
    height: 80,
    borderRadius: 10,
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
