import Home from './Screens/Home';
import Profile from './Screens/Profile';
import Group from './Screens/Group';
import { NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function  () {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Grupos" component={Group} />
        <Stack.Screen name="Mapa" component={Home} />
        <Stack.Screen name="Perfil" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}