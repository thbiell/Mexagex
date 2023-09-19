import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import firebase from '../../../firebase'; // Importe o Firebase configurado no seu projeto


const GroupChat = () => {
    const [groupName, setGroupName] = useState('');
    const [members, setMembers] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [groupCreated, setGroupCreated] = useState(false);
  
    const createGroup = async () => {
      try {
        // Crie o grupo no Firebase Realtime Database
        const groupRef = await firebase.database().ref('groups').push();
        const groupId = groupRef.key;
  
        // Adicione o nome do grupo
        await groupRef.child('groupName').set(groupName);
  
        // Adicione os membros ao grupo
        const membersData = {};
        selectedMembers.forEach((memberId) => {
          membersData[memberId] = true;
        });
        await groupRef.child('members').set(membersData);
  
        // Marque o grupo como criado com sucesso
        setGroupCreated(true);
      } catch (error) {
        console.error('Erro ao criar grupo:', error);
      }
    };
  
    return (
      <View style={styles.container}>
        {!groupCreated ? (
          <>
            <Text style={styles.label}>Nome do Grupo:</Text>
            <TextInput
              style={styles.input}
              value={groupName}
              onChangeText={setGroupName}
              placeholder="Digite o nome do grupo"
            />
            <Text style={styles.label}>Membros do Grupo:</Text>
            {/* Renderize a lista de membros aqui e permita que o usuário selecione membros */}
            {/* Por exemplo, você pode usar uma lista de contatos e botões de seleção */}
            {/* Quando o usuário seleciona um membro, adicione-o a selectedMembers */}
            <Button title="Criar Grupo" onPress={createGroup} />
          </>
        ) : (
          <Text style={styles.successMessage}>Grupo criado com sucesso!</Text>
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 16,
      paddingHorizontal: 8,
    },
    successMessage: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'green',
    },
  });
  
  export default GroupChat;
  