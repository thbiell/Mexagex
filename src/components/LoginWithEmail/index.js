import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { signInWithEmailAndPassword } from "@react-native-firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useNavigation } from '@react-navigation/native';
import LoginWithGoogle from '../LoginWithGoogle'
import AsyncStorage from '@react-native-async-storage/async-storage';


const backImage = require("../../assets/logo6.png");
const LoginWithEmail = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

          const user = userCredential.user;
          const uid = user.uid;
          AsyncStorage.setItem('userUid', uid)
            .then(() => {
              console.log('UID do usuário salvo no AsyncStorage');
              console.log('Login realizado com sucesso!');

              Alert.alert('Login realizado com sucesso!');
              navigation.navigate('Home');

            })
            .catch((err) => {
              console.error('Erro ao salvar UID do usuário:', err);
              Alert.alert('Erro ao fazer login', err.message);
            });
        })
        .catch((err) => {
          console.error('Erro ao fazer login:', err);
          Alert.alert('Erro ao fazer login', err.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Entrar</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Entrar</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: 'black', fontWeight: '600', fontSize: 14 }}>Não possui cadastro? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: '#6727E8', fontWeight: '600', fontSize: 14 }}> Cadastrar-se</Text>
          </TouchableOpacity>
          <LoginWithGoogle />
        </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    marginTop: 30,
    fontWeight: 'bold',
    color: '#1B0A3E',
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: -40,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '72%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#1B0A3E',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});

export default LoginWithEmail;
