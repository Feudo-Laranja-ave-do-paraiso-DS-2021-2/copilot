/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
 import { FontAwesome } from '@expo/vector-icons';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import * as React from 'react';
 import { ColorSchemeName } from 'react-native';
 
 import Colors from '../constants/Colors';
 import useColorScheme from '../hooks/useCachedResources';
 import Home from '../Screens/Home';
 import Group from '../Screens/Group/Group';
 import GroupNavigator from './GroupNavigator';
 import GroupLocation from '../Screens/GroupLocation'
 import Profile from '../Screens/Profile';
 import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../../types';
 import LinkingConfiguration from './LinkingConfigurations';
 
 export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }): JSX.Element {
   return (
     <NavigationContainer
       linking={LinkingConfiguration}
       theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
       <RootNavigator />
     </NavigationContainer>
   );
 }
 
 /**
  * A root stack navigator is often used for displaying modals on top of all other content.
  * https://reactnavigation.org/docs/modal
  */
 const Stack = createNativeStackNavigator<RootStackParamList>();
 
 function RootNavigator() {
   return (
     <Stack.Navigator>
       <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />    
     </Stack.Navigator>
   );
 }
 
 /**
  * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
  * https://reactnavigation.org/docs/bottom-tab-navigator
  */
 const BottomTab = createBottomTabNavigator<RootTabParamList>();
 
 function BottomTabNavigator() {
   const colorScheme = useColorScheme();
 
   return (
     <BottomTab.Navigator
       initialRouteName="Group"
       screenOptions={{
         headerShown: false,
       }}>
       <BottomTab.Screen
         name="Group"
         component={GroupNavigator}
         options={{
           title: 'Grupos',
           tabBarIcon: ({ color }) => <TabBarIcon name="users" color={"rgb(214, 96, 26)"} />,
         }}
       />    
       <BottomTab.Screen
         name="Home"
         component={Home}
         options={({ navigation }: RootTabScreenProps<'Home'>) => ({
           title: 'Mapa',
           tabBarIcon: ({ color }) => <TabBarIcon name="map-marker" color={"rgb(214, 96, 26)"} />,           
         })}
       />
       <BottomTab.Screen
         name="GroupLocation"
         component={GroupLocation}
         options={{
           title: 'Amigos',
           tabBarIcon: ({ color }) => <TabBarIcon name="users" color={"rgb(214, 96, 26)"} />,
         }}
       />
       <BottomTab.Screen
         name="Profile"
         component={Profile}
         options={{
           title: 'Perfil',
           tabBarIcon: ({ color }) => <TabBarIcon name="user" color={"rgb(214, 96, 26)"} />,
         }}
       />
     </BottomTab.Navigator>
   );
 }
 
 /**
  * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
  */
 function TabBarIcon(props: {
   name: React.ComponentProps<typeof FontAwesome>['name'];
   color: string;
 }) {
   return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
 }
 