import React from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { database } from '../../../firebaseConfig';
import { ref, set } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';

GoogleSignin.configure({
  webClientId: '762711572558-eso25ngfuo9a3ncp9mpi20penne598bi.apps.googleusercontent.com',
});

function RenderGoogleSignInButton() {
  const navigation = useNavigation(); 
  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const result = await auth().signInWithCredential(googleCredential);

      if (result.user) {
        const { displayName, photoURL, uid, email } = result.user;

        if (!(displayName || photoURL)) {
          throw new Error('Missing information from Google Account.');
        }

        const userRef = ref(database, `users/${uid}`);
        const userData = {
          name: displayName,
          profileImage: photoURL,
          email: email.split('@')[0],
        };

        set(userRef, userData)
          .then(() => {
            console.log('Cadastro realizado com sucesso!');
            setTimeout(() => {
              Alert.alert('Cadastro realizado com sucesso!');
              navigation.navigate('Home');
            }, 1000);
          })
          .catch((err) => {
            console.error('Erro ao salvar detalhes do usuário:', err);
            Alert.alert('Erro ao criar usuário', err.message);
          });
      }
    } catch (error) {
      console.error('Erro ao fazer login com o Google:', error);
      Alert.alert('Erro ao fazer login com o Google', error.message);
    }
  }

  return (
    <TouchableOpacity style={styles.button} onPress={onGoogleButtonPress}>
      <Icon name="google" size={20} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 30,
    height: 30,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginLeft: 10,
  },
  image: {
    width: 20,
    height: 20,
  },
});

export default RenderGoogleSignInButton;
