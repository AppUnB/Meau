import React, { useEffect } from "react";
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
import * as ImagePicker from "expo-image-picker";
import { RadioButton, Checkbox } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { cadastrarAnimal } from "../services/animalService";
import { uploadImage } from "../services/imageUpload.service";
import { useNavigation } from "@react-navigation/native";

function AnimalRegister() {
  const { register, setValue, handleSubmit, watch, control } = useForm();
  const navigation = useNavigation();

  useEffect(() => {
    register("nome");
    register("especie");
    register("sexo");
    register("porte");
    register("idade");
    register("temperamento");
    register("saude");
    register("necessidades");
    register("sobre");
    register("imageUrl");
  }, [register]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const image = result.assets[0].uri;
      const path = "images/pet/" + new Date().getTime();
      uploadImage(image, path).then((url) => {
        setValue("imageUrl", url);
        console.log(url);
      });
    }
  };

  function onSubmit(data) {
    console.log("Dados antes do cadastro:", data);
    cadastrarAnimal(data)
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Lista de animais" }],
        });
      })
      .catch((error) => {
        console.error("Erro ao cadastrar animal:", error);
      });
  }

  return (
    <ScrollView contentContainerStyle={styles.registerContainer}>
      <View style={styles.fieldsContainer}>
        <Text style={styles.LabelText}>NOME DO ANIMAL</Text>
        <Textfield
          placeholder="Nome do animal"
          onChangeText={(text) => setValue("nome", text)}
        />
        <Text style={styles.LabelText}>FOTOS DO ANIMAL</Text>
        <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
          {!watch("imageUrl") ? (
            <Text>Escolher foto para enviar +</Text>
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
        <Text style={styles.LabelText}>PORTE</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
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
          )}
          name="porte"
          defaultValue="Pequeno"
        />
        <Text style={styles.LabelText}>IDADE</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
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
          )}
          name="idade"
          defaultValue="Filhote"
        />
        <Text style={styles.LabelText}>TEMPERAMENTO</Text>
        <View style={styles.checkboxContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    status={
                      value.includes("Brincalhão") ? "checked" : "unchecked"
                    }
                    onPress={() => {
                      const newValue = value.includes("Brincalhão")
                        ? value.filter((v) => v !== "Brincalhão")
                        : [...value, "Brincalhão"];
                      onChange(newValue);
                    }}
                  />
                  <Text>Brincalhão</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    status={value.includes("Tímido") ? "checked" : "unchecked"}
                    onPress={() => {
                      const newValue = value.includes("Tímido")
                        ? value.filter((v) => v !== "Tímido")
                        : [...value, "Tímido"];
                      onChange(newValue);
                    }}
                  />
                  <Text>Tímido</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    status={value.includes("Calmo") ? "checked" : "unchecked"}
                    onPress={() => {
                      const newValue = value.includes("Calmo")
                        ? value.filter((v) => v !== "Calmo")
                        : [...value, "Calmo"];
                      onChange(newValue);
                    }}
                  />
                  <Text>Calmo</Text>
                </View>
              </>
            )}
            name="temperamento"
            defaultValue={[]}
          />
        </View>
        <Text style={styles.LabelText}>SAÚDE</Text>
        <View style={styles.checkboxContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    status={
                      value.includes("Vacinado") ? "checked" : "unchecked"
                    }
                    onPress={() => {
                      const newValue = value.includes("Vacinado")
                        ? value.filter((v) => v !== "Vacinado")
                        : [...value, "Vacinado"];
                      onChange(newValue);
                    }}
                  />
                  <Text>Vacinado</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    status={
                      value.includes("Vermifugado") ? "checked" : "unchecked"
                    }
                    onPress={() => {
                      const newValue = value.includes("Vermifugado")
                        ? value.filter((v) => v !== "Vermifugado")
                        : [...value, "Vermifugado"];
                      onChange(newValue);
                    }}
                  />
                  <Text>Vermifugado</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    status={
                      value.includes("Castrado") ? "checked" : "unchecked"
                    }
                    onPress={() => {
                      const newValue = value.includes("Castrado")
                        ? value.filter((v) => v !== "Castrado")
                        : [...value, "Castrado"];
                      onChange(newValue);
                    }}
                  />
                  <Text>Castrado</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    status={value.includes("Doente") ? "checked" : "unchecked"}
                    onPress={() => {
                      const newValue = value.includes("Doente")
                        ? value.filter((v) => v !== "Doente")
                        : [...value, "Doente"];
                      onChange(newValue);
                    }}
                  />
                  <Text>Doente</Text>
                </View>
              </>
            )}
            name="saude"
            defaultValue={[]}
          />
        </View>
        <Text style={styles.LabelText}>NECESSIDADES DO ANIMAL</Text>
        <View style={styles.checkboxContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    status={
                      value.includes("Alimento") ? "checked" : "unchecked"
                    }
                    onPress={() => {
                      const newValue = value.includes("Alimento")
                        ? value.filter((v) => v !== "Alimento")
                        : [...value, "Alimento"];
                      onChange(newValue);
                    }}
                  />
                  <Text>Alimento</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    status={
                      value.includes("Auxílio financeiro")
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() => {
                      const newValue = value.includes("Auxílio financeiro")
                        ? value.filter((v) => v !== "Auxílio financeiro")
                        : [...value, "Auxílio financeiro"];
                      onChange(newValue);
                    }}
                  />
                  <Text>Auxílio financeiro</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    status={
                      value.includes("Medicamento") ? "checked" : "unchecked"
                    }
                    onPress={() => {
                      const newValue = value.includes("Medicamento")
                        ? value.filter((v) => v !== "Medicamento")
                        : [...value, "Medicamento"];
                      onChange(newValue);
                    }}
                  />
                  <Text>Medicamento</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    status={value.includes("Objetos") ? "checked" : "unchecked"}
                    onPress={() => {
                      const newValue = value.includes("Objetos")
                        ? value.filter((v) => v !== "Objetos")
                        : [...value, "Objetos"];
                      onChange(newValue);
                    }}
                  />
                  <Text>Objetos</Text>
                </View>
              </>
            )}
            name="necessidades"
            defaultValue={[]}
          />
        </View>
        <Textfield
          placeholder="Descrição adicional"
          onChangeText={(text) => setValue("sobre", text)}
        />
        <Button label="Cadastrar Animal" onPress={handleSubmit(onSubmit)} />
      </View>
    </ScrollView>
  );
}

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
    gap: 10,
  },
});

export default AnimalRegister;
