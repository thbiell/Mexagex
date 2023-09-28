import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { auth, database } from '../../../firebaseConfig';
import useConversationStore from '../../../reducer';
import { format } from 'date-fns';

const Chat = () => {
  const conversationId = useConversationStore((state) => state.conversationId);
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
        const messagesArray = Object.values(messagesData).map((message) => ({
          ...message,
          // Converta o timestamp para uma string de data e hora legível
          timestamp: format(new Date(message.timestamp), 'dd/MM/yyyy HH:mm:ss'),
        }));
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

  const renderMessage = ({ item }) => {
    // Verifique se a mensagem foi enviada pelo usuário atual
    const isCurrentUser = item.senderUid === uid;

    return (
      <View style={[styles.messageContainer, isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage]}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.messageTimestamp}>{item.timestamp}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.timestamp.toString()}
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
    backgroundColor: '#E4E1DD', // Cor de fundo
  },
  messagesContainer: {
    padding: 16,
    flexGrow: 1,
  },
  messageContainer: {
    maxWidth: '80%', // Largura máxima das mensagens
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
  },
  currentUserMessage: {
    alignSelf: 'flex-end', // Mensagens do usuário atual à direita
    backgroundColor: '#1B0A3E', // Cor de fundo para mensagens do usuário atual
  },
  otherUserMessage: {
    alignSelf: 'flex-start', // Mensagens de outros usuários à esquerda
    backgroundColor: '#BAEFA5', // Cor de fundo para mensagens de outros usuários
  },
  messageText: {
    fontSize: 16,
    color: '#fff', // Cor do texto das mensagens
  },
  messageTimestamp: {
    fontSize: 12,
    color: '#888', // Cor do texto do timestamp das mensagens
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
});

export default Chat;
