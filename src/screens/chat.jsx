import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  onSnapshot,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import { auth, getAuth } from "../services/firebaseUtils";
import { enviarNotificacao } from "../services/notificationService";

export default function Chat({ route, navigation }) {
  const { idChat = "testRoom" } = route.params;

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState(null);
  const [dono, setDono] = useState(null);
  const [interessado, setInteressado] = useState(null);

  useEffect(() => {
    const db = getFirestore();
    setMessages([]);

    const chatRef = doc(db, "chatRooms", idChat);
    getDoc(chatRef).then((chat) => {
      setChat(chat);
      getDoc(chat.data().idDono).then((dono) => {
        setDono(dono);
      });
      getDoc(chat.data().idInteressado).then((interessado) => {
        setInteressado(interessado);
      });
    });

    const unsubscribe = onSnapshot(
      collection(db, "chatRooms/" + idChat + "/messages"),
      (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === "added") {
            const newMessage = change.doc.data();
            getDoc(newMessage.author).then((author) => {
              newMessage.author = author.data();
              newMessage.author.id = author.id;
              setMessages((prev) => [...prev, newMessage]);
            });
          }
        });
      }
    );
    return () => unsubscribe();
  }, []);

  async function handleEnviarNotificacao(title, message) {
    if (!chat) return;
    const data = chat.data();

    const donoRef = data.idDono;
    const dono = await getDoc(donoRef);
    if (dono.id !== auth.currentUser.uid) {
      enviarNotificacao(dono.data().pushToken, title, message);
    }

    const interessadoRef = data.idInteressado;
    const interessado = await getDoc(interessadoRef);
    if (interessado.id !== auth.currentUser.uid) {
      enviarNotificacao(interessado.data().pushToken, title, message);
    }
  }

  function enviarMensagem() {
    const db = getFirestore();

    const docRef = doc(collection(db, "chatRooms/" + idChat + "/messages"));
    setDoc(docRef, {
      content: message,
      timestamp: new Date(),
      author: doc(db, "/users/" + auth.currentUser.uid),
    })
      .then(() => {
        handleEnviarNotificacao("Você recebeu uma mensagem", message);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      })
      .finally(() => {
        setMessage("");
      });
  }

  function handleFinalizarConversa() {
    const db = getFirestore();
    const chatRef = doc(db, "chatRooms", idChat);
    deleteDoc(chatRef);
    navigation.reset({
      index: 0,
      routes: [{ name: "listarChats" }],
    });
  }

  function handleTransferirPet() {
    setDoc(
      chat.data().idAnimal,
      { idDono: chat.data().idInteressado },
      { merge: true }
    ).then(() => {
      handleFinalizarConversa();
    });
  }

  return (
    <View style={{ display: "flex", flexDirection: "col", height: "100%" }}>
      {dono?.id === getAuth().currentUser?.uid ? (
        <View
          style={{
            padding: 24,
            backgroundColor: "#dddddd",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "col",
              marginVertical: "auto",
              gap: 8,
            }}
          >
            <Image
              source={{ uri: interessado?.data().imageUrl }}
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
              }}
              resizeMode="cover"
              alt="Foto do interessado"
            />
            <Text>{interessado?.data().nome}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginVertical: "auto",
              justifyContent: "flex-end",
              gap: 16,
            }}
          >
            <Pressable
              style={{
                backgroundColor: "#EE5555",
                padding: 16,
                borderRadius: 8,
                height: "fit-content",
              }}
              onPress={handleFinalizarConversa}
            >
              <Text style={{ color: "#ffffff", margin: "auto" }}>
                Finalizar conversa
              </Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: "#9afcc8",
                padding: 12,
                borderRadius: 8,
              }}
              onPress={handleTransferirPet}
            >
              <Text style={{ color: "black", margin: "auto" }}>
                Transferir Pet
              </Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <></>
      )}
      <ScrollView
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: 16,
          paddingBottom: 100,
          flex: 1,
        }}
      >
        {messages.map((message, index) => (
          <MessageComponnent key={index} message={message} />
        ))}
      </ScrollView>
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: "#aaaaaa",
          paddingTop: 8,
          paddingBottom: 16,
          paddingHorizontal: 8,
          display: "flex",
          flexDirection: "row",
          height: "fit-content",
        }}
      >
        <TextInput
          onChangeText={setMessage}
          placeholder="Digite sua mensagem"
          value={message}
          style={{
            flex: 3,
            padding: 8,
            borderWidth: 1,
            borderColor: "#aaaaaa",
            marginRight: 4,
            borderRadius: 8,
          }}
        />
        <Pressable
          onPress={enviarMensagem}
          style={{
            backgroundColor: "#9afcc8",
            padding: 8,
            textColor: "black",
            flex: 1,
            borderRadius: 6,
          }}
        >
          <Text style={{ textAlign: "center", margin: "auto" }}>Enviar</Text>
        </Pressable>
      </View>
    </View>
  );
}

function MessageComponnent({ message }) {
  return (
    <View
      style={[
        styles.messageBase,
        message.author.id === auth.currentUser.uid
          ? {
              marginLeft: "auto",
              marginRight: 8,
              backgroundColor: "#9afcc8",
            }
          : {
              marginRight: "auto",
              marginLeft: 8,
              backgroundColor: "#B0C4DE",
            },
      ]}
    >
      <Text style={{ textColor: "#888888" }}>{message.author.nome}</Text>
      <Text>{message.content}</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  messageBase: {
    width: "fit",
    maxWidth: "70%",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
});
