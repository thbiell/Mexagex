import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { auth, database } from '../../../firebaseConfig';
import Icon from 'react-native-vector-icons/Feather'; 

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [newFriendEmail, setNewFriendEmail] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    // Recupere a lista de amigos do banco de dados Firebase
    const uid = auth.currentUser.uid;
    const friendsRef = database.ref(`users/${uid}/friends`);

    friendsRef.on('value', async (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Converta os dados em um array de contatos
        const contactList = Object.values(data);

        // Busque informações adicionais (nome e foto) para cada amigo
        const contactsWithDetails = await Promise.all(contactList.map(async (contact) => {
          const userSnapshot = await database.ref('users')
            .orderByChild('email')
            .equalTo(contact.email)
            .once('value');
          const userData = userSnapshot.val();
          if (userData) {
            const user = Object.values(userData)[0];
            return {
              ...contact,
              uid: { uid },
              name: user.name, // Substitua 'name' pelo nome correto no seu banco de dados
              photoURL: user.profileImage, // Substitua 'profileImage' pelo nome correto no seu banco de dados
            };
          }
          return contact;
        }));

        setContacts(contactsWithDetails);
        setFilteredContacts(contactsWithDetails); // Inicialmente, os contatos filtrados são os mesmos que os contatos totais
      }
    });
  }, []);

  // Função para adicionar um novo amigo
  const addFriend = () => {
    if (newFriendEmail) {
      // Verifique se o email do novo amigo já não está na lista de contatos
      if (!contacts.some((contact) => contact.email === newFriendEmail)) {
        const currentUser = auth.currentUser;
        const currentUid = currentUser.uid; // Obtenha o UID do usuário atual

        // Verifique se o email existe em algum usuário no Realtime Database e obtenha o UID do amigo
        database.ref('users')
          .orderByChild('email')
          .equalTo(newFriendEmail)
          .once('value')
          .then((snapshot) => {
            if (snapshot.exists()) {
              const userData = snapshot.val();
              const friendUid = Object.keys(userData)[0]; // Obtenha a primeira chave, que é o UID do amigo

              // Adicione o novo amigo à lista de contatos do usuário atual
              const userRef = database.ref(`users/${currentUid}`);
              const newFriendRef = userRef.child('friends').push();
              newFriendRef.set({ email: newFriendEmail, uid: friendUid }); // Use o UID do novo amigo

              // Adicione o usuário atual à lista de contatos do novo amigo
              const friendRef = database.ref(`users/${friendUid}`);
              const newFriendForFriendRef = friendRef.child('friends').push();
              newFriendForFriendRef.set({ email: currentUser.email, uid: currentUid }); // Use o UID do usuário atual

              // Atualize os contatos filtrados
              setFilteredContacts((prevFilteredContacts) => [
                ...prevFilteredContacts,
                { email: newFriendEmail, uid: friendUid }, // Use o UID do novo amigo
              ]);
            } else {
              // O email do amigo não existe no Realtime Database
              console.log('Este email não pertence a nenhum usuário.');
              Alert.alert('Este email não pertence a nenhum usuário.');
              // Você pode exibir um alerta ou mensagem informando que o email não existe
            }
          })
          .catch((error) => {
            console.error('Erro ao verificar o email:', error);
          });
      } else {
        // O amigo já está na lista de contatos
        console.log('Este amigo já está na sua lista de contatos.');
        Alert.alert('Este amigo já está na sua lista de contatos.');
      }
    }
  };

  // Função para filtrar os contatos com base no texto de pesquisa
  const filterContacts = (text) => {
    setSearchEmail(text);
    if (text) {
      const filtered = contacts.filter((contact) =>
        contact.email.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(contacts);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginBottom: 20 }}>
        Meus Contatos
      </Text>
      <View style={styles.inputContainer}>
        <Icon name="search" color={'black'} size={23} style={styles.inputIcon} />
        <TextInput
          placeholder="Pesquisar por email"
          onChangeText={filterContacts} // Use a função de filtro ao digitar
          value={searchEmail}
          style={styles.input}
        />
      </View>
      <FlatList
        data={filteredContacts} // Use os contatos filtrados
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => {
              // Adicione ação para lidar com a seleção de um contato
            }}
          >
            <Image source={{ uri: item.photoURL }} style={styles.contactImage} />
            <View>
              <Text>{item.name}</Text>
              <Text>{item.email}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email do novo amigo"
          onChangeText={(text) => setNewFriendEmail(text)}
          value={newFriendEmail}
          style={styles.input}
        />
        <TouchableOpacity style={styles.addButton} onPress={addFriend}>
          <Text style={styles.addButtonText}>Adicionar Amigo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#E4E1DD', // Cor de fundo
    borderRadius: 8, // Borda arredondada
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
  inputIcon: {
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: '#1B0A3E',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Contacts;
