import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'react-native-image-picker';
import { auth, database } from '../../../firebaseConfig';
import { ref, getDownloadURL, putFile } from '@react-native-firebase/storage';
import { update } from '@react-native-firebase/database';
import { storage } from '../../../firebaseConfig';

const defaultImageUrl = 'https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg';

const Profile = () => {
  const [userProfileImage, setUserProfileImage] = useState(null);
  const [userName, setUsername] = useState('');
  const [name, setName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [renderImage, setRenderImage] = useState(null);

  useEffect(() => {
    const uid = auth.currentUser.uid;
    if (!uid) {
      console.error('UID do usuário não encontrado.');
      return;
    }

    const userRef = database.ref(`users/${uid}`);

    userRef.on('value', (snapshot) => {
      const userData = snapshot.val();
      if (userData && userData.profileImage && userData.name) {
        setUserProfileImage(userData.profileImage);
        setUsername(userData.name);
        setName(userData.name); 
      }
    });
  }, []);

  const onHandleUpdate = async (uid) => {
    try {
      const userRef = database.ref(`users/${uid}`);

      let imageUrl = userProfileImage; // Defina uma URL padrão

      if (selectedImage) {
        const { uri } = renderImage;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        const storageRef = ref(storage, `users/${uid}/${filename}`);
        await putFile(storageRef, uploadUri);
        imageUrl = await getDownloadURL(storageRef);
      }

      const userData = {
        name: name,
        profileImage: imageUrl,
      };

      await update(userRef, userData);
      console.log('Perfil atualizado com sucesso!');
      alert('Perfil atualizado com sucesso!');
    } catch (err) {
      console.error('Erro ao atualizar perfil:', err);
      alert('Erro ao atualizar perfil', err.message);
    }
  };

  const handleImageUpload = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'profileImages',
      },
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('Escolha de imagem cancelada');
      } else if (response.error) {
        console.error('Erro ao escolher imagem: ', response.error);
      } else {
        const source = response.assets[0].uri;
        const teste = { uri: response.assets[0].uri };
        setSelectedImage(source);
        setRenderImage(teste);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleImageUpload}>
          <Image source={{ uri: selectedImage || userProfileImage }} style={styles.profileImage} />
        </TouchableOpacity>
        <Text style={styles.textProfileName}>{userName}</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          autoCapitalize="none"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      <Icon name="edit" color={'black'} size={23} style={styles.inputIcon} />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => onHandleUpdate(auth.currentUser.uid)}>
        <Text style={styles.textButton}>Atualizar perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E4E1DD', 
    
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 16,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: 'white',
  },
  textProfileName: {
    color: 'black', 
    fontSize: 24,
    marginTop: 16,
    fontWeight: 'bold',
  },
  inputIcon: {
    marginLeft: 4,
  },
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 50,
    backgroundColor: '#fff', 
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
  button: {
    backgroundColor: '#1B0A3E', 
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
});

export default Profile;
