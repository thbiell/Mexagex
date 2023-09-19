import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import firebase from '../../../firebase'; // Importe o Firebase configurado no seu projeto
import { initializeApp } from '@firebase/app';
import { getDatabase, ref, set, get } from '@firebase/database';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const auth = getAuth(firebaseApp);

  const handleEmailRegistration = async () => {
    try {
      // Autenticação com email e senha usando Firebase
      await createUserWithEmailAndPassword(auth, name, email, password);
      // Registro bem-sucedido, você pode redirecionar o usuário para a tela de perfil ou outra página
    } catch (error) {
      console.error('Erro ao criar conta:', error.message);
    }
  };

  const handleGoogleRegistration = async () => {
    try {
      // Autenticação com Google usando Firebase
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
      // Registro bem-sucedido com o Google, você pode redirecionar o usuário para a tela de perfil ou outra página
    } catch (error) {
      console.error('Erro ao criar conta com o Google:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Registrar com Email" onPress={handleEmailRegistration} />
      <Button title="Registrar com Google" onPress={handleGoogleRegistration} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default Register;
