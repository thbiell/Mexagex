import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import firebase from '../../../firebase'; // Importe o Firebase configurado no seu projeto
import loadUserData from './loadUserData'; // Importe a função para carregar os dados do usuário

const Profile = ({ userId }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Carregue os dados do usuário usando a função loadUserData
        const loadedUserData = await loadUserData(userId);
        setUserData(loadedUserData);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <View style={styles.container}>
      {userData ? (
        <>
          <Image source={{ uri: userData.photoUrl }} style={styles.avatar} />
          <Text style={styles.displayName}>{userData.displayName}</Text>
          <Text style={styles.email}>{userData.email}</Text>
          {/* Adicione outros campos de perfil aqui, como idade, cidade, etc. */}
        </>
      ) : (
        <Text style={styles.loading}>Carregando...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  displayName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#777777',
  },
  loading: {
    fontSize: 18,
    color: '#777777',
  },
});

export default Profile;
