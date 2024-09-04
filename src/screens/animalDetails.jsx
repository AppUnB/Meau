import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getAnimalById } from "../services/animalService";

const AnimalDetails = ({ route }) => {
  const [animal, setAnimal] = useState(null);

  const { id } = route.params;

  useEffect(() => {
    async function fetchAnimal() {
      const animalData = await getAnimalById(id);
      if (animalData) {
        setAnimal(animalData);
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

  const renderDetail = (label, value) => (
    <View style={styles.detailContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  console.log(animal);
  return (
    <>
      <View style={styles.banner}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => console.log("Voltar")}
        >
          <Icon name="arrow-back" size={24} color="#434343" />
        </TouchableOpacity>
        <Text style={styles.bannerText}>{animal.nome}</Text>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => console.log("Compartilhando")}
        >
          <Icon name="share" size={24} color="#434343" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: animal.imageUrl }}
            style={styles.image}
            resizeMode="center"
          />
        </View>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => console.log("Editando")}
        >
          <Icon name="edit" size={24} color="#434343" />
        </TouchableOpacity>
        <Text style={styles.petName}>{animal.petName}</Text>
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          {renderDetail("Sexo", animal.sexo)}
          {renderDetail("Porte", animal.porte)}
          {renderDetail("Idade", animal.idade)}
        </View>
        {renderDetail("Localização", animal.location)}
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
        {renderDetail(` ${animal.nome} Precisa de`, animal.necessidade)}
        <View style={styles.divider} />
        {renderDetail(`Mais sobre ${animal.nome}`, animal.about)}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, { marginRight: 16 }]}>
            <Text style={styles.buttonText}>Ver interessados</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Remover pet</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: "space-between", // Espaçamento entre os itens
    alignItems: "center", // Centraliza os itens verticalmente no banner
  },
  bannerText: {
    color: "#434343", // Cor do texto
    fontSize: 20, // Tamanho do texto 20pt
    fontFamily: "Roboto_500Medium", // Fonte Roboto Medium
    textAlign: "left",
    alignContent: "center",
  },
  iconButton: {
    // Para um limite circular, use borderRadius com metade do tamanho (altura ou largura)
    // Para um limite quadrado, ajuste o borderRadius conforme desejado ou remova esta linha
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
