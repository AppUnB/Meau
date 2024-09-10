import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

export default function ListarChats({ route, navigation }) {
  async function listarChatsQueSouDono() {
    const auth = getAuth();
    const userId = auth.currentUser.uid;

    const db = getFirestore();

    const userRef = doc(db, "users", userId);

    const q = query(
      collection(db, "chatRooms"),
      where("idDono", "==", userRef)
    );

    try {
      const querySnapshot = await getDocs(q);
      const chatList = await Promise.all(
        querySnapshot.docs.map(async (document) => {
          const data = document.data();

          const interessadoRef = data.idInteressado;
          const interessado = await getDoc(interessadoRef);
          const interessadoData = { id: interessado.id, ...interessado.data() };

          const animalRef = data.idAnimal;
          const animal = await getDoc(animalRef);
          const animalData = { id: animal.id, ...animal.data() };

          return {
            id: document.id,
            interessado: interessadoData,
            animal: animalData,
          };
        })
      );
      return chatList;
    } catch (error) {
      console.error("Error querying documents: ", error);
    }
  }

  async function listarChatsQueSouInteressado() {
    const auth = getAuth();
    const userId = auth.currentUser.uid;

    const db = getFirestore();

    const userRef = doc(db, "users", userId);

    const q = query(
      collection(db, "chatRooms"),
      where("idInteressado", "==", userRef)
    );

    try {
      const querySnapshot = await getDocs(q);
      const chatList = await Promise.all(
        querySnapshot.docs.map(async (document) => {
          const data = document.data();

          const animalRef = data.idAnimal;
          const animal = await getDoc(animalRef);
          const animalData = { id: animal.id, ...animal.data() };

          const donoRef = data.idDono;
          const dono = await getDoc(donoRef);
          const donoData = { id: dono.id, ...dono.data() };

          return {
            id: document.id,
            dono: donoData,
            animal: animalData,
          };
        })
      );
      return chatList;
    } catch (error) {
      console.error("Error querying documents: ", error);
    }
  }

  const [meusChats, setMeusChats] = useState([]);
  const [chatsInteressado, setChatsInteressado] = useState([]);

  useEffect(() => {
    listarChatsQueSouDono().then((chats) => {
      setMeusChats(chats);
    });
    listarChatsQueSouInteressado().then((chats) => {
      setChatsInteressado(chats);
    });
  }, []);

  function handleRedirectToChat(chatId) {
    navigation.navigate("chat", { idChat: chatId });
  }

  return (
    <View>
      <Text style={styles.title}>Interessados nos meus animais</Text>
      {meusChats.map((chat) => (
        <Pressable key={chat.id} onPress={() => handleRedirectToChat(chat.id)}>
          <ChatCard chat={chat} />
        </Pressable>
      ))}
      <Text style={styles.title}>Animais em que eu estou interessado</Text>
      {chatsInteressado.map((chat) => (
        <Pressable key={chat.id} onPress={() => handleRedirectToChat(chat.id)}>
          <ChatCard chat={chat} />
        </Pressable>
      ))}
    </View>
  );
}

function ChatCard({ chat, dono }) {
  return (
    <View
      style={{
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "lightgray",
        display: "flex",
        flexDirection: "row",
        padding: 8,
        width: "100%",
      }}
    >
      <Image
        source={{ uri: chat.animal.imageUrl }}
        style={styles.animalImage}
        resizeMode="cover"
        alt="Foto do animal"
      />
      <View
        style={{
          display: "flex",
          flexDirection: "col",
          justifyContent: "space-evenly",
          marginLeft: 8,
          flex: 1,
        }}
      >
        <Text style={{ width: "100%", textAlign: "left" }}>
          Animal: {chat.animal.nome}
        </Text>
        <Text style={{ width: "100%", textAlign: "right", paddingRight: 8 }}>
          {chat.dono
            ? "Dono: " + chat.dono.nome
            : "Interessado: " + chat.interessado.nome}
        </Text>
      </View>
      <Image
        source={{
          uri: chat.dono ? chat.dono.imageUrl : chat.interessado.imageUrl,
        }}
        style={styles.animalImage}
        resizeMode="cover"
        alt="Foto do animal"
      />
    </View>
  );
}
export const styles = StyleSheet.create({
  animalImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 8,
  },
});
