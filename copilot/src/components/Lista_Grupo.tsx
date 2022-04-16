import React, {Component, useState, useEffect} from 'react'
import {Text, StyleSheet, View, FlatList, SafeAreaView} from 'react-native'
import axios from 'axios'
import {IP} from '../../App';


const Item = ({nome}) => (
    <View>
      <Text style={[styles.nome_participante]}>{nome}</Text>
    </View>
);

const renderItem = ({ item }) => (
    <Item nome={item.nome_completo} />    
);
export default class Participantes extends React.Component <{iddogrupo?: string}> { 
    
    constructor(props) {
        super(props);
        this.state = {
            participantes: []
        }        
    }
    async componentDidMount(){
        const responseEnterGroup = await axios.get(`${IP}/group/${this.props.iddogrupo}/`) 
        this.setState({
                profiles: responseEnterGroup.data.profiles
        })
    }
    async componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.iddogrupo !== prevProps.iddogrupo) {
            const responseEnterGroup = await axios.get(`${IP}/group/${this.props.iddogrupo}/`) 
            this.setState({
                profiles: responseEnterGroup.data.profiles
            })
        }
    }

    /*
    useEffect(async () => { 
        const responseEnterGroup = await axios.get(`${IP}/group/${this.props.iddogrupo}/`) 
        this.setState({
            profiles: response.data.profiles
        })
    });        
    */
    
    render(){
        return(
            <SafeAreaView>
                <FlatList
                    data={this.state.profiles}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    extraData={this.state.profiles}
                />
            </SafeAreaView>
        )
    }
}

const styles=StyleSheet.create({
    nome_participante:{
        paddingLeft: 15,
        marginBottom: 25,
        fontWeight: 'bold'
    }
})





