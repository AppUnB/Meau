/* eslint-disable react/prop-types */
import { React, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { listarAnimais } from "../services/animalService";

import { getAuth } from "firebase/auth";
import { STUB_ANIMAIS, USE_STUB_BACKEND } from "../config/runtime";

export default function ListarAnimais({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [animais, setAnimais] = useState([]);

  useEffect(() => {
    if (USE_STUB_BACKEND) {
      setAnimais(STUB_ANIMAIS);
      return;
    }

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
          isStub={USE_STUB_BACKEND}
        />
      ))}
    </ScrollView>
  );
}

function AnimalCard({ animal, navigate, isStub }) {
  function onPress() {
    if (isStub) {
      Alert.alert(
        "Modo demo",
        "Detalhes, chat e persistência exigem backend Firebase real."
      );
      return;
    }

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
