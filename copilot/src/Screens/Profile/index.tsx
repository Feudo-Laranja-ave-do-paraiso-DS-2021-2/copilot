import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Platform, Image} from 'react-native';
import axios from 'axios';
import * as Application from 'expo-application';
import * as Location from "expo-location";
import logo from '../../assets/logo.png'
import { MyButton } from '../../components/MyButton';
import { MyTextInput } from '../../components/MyTextInput';
import { useNavigation } from '@react-navigation/native';

export interface profileData {
  nome_completo: string,
  id_dispositivo: string,
  latitude: string,
  longitude: string,
};

export default function Profile () {
  const [name, setName] = useState('');
  const [id, setId] = useState();
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
  const [lat, setLat] = useState<number>(0);
  const [long, setLong] = useState<number>(0);
  const deviceId =  Application.androidId ?? "";
  /*if(Platform.OS == "android"){
    const deviceId =  Application.androidId;
    console.log(deviceId);
  } else {
    async () => {
      const deviceId = await Application.getIosIdForVendorAsync();          
      console.log(deviceId);
    }   
  }*/
  

  let cadastrado = false;
  useEffect(async () => { 
    axios.get(`https://c73b-2804-14c-65a7-41e7-4f7-c30c-c32f-4743.ngrok.io/profiles/?id_dispositivo=${deviceId}`)
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

  /*if(cadastrado){
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
        .put('http://192.168.1.15:8006/profiles/{id}/', {
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

 
  useEffect(() => {
    (async () => {
      let { status } =
      await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }
      const loc_aux = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = loc_aux.coords;
      setLat(latitude);
      setLong(longitude);
  })();
}, []);
 

  const postUser = (nameUser:string, idDevUser: string, latUser: number, longUser: number, aux: boolean) => {
    if(!aux){
      const profile: profileData = {
        nome_completo: nameUser,
        id_dispositivo: idDevUser.toString(),
        latitude: latUser.toString(),
        longitude: longUser.toString(),
      };
      axios 
      .post('https://c73b-2804-14c-65a7-41e7-4f7-c30c-c32f-4743.ngrok.io/profiles/', profile )
      .then(function (response) {
        // handle success
        alert(JSON.stringify(response.data));
      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      });
    }  
  };

return (
  <View style={[styles.container, {justifyContent: 'center'}]}>
      <Image
       resizeMode="contain"
          source={logo}
      style={{width: 200, height: 200}}
      />
      <Text style={[styles.title]}>Copilot</Text>
      <MyTextInput placeholder="Nome" value={name} onChangeText={setName} />
      <MyButton title="Entrar" onPress={() => postUser(name, deviceId, lat, long, cadastrado)}/>                      
  </View>
);

  
  
};

const styles = StyleSheet.create({
  ProfileContainer: {
      padding: 15,
      paddingTop: Platform.OS == "android" ? 50 : 0,
  },   
  container: {
      flex: 0,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 90,   
  },
  title: {
      fontWeight: 'bold',
      fontSize: 48,
      textAlign: 'center',
      paddingTop: 10,
      paddingBottom: 30,
  },
  coffText: {
      color: '#550AB1',
      fontWeight: 'bold',
  },
})


