import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { ThemeContext } from '../../../ThemeContext'; // Importe o contexto de tema

const Config = () => {
  const { theme, toggleTheme, logout } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      
      <View style={styles.option}>
        <Text style={styles.optionText}>Tema Escuro</Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={toggleTheme}
        />
      </View>

      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  optionText: {
    fontSize: 18,
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Config;
