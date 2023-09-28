import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, database } from '../../../firebaseConfig';
const backImage = require("../../assets/logoW.png");
import useConversationStore from '../../../reducer';


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

  // Função para navegar para a tela de chat quando uma conversa for selecionada
  const navigateToChat = (conversationId) => {
    navigation.navigate('Chat', { conversationId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.linearGradient}>
        <Image source={backImage} style={styles.logoImage} />
        <View style={styles.image}>
          <Image source={{ uri: userProfileImage }} style={styles.profileImage} />
          <Text style={styles.textProfileName}>
            {userName}
          </Text>
        </View>
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E1DD',
  },
  linearGradient: {
    borderBottomLeftRadius: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1B0A3E',
    padding: 8,
  },
  profileImage: {
    marginTop: 15,
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'black',
    marginRight: 20,
  },
  logoImage: {
    width: 100,
    height: 60,
    marginLeft: 20,
    resizeMode: 'contain',
  },
  textProfileName: {
    color: '#F10808',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
  },
  image: {
    alignItems: 'flex-end',
  },
})

export default Home;
