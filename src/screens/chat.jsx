import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  onSnapshot,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Textfield from "../components/textField";
import Button from "../components/button";
import { auth } from "../services/firebaseUtils";

export default function Chat({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const chatId = "testRoom";

  useEffect(() => {
    const db = getFirestore();
    setMessages([]);

    const unsubscribe = onSnapshot(
      collection(db, "chatRooms/" + chatId + "/messages"),
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

  function enviarMensagem() {
    const db = getFirestore();

    const docRef = doc(collection(db, "chatRooms/" + chatId + "/messages"));
    setDoc(docRef, {
      content: message,
      timestamp: new Date(),
      author: doc(db, "/users/" + auth.currentUser.uid),
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
      })
      .finally(() => {
        setMessage("");
      });
  }

  return (
    <View style={{ minHeight: "90%" }}>
      <ScrollView
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: 16,
          paddingBottom: 100,
          maxHeight: "80%",
        }}
      >
        {messages.map((message, index) => (
          <MessageComponnent key={index} message={message} />
        ))}
      </ScrollView>
      <View style={{ borderTopWidth: 1, borderTopColor: "black" }}>
        <Textfield
          placeholder="Digite sua mensagem"
          value={message}
          onChangeText={setMessage}
        />
        <Button
          onPress={enviarMensagem}
          label="Enviar"
          backgroundColor="#33FF44"
          textColor="#000000"
        />
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
              backgroundColor: "#33FF44",
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
