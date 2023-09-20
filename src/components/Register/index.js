import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import * as ImagePicker from 'react-native-image-picker';
import { auth, database, storage } from '../../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
const backImage = require("../../assets/backImage.png");
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();

  const onHandleSignup = () => {
    if (email !== '' && password !== '' && name!=='') {
  createUserWithEmailAndPassword(auth, email, password, name, selectedImage)
        .then(() => console.log('Signup success'))
        .catch((err) => Alert.alert("Login error", err.message));
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
            <Text style={styles.title}>Sign Up</Text>
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
            
            <TextInput
            style={styles.input}
            placeholder="Enter name"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="name"
            autoFocus={true}
            value={name}
            onChangeText={(text) => setName(text)}
          />
             <TextInput
            style={styles.input}
            placeholder="Enter email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoFocus={true}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
            <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}> Sign Up</Text>
          </TouchableOpacity>
          <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
            <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{color: '#f57c00', fontWeight: '600', fontSize: 14}}> Log In</Text>
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
        color: "orange",
        alignSelf: "center",
        paddingBottom: 24,
      },
      imageUploadButton: {
        alignItems: 'flex-start',
        marginBottom: 20,
      },
    
      profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
      },
    
      imagePlaceholder: {
        width: 100,
        height: 100,
        backgroundColor: 'gray',
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
        top: 0,
        resizeMode: 'cover',
      },
      whiteSheet: {
        width: '100%',
        height: '75%',
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
        backgroundColor: '#f57c00',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
      },
    });

export default Register;
