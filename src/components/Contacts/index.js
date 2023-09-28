import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { auth, database } from '../../../firebaseConfig';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';




const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [newFriendEmail, setNewFriendEmail] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const navigation = useNavigation();



  useEffect(() => {
    const uid = auth.currentUser.uid;
    const friendsRef = database.ref(`users/${uid}/friends`);

    friendsRef.on('value', async (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const contactList = Object.values(data);
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
              name: user.name,
              photoURL: user.profileImage,
            };
          }
          return contact;
        }));

        setContacts(contactsWithDetails);
        setFilteredContacts(contactsWithDetails);
      }
    });
  }, []);

  const addFriend = () => {
    if (newFriendEmail) {
      if (!contacts.some((contact) => contact.email === newFriendEmail)) {
        const currentUser = auth.currentUser;
        const currentUid = currentUser.uid;
        database.ref('users')
          .orderByChild('email')
          .equalTo(newFriendEmail)
          .once('value')
          .then((snapshot) => {
            if (snapshot.exists()) {
              const userData = snapshot.val();
              const friendUid = Object.keys(userData)[0];
              const userRef = database.ref(`users/${currentUid}`);
              const newFriendRef = userRef.child('friends').push();
              newFriendRef.set({ email: newFriendEmail, uid: friendUid });
              const friendRef = database.ref(`users/${friendUid}`);
              const newFriendForFriendRef = friendRef.child('friends').push();
              newFriendForFriendRef.set({ email: currentUser.email, uid: currentUid });
              setFilteredContacts((prevFilteredContacts) => [
                ...prevFilteredContacts,
                { email: newFriendEmail, uid: friendUid },
              ]);
            } else {
              console.log('Este email não pertence a nenhum usuário.');
              Alert.alert('Este email não pertence a nenhum usuário.');
            }
          })
          .catch((error) => {
            console.error('Erro ao verificar o email:', error);
          });
      } else {
        console.log('Este amigo já está na sua lista de contatos.');
        Alert.alert('Este amigo já está na sua lista de contatos.');
      }
    }
  };

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
  const handleContactPress = async (contact) => {
    const currentUser = auth.currentUser;
    const currentUid = currentUser.uid;
  
    // Obtém o email do contato selecionado
    const selectedContactEmail = contact.email;
  
    database.ref('users')
      .orderByChild('email')
      .equalTo(selectedContactEmail)
      .once('value')
      .then(async (snapshot) => {
        const userData = snapshot.val();
  
        if (userData) {
          // Encontrou o usuário com o email selecionado
          const friendUid = Object.keys(userData)[0];
  
          // Gere um ID único para a conversa
          const conversationId = `${currentUid}${friendUid}`;
          console.log(conversationId)
          console.log(friendUid)
          // Verifique se a conversa já existe
          const conversationRef = database.ref(`conversations/${conversationId}`);
          const conversationSnapshot = await conversationRef.once('value');
          
          if (!conversationSnapshot.exists()) {
            // Se a conversa não existir, crie-a
            conversationRef.set({
              participants: [currentUid, friendUid], // Adicione os participantes da conversa
            });
          }
  
          // Agora você pode navegar para a tela de chat com o ID da conversa
          navigation.navigate("Chat", { conversationId });
        } else {
          // Não encontrou nenhum usuário com o email selecionado
          console.log('Não foi possível encontrar o usuário com o email selecionado.');
          Alert.alert('Não foi possível encontrar o usuário com o email selecionado.');
        }
      })
      .catch((error) => {
        console.error('Erro ao verificar o email:', error);
      });
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
          onChangeText={filterContacts}
          value={searchEmail}
          style={styles.input}
        />
      </View>
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => handleContactPress(item)} 
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
    backgroundColor: '#E4E1DD',
    borderRadius: 8,
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
