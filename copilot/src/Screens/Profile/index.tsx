import React, {useState}  from "react";
import { View, Text, StyleSheet, Platform, Image} from "react-native";
import {MyTextInput} from '../../components/MyTextInput';
import {MyButton} from '../../components/MyButton';
import logo from '../../assets/logo.png'



export default function Profile () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');    
    const [deviceId, setdeviceId] = useState('');    

    return (
        <View style={[styles.container, {justifyContent: 'center'}]}>
            <Image
             resizeMode="contain"
                source={logo}
            style={{width: 200, height: 200}}
            />
            <Text style={[styles.title]}>Copilot</Text>
            <MyTextInput placeholder="Número de Celular" value={email} onChangeText={setEmail} />
            <MyTextInput
            placeholder="Senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            />

            <MyButton title="Entrar" />                       
        </View>
    );
}

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