import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import firebase from '../../../firebase';
import { useNavigation } from '@react-navigation/native'; // Importe useNavigation

const LoginWithEmail = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  
  // Obtenha a função de navegação usando useNavigation
  const navigation = useNavigation();

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // O login foi bem-sucedido, você pode redirecionar para a próxima tela aqui.
        const user = userCredential.user;
        console.log('Usuário logado:', user.email);
        
        // Navegue para a próxima tela após o login bem-sucedido
        navigation.navigate('Home'); // Substitua 'Home' pelo nome da sua próxima tela.
      })
      .catch((error) => {
        // Ocorreu um erro no login, exiba a mensagem de erro.
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
        console.error('Erro ao fazer login:', errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login com E-mail</Text>
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button title="Login" onPress={handleLogin} />
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
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
});

export default LoginWithEmail;
