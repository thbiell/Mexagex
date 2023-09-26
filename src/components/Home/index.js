import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, database } from '../../../firebaseConfig';

const Home = () => {
  const [userProfileImage, setUserProfileImage] = useState(null);
  const [userName, setUsername] = useState('');
  const [conversations, setConversations] = useState([]);
  const navigation = useNavigation();
  // Função para carregar dados do usuário e conversas ao carregar a tela
  useEffect(() => {
    // Verifique se o UID do usuário está disponível no módulo de autenticação
    //const userUid = (`auth.currentUser.${uid}`);
    const uid = auth.currentUser.uid;
    console.log(uid)
    if (!uid) {
      // Lidar com a situação em que o UID do usuário não está disponível
      console.error('UID do usuário não encontrado.');
      return;
    }

    // Carregue os dados do usuário (imagem de perfil) do Realtime Database
    const userRef = database.ref(`users/${uid}`);


    userRef.on('value', (snapshot) => {
      const userData = snapshot.val();
      console.log('userData:', userData); // Verifique se userData.profileImage está correto
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

  // Função para navegar para a tela de chat quando uma conversa for selecionada
  const navigateToChat = (conversationId) => {
    navigation.navigate('Chat', { conversationId });
  };

  return (
    <View>
      {/* Cabeçalho com a imagem de perfil */}
      <View>
        
          <Image source={{ uri: userProfileImage }} style={{ width: 50, height: 50, borderRadius: 25 }} />
        
          <Text style={{ marginLeft: 10, color:'black' }}>{userName}</Text>
      </View>

      {/* Lista de conversas */}
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToChat(item.id)}>
            <Text>{item.name}</Text>
            {/* Outras informações da conversa */}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Home;
