import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import * as ImagePicker from 'react-native-image-picker';
import { auth, database, storage } from '../../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
const backImage = require("../../assets/logo6.png");
import { useNavigation } from '@react-navigation/native';
import { ref, set } from 'firebase/database';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();

  const onHandleSignup = () => {
    if (email !== '' && password !== '' && name !== '') {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const userUid = user.uid; // Obtenha o UID do usuário criado
  
          // Crie um nó de usuário no Realtime Database com o UID como chave
          const userRef = ref(database, `users/${userUid}`);
  
          // Crie um objeto com os detalhes do usuário que você deseja salvar
          const userData = {
            name: name,
            profileImage: selectedImage, // Salve a imagem aqui, se desejar
            email: email, // Não é recomendado salvar a senha no banco de dados, considere remover essa linha
            // Outros campos de dados, se necessário
          };
  
          // Salve os detalhes do usuário no Realtime Database
          set(userRef, userData)
            .then(() => {
              console.log('Cadastro realizado com sucesso!');
  
              // Adicione um atraso de 2 segundos (2000 milissegundos) antes de navegar para a tela de login
              setTimeout(() => {
                Alert.alert('Cadastro realizado com sucesso!');
                navigation.navigate('Login');
              }, 1000);
            })
            .catch((err) => {
              console.error('Erro ao salvar detalhes do usuário:', err);
              Alert.alert('Erro ao criar usuário', err.message);
            });
        })
        .catch((err) => {
          console.error('Erro ao criar usuário:', err);
          Alert.alert('Erro ao criar usuário', err.message);
        });
    }
  };
  

  const handleImageUpload = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    // Função para escolher uma imagem ou tirar uma foto
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('Escolha de imagem cancelada');
      } else if (response.error) {
        console.error('Erro ao escolher imagem: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };
  
      return (
        <View style={styles.container}>
        <Image source={backImage} style={styles.backImage} />
        <View style={styles.whiteSheet} />
        <SafeAreaView style={styles.form}>  
        <View style={styles.subContainer}>       
          <TouchableOpacity style={styles.imageUploadButton} onPress={handleImageUpload}>
        {selectedImage ? (
          <Image
            source={{ uri: selectedImage }}
            style={styles.profileImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={{ color: 'white' }}>Adicionar Foto</Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.title}>Cadastre-se!</Text>
      </View> 
            <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="name"
            autoFocus={true}
            value={name}
            onChangeText={(text) => setName(text)}
          />
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
          <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
            <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>Cadastrar</Text>
          </TouchableOpacity>
          <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
            <Text style={{color: '#000', fontWeight: '600', fontSize: 14}}>Já tem cadastro? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{color: '#FF4500', fontWeight: '600', fontSize: 14}}> Entrar</Text>
            </TouchableOpacity>
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
        fontWeight: 'bold',
        color: '#FF4500',
        alignSelf: "flex-end",
        paddingBottom: 24,
      },
      imageUploadButton: {
        alignItems: 'flex-start',
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
      },
    
      profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
      },
      subContainer: {
        flexDirection:'row',
        marginTop: 100,
        marginBottom: 20,
        justifyContent: 'space-between',
      },
    
      imagePlaceholder: {
        width: 100,
        height: 100,
        backgroundColor: '#FF4500',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
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
        top:-40,
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
        backgroundColor: '#FF4500',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
      },
    });

export default Register;
