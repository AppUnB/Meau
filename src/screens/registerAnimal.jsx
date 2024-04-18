import { View, StyleSheet, Text, ScrollView } from "react-native";
import Header from "../components/header";
import Textfield from "../components/textField";
import Button from "../components/button";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Radio, Stack, Checkbox } from "native-base";
import { useState } from "react";

const AnimalRegister = ({ navigation }) => {
  const [value, setValue] = useState("Cachorro");
  return (
    <ScrollView contentContainerStyle={styles.registerContainer}>
      <Text style={styles.positionText}>Cadastrar Animal</Text>
      <View style={styles.fieldsContainer}>
        <Text style={styles.LabelText}>NOME DO ANIMAL</Text>
        <Textfield placeholder="Nome do animal" />
        <Text style={styles.LabelText}>FOTOS DO ANIMAL</Text>
        <View style={styles.imageContainer}>
          <FontAwesomeIcon icon={faCirclePlus} style={styles.icon} />
          <Text>adicionar foto</Text>
        </View>
        <Text style={styles.LabelText}>ESPÉCIE</Text>
        <Radio.Group
          name="SpeciesGroup"
          accessibilityLabel="favorite number"
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue);
          }}
        >
          <Stack
            direction={{
              base: "row",
            }}
            alignItems={{
              base: "flex-start",
              md: "center",
            }}
            space={4}
            w="100%"
          >
            <Radio value="cachorro" my={1}>
              Cachorro
            </Radio>
            <Radio value="gato" my={1}>
              Gato
            </Radio>
          </Stack>
        </Radio.Group>
        <Text style={styles.LabelText}>SEXO</Text>
        <Radio.Group
          name="SpeciesGroup"
          accessibilityLabel="favorite number"
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue);
          }}
        >
          <Stack
            direction={{
              base: "row",
            }}
            alignItems={{
              base: "flex-start",
              md: "center",
            }}
            space={4}
            w="100%"
          >
            <Radio value="macho" my={1}>
              Macho
            </Radio>
            <Radio value="femea" my={1}>
              Fêmea
            </Radio>
          </Stack>
        </Radio.Group>
        <Text style={styles.LabelText}>PORTE</Text>
        <Radio.Group
          name="SpeciesGroup"
          accessibilityLabel="favorite number"
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue);
          }}
        >
          <Stack
            direction={{
              base: "row",
            }}
            alignItems={{
              base: "flex-start",
              md: "center",
            }}
            space={4}
            w="100%"
          >
            <Radio value="pequeno" my={1}>
              Pequeno
            </Radio>
            <Radio value="medio" my={1}>
              Médio
            </Radio>
            <Radio value="grande" my={1}>
              Grande
            </Radio>
          </Stack>
        </Radio.Group>
        <Text style={styles.LabelText}>IDADE</Text>
        <Radio.Group
          name="SpeciesGroup"
          accessibilityLabel="favorite number"
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue);
          }}
        >
          <Stack
            direction={{
              base: "row",
            }}
            alignItems={{
              base: "flex-start",
              md: "center",
            }}
            space={4}
            w="100%"
          >
            <Radio value="filhote" my={1}>
              Filhote
            </Radio>
            <Radio value="adulto" my={1}>
              Adulto
            </Radio>
            <Radio value="idoso" my={1}>
              Idoso
            </Radio>
          </Stack>
        </Radio.Group>
        <Text style={styles.LabelText}>TEMPERAMENTO</Text>
        <Stack
          direction={{
            base: "row",
          }}
          alignItems={{
            base: "flex-start",
            md: "center",
          }}
          space={4}
          w="100%"
          mb="5"
        >
          <Checkbox>Brincalhão</Checkbox>
          <Checkbox>Tímido</Checkbox>
          <Checkbox>Calmo</Checkbox>
        </Stack>
        <Stack
          direction={{
            base: "row",
          }}
          alignItems={{
            base: "flex-start",
            md: "center",
          }}
          space={4}
          w="100%"
        >
          <Checkbox>Guarda</Checkbox>
          <Checkbox>Amoroso</Checkbox>
          <Checkbox>Preguiçoso</Checkbox>
        </Stack>
        <Text style={styles.LabelText}>SAÚDE</Text>
        <Stack
          direction={{
            base: "row",
          }}
          alignItems={{
            base: "flex-start",
            md: "center",
          }}
          space={4}
          w="100%"
          mb="5"
        >
          <Checkbox>Vacinado</Checkbox>
          <Checkbox>Vermifugado</Checkbox>
        </Stack>
        <Stack
          direction={{
            base: "row",
          }}
          alignItems={{
            base: "flex-start",
            md: "center",
          }}
          space={4}
          w="100%"
        >
          <Checkbox>Castrado</Checkbox>
          <Checkbox>Doente</Checkbox>
        </Stack>
        <Textfield placeholder="Doenças do animal" />
        <Text style={styles.LabelText}>NECESSIDADES DO ANIMAL</Text>
        <Stack
          direction={{
            base: "column",
          }}
          alignItems={{
            base: "flex-start",
            md: "center",
          }}
          space={4}
          w="100%"
        >
          <Checkbox>Alimento</Checkbox>
          <Checkbox>Auxílio financeiro</Checkbox>
          <Checkbox>Medicamento</Checkbox>
          <Textfield placeholder="Nome do medicamento" />
          <Checkbox>Objetos</Checkbox>
          <Textfield placeholder="Especifique o(s) objeto(s)" />
        </Stack>
        <Text style={styles.LabelText}>SOBRE O ANIMAL</Text>
        <Textfield placeholder="Compartilhe a história do animal" />
        <Stack mt="10" />
      </View>
        <Button label="CADASTRAR"  />
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
    alignItems: "left",
    gap: 6,
  },
  imageContainer: {
    width: 320,
    height: 80,
    backgroundColor: "#d9d9d9",
    marginVertical: 28,
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  positionText: {
    width: "100%",
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    textAlign: "left",
  },
});
