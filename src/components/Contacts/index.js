import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importe o ícone da lixeira
import firebase from '../../../firebase'; // Importe o Firebase configurado no seu projeto

const Contacts = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Carregue os contatos do Firebase Realtime Database
    const loadContacts = async () => {
      try {
        const snapshot = await firebase.database().ref('contacts').once('value');
        const contactsData = snapshot.val();
        if (contactsData) {
          const contactsArray = Object.values(contactsData);
          setContacts(contactsArray);
        }
      } catch (error) {
        console.error('Erro ao carregar contatos:', error);
      }
    };

    loadContacts();
  }, []);

  const handleAddToGroup = (contactId) => {
    // Implemente a lógica para adicionar o contato a um grupo
    // Por exemplo, você pode atualizar o grupo no Firebase Realtime Database
    try {
      // Substitua 'groupId' pelo ID do grupo em que deseja adicionar o contato
      const groupId = 'groupId'; // ID do grupo
      firebase.database().ref(`groups/${groupId}/contacts`).push(contactId);
      Alert.alert('Contato adicionado ao grupo com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar contato ao grupo:', error);
    }
  };

  const handleDeleteContact = (contactId) => {
    // Implemente a lógica para excluir o contato
    // Por exemplo, você pode excluir o contato do Firebase Realtime Database
    try {
      firebase.database().ref(`contacts/${contactId}`).remove();
      Alert.alert('Contato excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir contato:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.contactItem}>
            <Text style={styles.contactName}>{item.name}</Text>
            <TouchableOpacity
              onPress={() => handleAddToGroup(item.id)}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>Adicionar ao Grupo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDeleteContact(item.id)}
              style={styles.deleteButton}
            >
              <Icon name="trash" size={20} color="red" />
            </TouchableOpacity>
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
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
  contactName: {
    flex: 1,
    fontSize: 18,
  },
  addButton: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
  },
  deleteButton: {
    marginLeft: 8,
  },
});

export default Contacts;
