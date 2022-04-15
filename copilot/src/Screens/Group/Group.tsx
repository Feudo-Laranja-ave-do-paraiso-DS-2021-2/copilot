import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { Icon } from 'react-native-elements';
import { MyButton } from "../../components/MyButton";
import { MyTextInput } from "../../components/MyTextInput";
import { RootTabParamList } from '../../../types';
import { IP } from "../../../App";
import * as Application from 'expo-application';

export interface GroupProps {
    navigation: StackNavigationProp<RootTabParamList, 'Group'>
}

const Group: React.FC<GroupProps> = ({ navigation }) => {
    const [codigogp, setCodigogp] = useState('')
    const deviceId = Application.androidId ?? "";
    const [id, setId] = useState();
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
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

    if (cadastrado) {
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
                .put(`${IP}/profiles/${id}/`, {
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
            <MyTextInput placeholder="Digite o código do grupo" value={codigogp} onChangeText={setCodigogp} />

            <MyButton onPress={() => navigation.navigate('EnterGroup', { grupo_token: codigogp })} title="Entrar" />

        </View>
    );
}
export default Group

const styles = StyleSheet.create({
    GroupContainer: {
        padding: 15,
        paddingTop: Platform.OS == "android" ? 55 : 0,
    },
    InText: {
        paddingTop: 120,
    }
})
