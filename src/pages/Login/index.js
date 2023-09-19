import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoginWithEmail from '../../components/LoginWithEmail';
import LoginWithGoogle from '../../components/LoginWithGoogle';

const LoginScreen = ({ navigation }) => {
  const handleLoginSuccess = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <LoginWithEmail onLoginSuccess={handleLoginSuccess} />
      <LoginWithGoogle onLoginSuccess={handleLoginSuccess} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
