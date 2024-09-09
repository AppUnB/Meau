/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  ActivityIndicator,
  View,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  deletarAnimal,
  listarAnimaisDoUsuario,
} from "../services/animalService";

const MyPets = () => {
  const [animais, setAnimais] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchAnimals() {
      try {
        const animalData = await listarAnimaisDoUsuario();
        if (animalData) {
          setAnimais(animalData);
        } else {
          console.error("Nenhum animal encontrado");
        }
      } catch (error) {
        console.error("Erro ao listar os animais do usuário:", error);
      }
    }

    fetchAnimals();
  }, []);

  if (!animais) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.homeContainer}>
      {animais.map((animal) => (
        <AnimalCard
          key={animal.id}
          animal={animal}
          navigate={navigation.navigate}
        />
      ))}
    </ScrollView>
  );
};

export default MyPets;

function AnimalCard({ animal, navigate }) {
  const navigation = useNavigation();
  function onPress() {
    navigate("Detalhes do Animal", { id: animal.id });
  }

  const handleDelete = async () => {
    Alert.alert("Confirmação", "Tem certeza que deseja remover este pet?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: async () => {
          try {
            await deletarAnimal(animal.id);
            navigation.reset({
              index: 0,
              routes: [{ name: "Meus animais" }],
            });
          } catch (error) {
            Alert.alert(
              "Erro",
              "Não foi possível remover o pet. Tente novamente."
            );
          }
        },
      },
    ]);
  };

  return (
    <Pressable
      onPress={onPress}
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 10,
        width: "100%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      <View
        style={{
          backgroundColor: "#ffe29b",
          padding: 5,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ padding: 5 }}>{animal.nome}</Text>
        <Pressable onPress={handleDelete} style={styles.heartIcon}>
          <Icon name="trash" size={20} color="#000" />
        </Pressable>
      </View>
      <Image
        source={{ uri: animal.imageUrl }}
        style={styles.animalImage}
        resizeMode="contain"
        alt="Foto do animal"
      />
      <View
        style={{
          paddingVertical: 8,
          display: "flex",
          gap: 8,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto",
              fontWeight: "regular",
              fontSize: 12,
              color: "#434343",
            }}
          >
            {animal.porte.toUpperCase()}
          </Text>
          <Text
            style={{
              fontFamily: "Roboto",
              fontWeight: "regular",
              fontSize: 12,
              color: "#434343",
            }}
          >
            {animal.sexo.toUpperCase()}
          </Text>
          <Text
            style={{
              fontFamily: "Roboto",
              fontWeight: "regular",
              fontSize: 12,
              color: "#434343",
            }}
          >
            {animal.idade.toUpperCase()}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export const styles = StyleSheet.create({
  homeContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 16,
    gap: 20,
  },
  animalImage: {
    width: "100%",
    height: 180,
    borderBottomWidth: 1,
    borderBottomColor: "#9c999a",
  },
});
