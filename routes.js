import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import Iconn from 'react-native-vector-icons/Entypo';
import Iconnn from 'react-native-vector-icons/AntDesign'
import Iconnnn from 'react-native-vector-icons/SimpleLineIcons'
import RegisterScreen from "./src/pages/Register";
import LoginScreen from "./src/pages/Login"
import HomeScreen from "./src/pages/Home"
import ProfileScreen from "./src/pages/Profile"
import ConfigScreen from "./src/pages/Config"

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={true} // Define isso como true para alternar entre os ícones e os rótulos na barra inferior
      activeColor="#FF4500" // Define a cor do item ativo
      inactiveColor="#000" // Define a cor do item inativo
      barStyle={{ backgroundColor: '#fff' }} // Define a cor de fundo da barra inferior
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color }) => (
            <Iconn name="chat" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Contatos',
          tabBarIcon: ({ color }) => (
            <Iconnn name="contacts" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Config"
        component={ConfigScreen}
        options={{
          tabBarLabel: 'Configuração',
          tabBarIcon: ({ color }) => (
            <Iconnnn name="settings" color={color} size={26} />
          ),
        }}
      />
      {/* Adicione outras telas aqui */}
    </Tab.Navigator>
  );
};
const Routes = () => {
  return (
    <Stack.Navigator initialRouteName={"Register"}>
      <Stack.Screen name={"Register"} component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name={"Login"} component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name={"Home"} component={MainTabNavigator} options={{ headerShown: false }} />

    </Stack.Navigator>
  );
};

export default Routes;