import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './routes'

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}