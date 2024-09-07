import { View, Text, Pressable } from "react-native";
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
      <Text>Interessados nos meus animais</Text>
      {meusChats.map((chat) => (
        <View key={chat.id}>
          <Pressable
            onPress={() => {
              handleRedirectToChat(chat.id);
            }}
          >
            <Text>
              {chat.animal.nome} - {chat.interessado.nome}
            </Text>
          </Pressable>
        </View>
      ))}
      <Text>Animais em que eu estou interessado</Text>
      {chatsInteressado.map((chat) => (
        <View key={chat.id}>
          <Pressable
            onPress={() => {
              handleRedirectToChat(chat.id);
            }}
          >
            <Text>
              {chat.animal.nome} - {chat.dono.nome}
            </Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}
