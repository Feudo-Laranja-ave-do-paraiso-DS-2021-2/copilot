import { StackNavigationProp } from '@react-navigation/stack'
import React, {useEffect, useState, Component} from 'react'
import { RouteProp } from '@react-navigation/native'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { Icon } from 'react-native-elements'
import axios from 'axios'
import { RootTabParamList } from '../../../../types'
import Participantes from '../../../components/Lista_Grupo'
import { IP } from '../../../../App'



interface EnterGroupProps {
  navigation: StackNavigationProp<RootTabParamList, 'EnterGroup'>
  route: RouteProp<RootTabParamList, 'EnterGroup'>
}

const EnterGroup: React.FC<EnterGroupProps> = ({ navigation, route }) => {
  const [idgp, setIdgp] = useState('')
  const [id, setId] = useState('')
  const [groupname, setGroupname] = useState('')
  const [groupcode, setGroupcode] = useState('')
  useEffect(async () => { 
    const responseProfile = await axios.get(`${IP}/profiles/?id_dispositivo=${route.params?.usuario_id}`)
    // handle success
    const id = responseProfile.data[0].id;
    setId(id);
    const responseGroup =  await axios.get(`${IP}/group/?token=${route.params?.grupo_token}`)
    
    // handle success
    const idgp = responseGroup.data[0].id;
    setIdgp(idgp);
    const groupname = responseGroup.data[0].nome_grupo;      
    setGroupname(groupname);
    const groupcode = responseGroup.data[0].token;
    setGroupcode(groupcode);
    const responsePostGroup = await axios.post(`${IP}/group/${idgp}/adicionar_profile/`,{ids: [id] })
    // handle success      
  });      
  
  return (
    <View>
        <TouchableOpacity
              style={{ position: 'absolute', top: 50, left: 20, padding: 8 }} 
              onPress={() => navigation.goBack()}           
        >
              <Icon type="font-awesome" name="arrow-left" color="#000" />
        </TouchableOpacity>        
        <Text style={[styles.nome_grupo]}>{groupname}</Text>
        <Text style={[styles.codigo_grupo]}>Código do Grupo: {route.params?.grupo_token}</Text>        
        <View style={[styles.linha]}></View>
        <Participantes iddogrupo = {idgp}/>
    </View>
  )
}

export default EnterGroup

const styles = StyleSheet.create( {
  nome_grupo:{
    textAlign: 'center',
    paddingTop: 120,
    fontSize: 30,
  },
  codigo_grupo:{
    textAlign: 'center',    
  },
  linha:{
    width: '100%',
    height: 2,
    backgroundColor:"#D3D3D3",
    marginTop: 20,
    marginBottom: 20
  } 
}
)