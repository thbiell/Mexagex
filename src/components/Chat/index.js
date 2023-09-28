// Tela de Chat
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { auth, database } from '../../../firebaseConfig';

const Chat = ({route}) => {
  const { conversationId } = route.params;
  if (!conversationId) {
    return (
      <View>
        <Text>Erro: ID da conversa não definido.</Text>
      </View>
    );
  }
  const uid = auth.currentUser.uid;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Carregar mensagens da conversa
    const messagesRef = database.ref(`conversations/${conversationId}/messages`);
    messagesRef.on('value', (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        const messagesArray = Object.values(messagesData);
        setMessages(messagesArray);
      }
    });

    // Retornar função de limpeza ao desmontar o componente
    return () => {
      messagesRef.off(); // Parar de ouvir as alterações
    };
  }, [conversationId]);

  const handleSend = () => {
    // Enviar a nova mensagem para a conversa
    const timestamp = Date.now();
    const newMessageData = {
      senderUid: uid,
      text: newMessage,
      timestamp,
    };
    const newMessageRef = database.ref(`conversations/${conversationId}/messages`).push();
    newMessageRef.set(newMessageData);

    // Limpar a caixa de texto de entrada
    setNewMessage('');
  };

  return (
    <View>
      <Text>Tela de Chat</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.timestamp.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.text}</Text>
          </View>
        )}
      />
      <View>
        <TextInput
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
          placeholder="Digite sua mensagem"
        />
        <TouchableOpacity onPress={handleSend}>
          <Text>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;
