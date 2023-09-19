import React from 'react';
import { View, StyleSheet } from 'react-native';
import Register from '../../components/Register'



const RegisterScreen = ({navigation}) => {
    const handleRegistrationSuccess = () => {
        navigation.navigate('Login');
      };
    
  return (
    <View style={styles.container}>
        <Register />
        <Button title="Registrar" onPress={handleRegistrationSuccess} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default RegisterScreen;