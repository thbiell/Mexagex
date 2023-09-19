import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from '../../../firebase'; // Importe o Firebase configurado no seu projeto

const ChatFeed = ({ navigation }) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    // Referência para o nó de conversas no Firebase Realtime Database
    const conversationsRef = firebase.database().ref('conversations');
  
    // Use o método 'on' para ouvir alterações nas conversas
    conversationsRef.on('value', (snapshot) => {
      // Transforme os dados do snapshot em um array de conversas
      const conversationData = snapshot.val();
      const conversationArray = Object.keys(conversationData).map((key) => ({
        id: key,
        ...conversationData[key],
      }));
  
      // Atualize o estado 'conversations' com as conversas carregadas
      setConversations(conversationArray);
    });
  
    // Retorne uma função de limpeza para interromper a escuta quando o componente for desmontado
    return () => {
      conversationsRef.off('value');
    };
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

export default ChatFeed;
