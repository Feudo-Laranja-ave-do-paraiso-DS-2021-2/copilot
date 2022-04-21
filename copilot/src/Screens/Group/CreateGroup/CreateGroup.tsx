import { StackNavigationProp } from '@react-navigation/stack'
import { StyleSheet, Platform, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import axios from 'axios' 
import {View,TouchableOpacity,Clipboard} from 'react-native'
import { Icon } from 'react-native-elements'
import { RootTabParamList } from '../../../../types'
import { MyTextInput } from '../../../components/MyTextInput'
import { MyButton } from "../../../components/MyButton";
import * as Application from 'expo-application';
import {IP} from '../../../../App';


interface CreateGroupProps {
  navigation: StackNavigationProp<RootTabParamList, 'CreateGroup'>
}

export interface groupData {
  nome_grupo: string,
};

export interface personData {
  id: string,
};

export interface userData {
  ids: [personData["id"]],
};

const postGroup = (groupName:string) => {
  const group: groupData = {
    nome_grupo: groupName,  
  };
    axios 
    .post(`${IP}/group/`, group )
    .then(function (response) {
      // handle success
      Alert.alert(
        "Código do Grupo", 
        (response.data.token),
        [
          {
            text: "COPIAR",
            onPress: () => Clipboard.setString((response.data.token).toString())
          },
          { text: "OK"}
        ]
      );
      //const idgrupo = response.data.id
      //setIdgrupo(idgrupo)
      
    })
    .catch(function (error) {
      // handle error
      alert(error.message);
    });
  
};

const CreateGroup: React.FC<CreateGroupProps> = ({ navigation }) => {
  const [id, setId] = useState();
  const deviceId =  Application.androidId ?? "";

  let cadastrado = false;
  useEffect(async () => {
  axios.get(`${IP}/profiles/?id_dispositivo=${deviceId}`)
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

  const [namegroup, setNamegroup] = useState('');
  return (
    <View style = {styles.CreateGroupContainer}>
        <TouchableOpacity
              style={{ position: 'absolute', top: 50, left: 20, padding: 8 }} 
              onPress={() => navigation.goBack()}           
        >
              <Icon type="font-awesome" name="arrow-left" color="#000" />
        </TouchableOpacity>
        <MyTextInput placeholder="Nome do grupo" value={namegroup} onChangeText={setNamegroup}/>
        <MyButton style={styles.MyButton} title="Criar" onPress={() => postGroup(namegroup)}/>
        
    </View>
  )
}

export default CreateGroup

const styles = StyleSheet.create({
  CreateGroupContainer: {
      padding: 20,
      paddingTop: Platform.OS == "android" ? 150 : 0,
  },   
  MyButton: {
    borderRadius: 10,
}
})