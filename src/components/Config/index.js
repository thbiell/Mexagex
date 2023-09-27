import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { signOut } from '@react-native-firebase/auth';
import { auth, database } from '../../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';


const Config = () => {
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [userProfileImage, setUserProfileImage] = useState(null);
  const [userName, setUsername] = useState('');
  const navigation = useNavigation();
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
}, []);

  const handleLogout = async () => {
    if (confirmLogout) {
      try {
        await signOut(auth); // Faça logout
        navigation.navigate("Register"); // Navegue de volta para a tela de cadastro
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    } else {
      // Se o usuário ainda não confirmou o logout, mostre uma mensagem de confirmação
      Alert.alert(
        'Sair da Conta',
        'Tem certeza de que deseja sair da sua conta?',
        [
          {
            text: 'Cancelar',
            onPress: () => setConfirmLogout(false),
            style: 'cancel',
          },
          {
            text: 'Sair',
            onPress: () => setConfirmLogout(true),
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Configurações da Conta
        </Text>
      </View>
      {/* Ícone de logout como botão */}
      <TouchableOpacity onPress={handleLogout}>
        <Icon name="exit-to-app" size={36} color="#1B0A3E" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Config;
