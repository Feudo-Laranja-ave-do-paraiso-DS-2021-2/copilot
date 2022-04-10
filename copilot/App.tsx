import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet} from "react-native";
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/Navigation';

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import * as Application from 'expo-application';
import * as Location from "expo-location"

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const deviceId =  Application.androidId ?? "";
  const [id, setId] = useState();
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
  let cadastrado = false;

  /*useEffect(async () => { 
    axios.get('https://c4a1-2804-14c-65a7-41e7-8900-3e36-3cfa-7cf9.ngrok.io/profiles/?id_dispositivo={deviceId}')
    .then(function (response) {
      // handle success
      cadastrado = true;
      const id = response.data[0].id;
      setId(id);
    })
    .catch(function (error) {
      // handle error      
    })
    .finally(function () {
      // always executed      
    });
  }, []); 

  if(cadastrado){
    async function loadPosition() {
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      setInitialPosition([
        latitude,
        longitude
      ]);    
    }
    loadPosition();  
    async function putLocation() {
      axios
        .put('https://c4a1-2804-14c-65a7-41e7-8900-3e36-3cfa-7cf9.ngrok.io/profiles/{id}/', {
          latitude: initialPosition[0].toString(),
          longitude: initialPosition[1].toString(),          
        })
        .then(function (response) {
          // handle success
          alert(JSON.stringify(response.data));
        })
        .catch(function (error) {
          // handle error
          alert(error.message);
        });
    }
    putLocation();
  }*/

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
