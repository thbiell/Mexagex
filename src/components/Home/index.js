import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, database } from '../../../firebaseConfig';
import LinearGradient from 'react-native-linear-gradient';


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
//colors={['#5FFBF1', '#00e4ff', '#44a4ff', '#c957ce', '#c348b5', '#cb3aab', '#d3279f', '#d90092', '#ea0074', '#f11256', '#f03737', '#e75312']}
  return (
    <View style={styles.container}>
      {/* Cabeçalho com a imagem de perfil */}
      <View >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#D16BA5', '#86A8E7', '#5FFBF1']}
          style={styles.linearGradient}
        >
          <View style={styles.image}>
            <Image source={{ uri: userProfileImage }} style={styles.profileImage} />
            <Text style={styles.textProfileName}>
              {userName}
            </Text>
          </View>
          <Text style={styles.textTitle}>
            Mexagex
          </Text>
        </LinearGradient>


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
    flex: 1
  },
  linearGradient: {
    borderBottomLeftRadius: 60,
    flexDirection: 'row-reverse'
  },
  profileImage: {
    marginTop: 15,
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'black',
    marginRight: 20,
  },
  textProfileName: {
    color: 'pink',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
    marginRight: 10,
  },
  textTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
    marginLeft: 10,
    alignItems: 'flex-start'
  },
  image: {
    alignItems: 'flex-end',
  },
})
export default Home;
