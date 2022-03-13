import Home from './Screens/Home';
import Profile from './Screens/Profile';
import Group from './Screens/Group';
import { NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { useReducer } from 'react';

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



/*const TabStack = createBottomTabNavigator()

const TabNavigator = () => {
    const { Navigator, Screen } = TabStack
  
    return (
      <Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let label, iconName: string
  
            switch (route.name) {
              case 'Home':
                label = 'Home'
                iconName = 'home'
                break
              case 'Terminology':
                label = 'Terminology'
                iconName = 'book'
                break
              case 'Boats':
                label = 'Boats'
                iconName = 'ship'
                break
              default:
                return null
            }
            return (
              <TabContainer label={label} focused={focused}>
                <Icon
                  type="font-awesome"
                  name={iconName}
                  color={focused ? '#31AAB7' : '#ACBAC3'}
                />
              </TabContainer>
            )
          },
        })}
      >
        <Screen name="Group" component={Group} />
        <Screen name="Home" component={Home} />
        <Screen name="Profile" component={Profile} />
    </Navigator>
    )
  }
  
  export default TabNavigator*/
