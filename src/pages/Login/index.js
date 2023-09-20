import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoginWithEmail from '../../components/LoginWithEmail';
import LoginWithGoogle from '../../components/LoginWithGoogle';

const LoginScreen = ({ navigation }) => {
  const handleLoginSuccess = () => {
    navigation.navigate('Home');
  };

 // <LoginWithGoogle onLoginSuccess={handleLoginSuccess} />
  return (
    <View style={styles.container}>
      <LoginWithEmail onLoginSuccess={handleLoginSuccess} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LoginScreen;
