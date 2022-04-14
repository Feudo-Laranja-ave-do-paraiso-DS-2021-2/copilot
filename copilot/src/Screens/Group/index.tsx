import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import * as Application from 'expo-application';
import axios from "axios";

export default function Group () {
    const deviceId =  Application.androidId ?? "";
    const [id, setId] = useState();
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
    let cadastrado = false;
    useEffect(async() => { 
      /*const responseCadastro = await axios.get(`https://528d-85-113-95-21.ngrok.io/profiles/?id_dispositivo=${deviceId}`)
      console.log(responseCadastro)
      if(responseCadastro){
        cadastrado = true;
        const id = responseCadastro.data[0].id;
        setId(id);
      }else{
        alert(error.message);
      }*/
      axios.get(`https://528d-85-113-95-21.ngrok.io/profiles/?id_dispositivo=${deviceId}`)
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
        /*
        useEffect(async () => { 
        const responseProfile = await axios.get(`https://c73b-2804-14c-65a7-41e7-4f7-c30c-c32f-4743.ngrok.io/profiles/?id_dispositivo=${route.params?.usuario_id}`)
        // handle success
        const id = responseProfile.data[0].id;
        setId(id);
        const responseGroup =  await axios.get(`https://c73b-2804-14c-65a7-41e7-4f7-c30c-c32f-4743.ngrok.io/group/?token=${route.params?.grupo_token}`)
        
        // handle success
        const idgp = responseGroup.data[0].id;
        setIdgp(idgp);
        const groupname = responseGroup.data[0].nome_grupo;      
        setGroupname(groupname);
        const groupcode = responseGroup.data[0].token;
        setGroupcode(groupcode);
        const responsePostGroup = await axios.post(`https://c73b-2804-14c-65a7-41e7-4f7-c30c-c32f-4743.ngrok.io/group/${idgp}/adicionar_profile/`,{ids: [id] })
        // handle success      
      });  
        */
        async function putLocation() {
          /*const responseLocation = await axios.put(`https://528d-85-113-95-21.ngrok.io/profiles/${id}/`, 
            {
              id_dispositivo: deviceId.toString(),
              latitude: initialPosition[0].toString(),
              longitude: initialPosition[1].toString(),          
            }
          )
          console.log(responseLocation)
          if(responseLocation){
            console.log(responseLocation.data);
          }else{
            alert(error.message);
          }*/
          axios
            .put(`https://528d-85-113-95-21.ngrok.io/profiles/${id}/`, {
              id_dispositivo: deviceId.toString(),
              latitude: initialPosition[0].toString(),
              longitude: initialPosition[1].toString(),          
            })
            .then(function (response) {
              // handle success
              console.log(response.data);
            })
            .catch(function (error) {
              // handle error
              alert(error.message);
            });
        }
        putLocation();
      }
    
    return (
        <View style={styles.GroupContainer}>
            <Text>Bem-vindo a seção dos grupos, essa página está em desenvolvimento</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    GroupContainer: {
        padding: 15,
        paddingTop: Platform.OS == "android" ? 55 : 0,
    },    
})