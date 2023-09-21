import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref, set } from 'firebase/database';
import { StyleSheet, TouchableOpacity} from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleLogo } from 'phosphor-react-native';


async function onGoogleButtonPress() {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  const { idToken } = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken)
  .then((googleCredential) => {
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
        }, 2000);
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

  return auth().signInWithCredential(googleCredential);
}

GoogleSignin.configure({
  webClientId: '762711572558-eso25ngfuo9a3ncp9mpi20penne598bi.apps.googleusercontent.com',
});

function renderGoogleSignInButton() {
  return (
    <TouchableOpacity style={styles.button} onPress={onGoogleButtonPress}>
      <GoogleLogo  size={30} weight="bold" color="black"/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40, 
    height: 40, 
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
    width: 40, 
    height: 40,
  },
});

export default renderGoogleSignInButton;
