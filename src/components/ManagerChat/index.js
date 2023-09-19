import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import firebase from '../../../firebase'; // Importe o Firebase configurado no seu projeto

const ManagerChat = ({ conversationId }) => {
    const handleDeleteConversation = () => {
      // Exiba um diálogo de confirmação antes de excluir a conversa
      Alert.alert(
        'Excluir Conversa',
        'Tem certeza de que deseja excluir esta conversa?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Excluir',
            style: 'destructive',
            onPress: () => {
              // Referência para a conversa que será excluída
              const conversationRef = firebase.database().ref(`conversations/${conversationId}`);
  
              // Exclua a conversa do Firebase Realtime Database
              conversationRef.remove()
                .then(() => {
                  // A conversa foi excluída com sucesso
                  console.log('Conversa excluída com sucesso!');
                })
                .catch((error) => {
                  // Ocorreu um erro ao excluir a conversa
                  console.error('Erro ao excluir a conversa:', error);
                });
            },
          },
        ],
        { cancelable: true }
      );
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Gerenciador de Conversas</Text>
        <Button
          title="Excluir Conversa"
          onPress={handleDeleteConversation}
          color="#FF0000" // Cor do botão de exclusão
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16,
    },
  });
  
  export default ManagerChat;
  