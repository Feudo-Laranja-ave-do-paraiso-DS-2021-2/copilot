import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet} from "react-native";
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/Navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
        <View style={styles.Bar}></View>
      </SafeAreaProvider>
  );
  
}

const styles = StyleSheet.create({
  Bar: {
      paddingTop: 5,
  },     
})



/*const TabNavigator = createBottomTabNavigator({
  Group: {
    screen: GroupScreen,
    navigationOptions: {
      tabBarLabel: "Grupos",
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="people"
            size={24}
            color={tabInfo.focused ? "#FF6B1A" : "#AAAAAA"}
          />
        );
      },
    },
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: "Mapa",
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="map"
            size={24}
            color={tabInfo.focused ? "#FF6B1A" : "#AAAAAA"}
          />
        );
      },
    },
  },
  Perfil: {
    screen: PerfilScreen,
    navigationOptions: {
      tabBarLabel: "Perfil",
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="people"
            size={24}
            color={tabInfo.focused ? "#FF6B1A" : "#AAAAAA"}
          />
        );
      },
    },
  },
});
  
const Navigator = createAppContainer(TabNavigator);
  
export default function App() {
  return (
    <Navigator>
      <HomeScreen />
    </Navigator>
  );
}*/
/*const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}*
/*
tabBarOptions?: {
        activeTintColor: "#FF6B1A",
      },
*/
