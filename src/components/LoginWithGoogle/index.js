import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native'; // Importe useNavigation

const LoginWithGoogle = () => {
  // Obtenha a função de navegação usando useNavigation
  const navigation = useNavigation();

  const handleGoogleLogin = async () => {
    try {
      // Faça a autenticação com o Google
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      // Você pode acessar as informações do usuário aqui, como userInfo.user.email, userInfo.user.name, etc.

      // Agora, você pode usar as informações do usuário para autenticá-lo no Firebase Realtime Database ou qualquer outro serviço necessário.

      // Após o login bem-sucedido, navegue para a próxima tela desejada
      navigation.navigate('Home'); // Substitua 'Home' pelo nome da sua próxima tela.
    } catch (error) {
      console.error('Erro ao fazer login com o Google:', error);
    }
  };

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        style={styles.googleButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleGoogleLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButton: {
    width: 192,
    height: 48,
  },
});

export default LoginWithGoogle;
