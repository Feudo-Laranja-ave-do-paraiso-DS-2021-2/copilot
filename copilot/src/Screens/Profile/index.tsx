import React, {useState}  from "react";
import { View, Text, StyleSheet, Platform, Image} from "react-native";
import {MyTextInput} from '../../components/MyTextInput';
import {MyButton} from '../../components/MyButton';
import logo from '../../assets/logo.png'


export default function Profile () {
    const [name, setName] = useState('');    
     
  

    return (
        <View style={[styles.container, {justifyContent: 'center'}]}>
            <Image
             resizeMode="contain"
                source={logo}
            style={{width: 200, height: 200}}
            />
            <Text style={[styles.title]}>Copilot</Text>
            <MyTextInput placeholder="Nome" value={name} onChangeText={setName} />
            <MyButton title="Entrar"/>                       
        </View>
    );
}
/*

fetch('http://0.0.0.0:8006/profiles/', {
  method: 'POST',
  body: JSON.stringify({
    "nome_completo": "Leandro Souza",
    "id_dispositivo": "619999999999",
    "latitude": "-67.555550",
    "longitude": "-63.666600",
}),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));

*/

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