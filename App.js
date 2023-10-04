import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes'
import { isAuthStore } from './reducer';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();
export default function App() {

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}