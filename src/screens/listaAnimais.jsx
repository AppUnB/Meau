/* eslint-disable react/prop-types */
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useState, React, useEffect } from "react";
import { Image, Text } from "react-native";
import { listarAnimais } from "../services/animalService";
import { ScrollView } from "react-native";
import { Pressable } from "react-native";

export default function ListarAnimais({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [animais, setAnimais] = useState([]);

  useEffect(() => {
    setLoading(true);
    listarAnimais()
      .then((animais) => {
        setAnimais(animais);
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <View style={styles.homeContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );

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
}

function AnimalCard({ animal, navigate }) {
  function onPress() {
    navigate("Detalhes do Animal", { animal }); // Todo: passar o id do animal
  }

  return (
    <Pressable
      onPress={onPress}
      style={{
        display: "flex",
        flexDirection: "column",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
        width: "100%",
      }}
    >
      <View
        style={{
          backgroundColor: "yellow",
          padding: 5,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <Text style={styles.animalName}>
          {animal.nome}
          {" - "}
          {animal.especie}
        </Text>
      </View>
      <Image
        source={{ uri: animal.imageUrl }}
        style={styles.animalImage}
        alt="Foto do animal"
      />
      <View style={{ paddingVertical: 8, display: "flex", gap: 8 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Text>{animal.idade}</Text>
          <Text>{animal.sexo}</Text>
          <Text>{animal.tamanho}</Text>
        </View>
        <Text style={{ marginHorizontal: "auto" }}>{animal.local}</Text>
      </View>
    </Pressable>
  );
}

export const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 16,
    gap: 20,
  },
  animalImage: {
    width: "100%",
    height: 180,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
});
