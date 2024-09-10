import PropTypes from "prop-types";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { getAnimalById, deletarAnimal } from "../services/animalService";
import { getAuth } from "firebase/auth";
import { enviarNotificacao } from "../services/notificationService";

const AnimalDetails = ({ route }) => {
  const auth = getAuth();
  const [animal, setAnimal] = useState(null);
  const navigation = useNavigation();

  const { id } = route.params;

  useEffect(() => {
    async function fetchAnimal() {
      const animalData = await getAnimalById(id);

      if (animalData) {
        const idDonoRef = animalData.idDono;
        const donoDoc = await getDoc(idDonoRef);

        if (donoDoc.exists()) {
          setAnimal({
            ...animalData,
            idDonoReal: idDonoRef.id,
          });
        } else {
          console.error("Documento do dono não encontrado");
        }
      }
    }

    fetchAnimal();
  }, [id]);

  if (!animal) {
    return (
      <View style={styles.homeContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
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
            await deletarAnimal(id);
            navigation.reset({
              index: 0,
              routes: [{ name: "Lista de animais" }],
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

  function handleTenhoInteresse() {
    const idAnimal = animal.id;
    const idDono = animal.idDono;
    const idUsuario = auth.currentUser.uid;

    const db = getFirestore();

    addDoc(collection(db, "chatRooms"), {
      idAnimal: doc(db, "animais", idAnimal),
      idDono: idDono,
      idInteressado: doc(db, "users", idUsuario),
    })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        addDoc(collection(db, "chatRooms/" + docRef.id + "/messages"), {
          author: doc(db, "users", idUsuario),
          content: "Olá, tenho interesse no seu pet!",
          timestamp: new Date(),
        }).then(() => {
          try {
            console.log("idDono", idDono);
            const dono = getDoc(idDono);
            console.log("dono", dono);
            enviarNotificacao(
              dono.pushToken,
              "Alguém tem interesse no seu pet!",
              "Abra suas conversas para responder."
            );
          } catch (error) {
            console.error("Erro ao enviar notificação", error);
          }
          navigation.navigate("chat", { idChat: docRef.id });
        });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  const renderDetail = (label, value) => (
    <View style={styles.detailContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  return (
    <>
      <View style={styles.banner}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("Lista de animais")}
        >
          <Icon name="arrow-back" size={24} color="#434343" />
        </TouchableOpacity>
        <Text style={styles.bannerText}>{animal.nome}</Text>
      </View>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: animal.imageUrl }}
            style={styles.image}
            resizeMode="center"
          />
        </View>
        <Text style={styles.petName}>{animal.petName}</Text>
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          {renderDetail("Sexo", animal.sexo)}
          {renderDetail("Porte", animal.porte)}
          {renderDetail("Idade", animal.idade)}
        </View>
        <View style={styles.divider} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {renderDetail(
            "Castrado",
            animal.saude.includes("Castrado") ? "Sim" : "Não"
          )}
          {renderDetail(
            "Vermifugado",
            animal.saude.includes("Vermifugado") ? "Sim" : "Não"
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {renderDetail(
            "Vacinado",
            animal.saude.includes("Vacinado") ? "Sim" : "Não"
          )}
          {renderDetail(
            "Doenças",
            animal.saude.includes("Doenças") ? "Sim" : "Não"
          )}
        </View>
        <View style={styles.divider} />
        {renderDetail("Temperamento", animal.temperamento.join(", "))}
        <View style={styles.divider} />
        {renderDetail(
          ` ${animal.nome} Precisa de`,
          animal.necessidades.join(", ")
        )}
        <View style={styles.divider} />
        {renderDetail(`Mais sobre ${animal.nome}`, animal.sobre)}
        {auth.currentUser.uid === animal.idDonoReal ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("listarChats")}
              style={[styles.button, { marginRight: 16 }]}
            >
              <Text style={styles.buttonText}>Ver interessados</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleDelete}>
              <Text style={styles.buttonText}>Remover pet</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleTenhoInteresse}
              style={[styles.button, { marginRight: 16 }]}
            >
              <Text style={styles.buttonText}>Tenho interesse</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </>
  );
};

AnimalDetails.propTypes = {
  route: PropTypes.object.isRequired,
};

export default AnimalDetails;

const styles = StyleSheet.create({
  banner: {
    width: "100%", // Largura de 360 dp
    height: 56, // Altura de 24 dp
    backgroundColor: "#cfe9e5", // Cor de fundo #88c9bf
    flexDirection: "row", // Alinha os itens horizontalmente
    padding: 16, // Espaço à esquerda ajustado para 16dp
    alignItems: "center", // Centraliza os itens verticalmente no banner
  },
  bannerText: {
    color: "#434343", // Cor do texto
    fontSize: 20, // Tamanho do texto 20pt
    fontFamily: "Roboto_500Medium", // Fonte Roboto Medium
    textAlign: "left",
    alignContent: "center",
    marginHorizontal: "auto",
  },
  iconButton: {
    borderRadius: 15, // Ajuste este valor conforme necessário para circular ou quadrado
    width: 30, // Ajuste conforme necessário
    height: 30, // Ajuste conforme necessário
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent", // Ajuste a cor de fundo conforme necessário
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "auto",
    minWidth: 360, // Largura mínima da imagem 360dp
    maxWidth: 400, // Largura da imagem 360dp
    height: 184, // Altura da imagem 184dp
  },
  petName: {
    fontFamily: "Roboto_500Medium", // Certifique-se de que a fonte Roboto Medium está disponível
    fontWeight: "bold",
    fontSize: 16,
    color: "#434343",
    margin: 16,
  },
  detailContainer: {
    flexDirection: "column",
    marginHorizontal: 16,
  },
  divider: {
    borderBottomColor: "#e0e0e0", // Cor da linha divisória
    borderBottomWidth: 0.8, // Espessura da linha divisória
    marginHorizontal: 16, // Garante que a linha tenha a mesma margem lateral
    marginTop: 16, // Espaçamento acima da linha
    marginBottom: 16, // Espaçamento abaixo da linha
  },
  label: {
    fontWeight: "bold",
    textTransform: "uppercase", // Transforma o texto em maiúsculas
    fontFamily: "Roboto_400Regular", // Mudança para Roboto Regular
    fontSize: 12, // Tamanho do texto para 12px
    color: "#589b9b", // Cor do texto para #589b9b
    marginTop: 16,
    marginBottom: 8,
  },
  value: {
    fontFamily: "Roboto_400Regular", // Define a fonte para Roboto Regular
    fontSize: 14, // Define o tamanho da fonte para 14px
    color: "#757575", // Define a cor do texto para #757575
    marginBottom: 16, // Define a margem final para 16px
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 28,
    marginHorizontal: "auto",
  },
  buttonText: {
    textTransform: "uppercase", // Transforma o texto em maiúsculas
    fontSize: 12,
    fontWeight: "bold",
    includeFontPadding: true,
    color: "#757575",
  },
  button: {
    width: "45%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#88c9bf",
    borderWidth: 2,
    borderColor: "#88c9bf",
    boxShadow:
      "0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)",
  },
  floatingButton: {
    width: 56, // 56dp
    height: 56, // 56dp
    backgroundColor: "#fafafa",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 28, // Metade da largura/altura para tornar o botão circular
    position: "absolute", // Posicionamento absoluto para flutuar
    right: 20, // 20dp do lado direito da tela
    top: 160, // 20dp do fundo da tela
    elevation: 4, // Sombra para Android
    shadowColor: "#000", // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
