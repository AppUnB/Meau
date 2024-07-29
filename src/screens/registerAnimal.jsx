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
import { Checkbox, RadioButton } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { cadastrarAnimal } from "../services/animalService";
import { uploadImage } from "../services/imageUpload.service";
import Icon from 'react-native-vector-icons/MaterialIcons';

function AnimalRegister() {

  const { unregister, setValue, handleSubmit, watch, control } = useForm(
  );

  const sick = watch("saude")?.includes('doente');
  const postAdopt = watch("exigenciasAdocao")?.includes('acompanhamentoPos');
  useEffect(() => {
    if (!sick) {
      unregister("doencas");
    }
    if (!postAdopt) {
      unregister(["acompanhamentoPos"]);
    }
  }, [sick, postAdopt]);

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
        <View style={styles.rowContainer}>
          <Text style={styles.LabelText}>NOME DO ANIMAL</Text>
          <Textfield
            placeholder="Nome do animal"
            onChangeText={(text) => setValue("nome", text)}
          />
        </View>
        <View style={{ marginTop: 16, marginBottom: 20 }}>
          <Text style={styles.LabelText}>FOTOS DO ANIMAL</Text>
          <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
            {!watch("imageUrl") ? (<>
              <Icon name="control-point" size={24} collor={"##757575"} /><Text>adicionar fotos</Text>
            </>
            ) : (
              <Image source={{ uri: watch("imageUrl") }} style={styles.image} />
            )}
          </TouchableOpacity>
        </View>


        <Text style={styles.LabelText}>ESPÉCIE</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View style={styles.rowContainer}>
              <RadioButton.Group onValueChange={onChange} value={value} style={styles.RadioButtonGroup}>
                <View style={styles.radioContainer}>
                  <RadioButton value="cachorro" />
                  <Text>Cachorro</Text>
                </View>
                <View style={styles.radioContainer}>
                  <RadioButton value="gato" />
                  <Text>Gato</Text>
                </View>
              </RadioButton.Group>
            </View>
          )
          }
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
                <RadioButton value="pequeno" />
                <Text>Pequeno</Text>
              </View>
              <View style={styles.radioContainer}>
                <RadioButton value="medio" />
                <Text>Médio</Text>
              </View>
              <View style={styles.radioContainer}>
                <RadioButton value="grande" />
                <Text>Grande</Text>
              </View>
            </RadioButton.Group>
          )}
          name="porte"
          defaultValue="pequeno"
        />
        <Text style={styles.LabelText}>IDADE</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              <View style={styles.radioContainer}>
                <RadioButton value="filhote" />
                <Text>Filhote</Text>
              </View>
              <View style={styles.radioContainer}>
                <RadioButton value="adulto" />
                <Text>Adulto</Text>
              </View>
              <View style={styles.radioContainer}>
                <RadioButton value="idoso" />
                <Text>Idoso</Text>
              </View>
            </RadioButton.Group>
          )}
          name="idade"
          defaultValue="filhote"
        />


        <Text style={styles.LabelText}>
          TEMPERAMENTO
        </Text>
        <Controller control={control}
          name="temperamento"
          defaultValue={[]}
          render={({ field: { onChange, value } }) =>
            <><View style={styles.rowContainer}>
              <Checkbox.Item
                style={styles.checkbox}
                position="leading"
                label="Brincalhão"
                status={value.includes('brincalhao') ? 'checked' : 'unchecked'}
                onPress={() => onChange(value.includes('brincalhao') ? value.filter((v) => v !== 'brincalhao') : [...value, 'brincalhao'])}
              />
              <Checkbox.Item
                style={styles.checkbox}
                position="leading"
                label="Tímido"
                status={value.includes('timido') ? 'checked' : 'unchecked'}
                onPress={() => onChange(value.includes('timido') ? value.filter((v) => v !== 'timido') : [...value, 'timido'])}
              />
              <Checkbox.Item
                style={styles.checkbox}
                position="leading"
                label="Calmo"
                status={value.includes('calmo') ? 'checked' : 'unchecked'}
                onPress={() => onChange(value.includes('calmo') ? value.filter((v) => v !== 'calmo') : [...value, 'calmo'])}
              />
            </View>
              <View style={styles.rowContainer}>
                <Checkbox.Item
                  style={styles.checkbox}
                  position="leading"
                  label="Guarda"
                  status={value.includes('guarda') ? 'checked' : 'unchecked'}
                  onPress={() => onChange(value.includes('guarda') ? value.filter((v) => v !== 'guarda') : [...value, 'guarda'])}
                />
                <Checkbox.Item
                  style={styles.checkbox}
                  position="leading"
                  label="Amoroso"
                  status={value.includes('amoroso') ? 'checked' : 'unchecked'}
                  onPress={() => onChange(value.includes('amoroso') ? value.filter((v) => v !== 'amoroso') : [...value, 'amoroso'])}
                />
                <Checkbox.Item
                  style={styles.checkbox}
                  position="leading"
                  label="Preguiçoso"
                  status={value.includes('preguicoso') ? 'checked' : 'unchecked'}
                  onPress={() => onChange(value.includes('preguicoso') ? value.filter((v) => v !== 'preguicoso') : [...value, 'preguicoso'])}
                />
              </View>

            </>
          }
        />

        <Text style={styles.LabelText}>SAÚDE</Text>
        <Controller control={control}
          name="saude"
          defaultValue={[]}
          render={({ field: { onChange, value } }) =>
            <View style={styles.rowContainer}>
              <Checkbox.Item
                style={styles.checkbox}
                position="leading"
                label="Vacinado"
                status={value.includes('vacinado') ? 'checked' : 'unchecked'}
                onPress={() => onChange(value.includes('vacinado') ? value.filter((v) => v !== 'vacinado') : [...value, 'vacinado'])}
              />
              <Checkbox.Item
                style={styles.checkbox}
                position="leading"
                label="Vermifugado"
                status={value.includes('vermifugado') ? 'checked' : 'unchecked'}
                onPress={() => onChange(value.includes('vermifugado') ? value.filter((v) => v !== 'vermifugado') : [...value, 'vermifugado'])}
              />
              <Checkbox.Item
                style={styles.checkbox}
                position="leading"
                label="Castrado"
                status={value.includes('castrado') ? 'checked' : 'unchecked'}
                onPress={() => onChange(value.includes('castrado') ? value.filter((v) => v !== 'castrado') : [...value, 'castrado'])}
              />
              <Checkbox.Item
                style={styles.checkbox}
                position="leading"
                label="Doente"
                status={value.includes('doente') ? 'checked' : 'unchecked'}
                onPress={() => onChange(value.includes('doente') ? value.filter((v) => v !== 'doente') : [...value, 'doente'])}
              />
            </View>
          }
        />
        {sick && <Textfield placeholder={"Doenças do animal"}
          onChangeText={(text) => setValue("doencas", text)} />
        }
        {//alternativa:
        /* {sick ? <Textfield placeholder={"Doenças do animal"}
          onChangeText={(text) => setValue("doencas", text)} /> : 
          <Textfield value={undefined} placeholder={"Doenças do animal"} editable={false} />
        } */}
        <Text style={styles.LabelText}>EXIGÊNCIAS PARA ADOÇÃO</Text>
        <Controller control={control}
          // termo de adoção, fotos da casa, visita prévia ao animal, acompanhamento pós adoção
          name="exigenciasAdocao"
          defaultValue={[]}
          render={({ field: { onChange, value } }) =>
            <>
              <View style={styles.exigenciasContainer}>
                <Checkbox.Item
                  style={styles.exigenciasCheckbox}
                  position="leading"
                  label="Termo de adoção"
                  status={value.includes('termoAdocao') ? 'checked' : 'unchecked'}
                  onPress={() => onChange(value.includes('termoAdocao') ? value.filter((v) => v !== 'termoAdocao') : [...value, 'termoAdocao'])}
                />
                <Checkbox.Item
                  style={styles.exigenciasCheckbox}
                  position="leading"
                  label="Fotos da casa"
                  status={value.includes('fotosCasa') ? 'checked' : 'unchecked'}
                  onPress={() => onChange(value.includes('fotosCasa') ? value.filter((v) => v !== 'fotosCasa') : [...value, 'fotosCasa'])}
                />
                <Checkbox.Item
                  style={styles.exigenciasCheckbox}
                  position="leading"
                  label="Visita prévia ao animal"
                  status={value.includes('visitaPrevia') ? 'checked' : 'unchecked'}
                  onPress={() => onChange(value.includes('visitaPrevia') ? value.filter((v) => v !== 'visitaPrevia') : [...value, 'visitaPrevia'])}
                />
                <Checkbox.Item
                  style={styles.exigenciasCheckbox}
                  position="leading"
                  label="Acompanhamento pós adoção"
                  status={value.includes('acompanhamentoPos') ? 'checked' : 'unchecked'}
                  onPress={() => onChange(value.includes('acompanhamentoPos') ? value.filter((v) => v !== 'acompanhamentoPos') : [...value, 'acompanhamentoPos'])}
                />

                {postAdopt && (
                  <Controller control={control} name="acompanhamentoPos" defaultValue={[]} render={({ field: { onChange, value } }) => (
                    <View>
                      <Checkbox.Item
                        style={styles.acompanhamentoCheck}
                        position="leading"
                        label="1 mês"
                        status={value.includes('1mes') ? 'checked' : 'unchecked'}
                        onPress={() => onChange(value.includes('1mes') ? value.filter((v) => v !== '1mes') : [...value, '1mes'])}
                      />
                      <Checkbox.Item
                        style={styles.acompanhamentoCheck}
                        position="leading"
                        label="3 meses"
                        status={value.includes('3meses') ? 'checked' : 'unchecked'}
                        onPress={() => onChange(value.includes('3meses') ? value.filter((v) => v !== '3meses') : [...value, '3meses'])}
                      />
                      <Checkbox.Item
                        style={styles.acompanhamentoCheck}
                        position="leading"
                        label="6 meses"
                        status={value.includes('6meses') ? 'checked' : 'unchecked'}
                        onPress={() => onChange(value.includes('6meses') ? value.filter((v) => v !== '6meses') : [...value, '6meses'])}
                      />
                    </View>)}
                  />
                )}
              </View>
            </>
          }
        />

        <Text style={styles.LabelText}>SOBRE O ANIMAL</Text>
        <Textfield
          placeholder="Compartilhe a história do animal"
          onChangeText={(text) => setValue("sobre", text)}
        />

      </View >
      <Button label="CADASTRAR" onPress={handleSubmit(onSubmit)} />


    </ScrollView >
  );
};

export default AnimalRegister;

const styles = StyleSheet.create({
  icon: {
    color: "#757575",
    width: 24,
    height: 24,
  },
  LabelText: {
    fontFamily: "Roboto_400Regular",
    width: "100%",
    color: "#f7a800",
    fontSize: 12,
    fontWeight: "normal",
    paddingTop: 16,
    paddingBottom: 16,
    textAlign: "left",
  },
  registerContainer: {
    flexGrow: 1,
    paddingTop: 28,
    paddingHorizontal: 24,
    paddingBottom: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  fieldsContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  imageContainer: {
    width: 320,
    height: 120,
    backgroundColor: "#d9d9d9",
    marginVertical: 28,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 320,
    height: 200,
    borderRadius: 10,
    paddingEnd: 10,
  },

  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  RadioButtonGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",

  },

  rowContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    alignContent: 'flex-start',
    alignItems: "flex-start",
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0,
    paddingRight: 0,
    gap: 0
  },

  exigenciasContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    alignItems: "flex-start",
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },

  checkbox: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    alignContent: 'flex-start',
    alignItems: "center",
    alignSelf: "flex-start",
    verticalAlign: "middle",
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0,
    gap: 4,
  },

  exigenciasCheckbox: {
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },

  acompanhamentoCheck: {
    paddingLeft: 60,
    paddingRight: 32,

  },

});
