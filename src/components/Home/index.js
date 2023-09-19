import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from '../../../firebase';// Importe o Firebase configurado no seu projeto

const Home = ({ navigation }) => {
  const [conversations, setConversations] = useState([]);

  // Suponha que você tenha uma função para carregar as conversas do Firebase Realtime Database aqui.
  useEffect(() => {
    // Carregue as conversas do Firebase e atualize o estado 'conversations' com os dados.
    // Por exemplo:
    // const loadedConversations = await loadConversations();
    // setConversations(loadedConversations);
  }, []);

  const handleChatPress = (conversationId) => {
    // Navegue para o chat com o ID da conversa
    navigation.navigate('Chat', { conversationId });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleChatPress(item.id)} style={styles.chatItem}>
            {/* Aqui, você pode renderizar as informações da conversa, como nome do contato, última mensagem, etc. */}
            <Text style={styles.contactName}>{item.contactName}</Text>
            <Text style={styles.lastMessage}>{item.lastMessage}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 14,
    color: '#777777',
  },
});

export default Home;
