import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importe a biblioteca de ícones correta
import { useTheme } from '@react-navigation/native';

import HomeScreen from './src/pages/Home';
import ChatScreen from './src/pages/Chat';
import ProfileScreen from './src/pages/Profile';
import ConfigScreen from './src/pages/Config';
import RegisterScreen from './src/pages/Register';
import LoginScreen from './src/pages/Login';
import ContactsScreen from './src/pages/Contacts';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const theme = useTheme();

const MainStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Chat" component={ChatScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={{
        backgroundColor: theme.colors.primary, // Use a propriedade colors do tema para obter a cor primária
      }}
    >
      <Tab.Screen
        name="Home"
        component={MainStackScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} /> // Use a biblioteca FontAwesome e substitua "MaterialCommunityIcons" por "Icon"
          ),
        }}
      />
      <Tab.Screen
        name="Config"
        component={ConfigScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="cog" color={color} size={26} /> // Use a biblioteca FontAwesome e substitua "MaterialCommunityIcons" por "Icon"
          ),
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="users" color={color} size={26} /> // Use a biblioteca FontAwesome e substitua "MaterialCommunityIcons" por "Icon"
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={26} /> // Use a biblioteca FontAwesome e substitua "MaterialCommunityIcons" por "Icon"
          ),
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
