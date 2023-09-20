import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "./src/pages/Register";
import LoginScreen from "./src/pages/Login"


const Stack = createNativeStackNavigator();
const Routes = () => {
    return (
      <Stack.Navigator initialRouteName={"Register"}>
        <Stack.Screen name={"Register"} component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name={"Login"} component={LoginScreen} options={{ headerShown: false }} />

      </Stack.Navigator>
    );
  };
  
  export default Routes;