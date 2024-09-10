/* eslint-disable react/prop-types */
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Pressable,
  Image,
  Text,
} from "react-native";
import { useState, React, useEffect } from "react";
import { listarAnimais } from "../services/animalService";

import { getAuth } from "firebase/auth";

export default function ListarAnimais({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [animais, setAnimais] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    if (!auth.currentUser) {
      navigation.navigate("Login");
      return;
    }
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
    navigate("Detalhes do Animal", { id: animal.id });
  }

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
