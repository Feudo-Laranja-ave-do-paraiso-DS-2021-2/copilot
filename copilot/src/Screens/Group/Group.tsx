import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { RouteProp } from '@react-navigation/native'
import { Icon } from 'react-native-elements';
import { MyButton } from "../../components/MyButton";
import { MyTextInput } from "../../components/MyTextInput";
import { RootTabParamList } from '../../../types';
 
export interface GroupProps {
    navigation: StackNavigationProp<RootTabParamList, 'Group'>
 }
 
const Group: React.FC<GroupProps> = ({ navigation }) => {
    const [codigogp, setCodigogp] = useState('')
    return (        
        <View style={styles.GroupContainer}>
            <TouchableOpacity
                onPress={() => navigation.navigate('CreateGroup')}
                style={{
                position: 'absolute',
                right: 20,
                top: 60,
                padding: 8,
                }}
            >
                <Icon type="font-awesome" size={30} name="user-plus" color="#000" />  
                <Text>Criar Grupo</Text>            
            </TouchableOpacity>
            <View style={styles.InText}></View>
            <MyTextInput placeholder="Digite o código do grupo" value={codigogp} onChangeText={setCodigogp}/>
           
            <MyButton onPress={() => navigation.navigate('EnterGroup', {grupo_token: codigogp})} title="Entrar"/>    
           
        </View>
    );
}
export default Group
 
const styles = StyleSheet.create({
    GroupContainer: {
        padding: 15,
        paddingTop: Platform.OS == "android" ? 55 : 0,
    },    
    InText:{
        paddingTop: 120,
    }
})
