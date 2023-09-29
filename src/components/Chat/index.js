import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { auth, database } from "../../../firebaseConfig";
import useConversationStore from "../../../reducer";
import useFrienIdStoreStore from "../../../reducer";
import { format } from "date-fns";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";
import { groupBy } from "lodash";



const Chat = () => {
  const conversationId = useConversationStore((state) => state.conversationId);
  const friendId = useFrienIdStoreStore((state) => state.friendId);
  const [userProfileImage, setUserProfileImage] = useState(null);
  const [userName, setUsername] = useState("");
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  if (!conversationId) {
    return (
      <View>
        <Text>Erro: ID da conversa não definido.</Text>
      </View>
    );
  }
  const uid = auth.currentUser.uid;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Carregar mensagens da conversa
    const messagesRef = database.ref(
      `conversations/${conversationId}/messages`
    );
    messagesRef.on("value", (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        const messagesArray = Object.values(messagesData).map((message) => ({
          ...message,
          // Converta o timestamp para uma string de data e hora legível
          timestamp: format(new Date(message.timestamp), "dd/MM/yy HH:mm"),
        }));

        // Ordene as mensagens pelo timestamp antes de renderizá-las
        messagesArray.sort((a, b) => a.timestamp - b.timestamp);

        setMessages(messagesArray);
      }
    });

    // Retornar função de limpeza ao desmontar o componente
    return () => {
      messagesRef.off(); // Parar de ouvir as alterações
    };
  }, [conversationId]);
  useEffect(() => {
    // Verifique se o UID do usuário está disponível no módulo de autenticação
    //const userUid = (`auth.currentUser.${uid}`);
    const uid = auth.currentUser.uid;
    console.log(uid);
    if (!uid) {
      // Lidar com a situação em que o UID do usuário não está disponível
      console.error("UID do usuário não encontrado.");
      return;
    }

    // Carregue os dados do usuário (imagem de perfil) do Realtime Database
    const userRef = database.ref(`users/${friendId}`);

    userRef.on("value", (snapshot) => {
      const userData = snapshot.val();
      //console.log('userData:', userData); // Verifique se userData.profileImage está correto
      if (userData && userData.profileImage && userData.name) {
        setUserProfileImage(userData.profileImage);
        setUsername(userData.name);
      }
    });

    // Carregue a lista de conversas do usuário do Realtime Database
    //const conversationsRef = database.ref(`users/${userUid}/conversations`);
    //conversationsRef.on('value', (snapshot) => {
    //  const conversationsData = snapshot.val();
    //  if (conversationsData) {
    //    const conversationsArray = Object.values(conversationsData);
    //    setConversations(conversationsArray);
    //  }
    //});
  }, []);

  const handleSend = () => {
    // Enviar a nova mensagem para a conversa
    const timestamp = Date.now();
    const newMessageData = {
      senderUid: uid,
      text: newMessage,
      timestamp,
    };
    const newMessageRef = database
      .ref(`conversations/${conversationId}/messages`)
      .push();
    newMessageRef.set(newMessageData);

    // Limpar a caixa de texto de entrada
    setNewMessage("");
  };

  const renderMessage = ({ item, index }) => {
    // Verifique se a mensagem foi enviada pelo usuário atual
    const isCurrentUser = item.senderUid === uid;

    return (
        <View
          style={[
            styles.messageContainer,
            isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage,
          ]}
          key={index} // Use o índice como chave, pois as mensagens têm o mesmo horário
        >
          <Text style={styles.messageText}>{item.text}</Text>
          <Text style={styles.messageTimestamp}>{item.timestamp}</Text>
        </View>
      );
    };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon name="arrow-left-long" color={"white"} size={23} style={styles.headerIcon} />
        </TouchableOpacity>
        <View style={styles.headerUserInfo}>
          <Text style={styles.textProfileName}>{userName}</Text>
          <Image source={{ uri: userProfileImage }} style={styles.profileImage} />
        </View>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesContainer}
        inverted // Para exibir as mensagens mais recentes no topo
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
          placeholder="Digite sua mensagem"
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSend}>
          <Text>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E4E1DD", // Cor de fundo
  },
  messagesContainer: {
    padding: 16,
    flexGrow: 1,
  },
  messageContainer: {
    maxWidth: "80%", // Largura máxima das mensagens
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
  },
  currentUserMessage: {
    alignSelf: "flex-end", // Mensagens do usuário atual à direita
    backgroundColor: "#1B0A3E", // Cor de fundo para mensagens do usuário atual
  },
  otherUserMessage: {
    alignSelf: "flex-start", // Mensagens de outros usuários à esquerda
    backgroundColor: "#BAEFA5", // Cor de fundo para mensagens de outros usuários
  },
  messageText: {
    fontSize: 16,
    color: "#fff", // Cor do texto das mensagens
  },
  messageTimestamp: {
    fontSize: 12,
    color: "#888", // Cor do texto do timestamp das mensagens
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },

  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "black",
  },
  textProfileName: {
    color: "#F10808",
    fontWeight: "bold",
    fontSize: 20,
    marginEnd: 20,
  },
  header: {
  },
  image: {
    alignItems: "flex-end",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1B0A3E",
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 80, // Altura do cabeçalho personalizado
    borderBottomLeftRadius: 60,
  },
  headerIcon: {
    fontSize: 23,
    color: "white",
  },
  headerUserInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Chat;
