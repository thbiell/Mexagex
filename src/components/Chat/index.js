import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import firebase from '../../../firebase'; // Importe seu arquivo de configuração do Firebase

const Chat = ({ userId, contactId }) => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  const messagesRef = firebase.database().ref('messages');

  // Função para enviar uma mensagem
  const sendMessage = () => {
    if (text.trim() === '') return;

    const newMessageRef = messagesRef.push();
    const newMessage = {
      id: newMessageRef.key,
      text,
      senderId: userId,
    };

    newMessageRef.set(newMessage);
    setText('');
  };

  // Carrega as mensagens existentes do Firebase
  useEffect(() => {
    const loadMessages = async () => {
      const snapshot = await messagesRef
        .orderByChild('senderId')
        .equalTo(userId)
        .once('value');
      const messagesData = snapshot.val();
      if (messagesData) {
        const messagesArray = Object.values(messagesData);
        setMessages(messagesArray);
      }
    };

    loadMessages();
  }, [userId]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: item.senderId === userId ? 'lightblue' : 'lightgreen',
              padding: 8,
              borderRadius: 8,
              marginVertical: 4,
              maxWidth: '70%',
              alignSelf: item.senderId === userId ? 'flex-end' : 'flex-start',
            }}
          >
            <Text>{item.text}</Text>
          </View>
        )}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: 'gray', borderRadius: 4, padding: 8 }}
          placeholder="Digite uma mensagem..."
          value={text}
          onChangeText={(newText) => setText(newText)}
        />
        <TouchableOpacity onPress={sendMessage} style={{ marginLeft: 8 }}>
          <Text style={{ color: 'blue' }}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;
