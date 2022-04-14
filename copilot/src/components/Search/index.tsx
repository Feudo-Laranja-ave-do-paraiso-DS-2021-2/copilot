import React, { Component } from 'react';
import { Platform } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class Search extends Component  {

    render() {
        return <GooglePlacesAutocomplete 
            placeholder='Vamos pedalar?'
            onPress={(data, details)=> {
                this.props.locationStateCallback(details?.geometry.location)
            }}
            query={{
                key: 'AIzaSyCs16EPfb6vFTySbyWrN1Jijfn3c0RX4R0',
                language:'pt-br'
            }}
            textInputProps={{
                autoCapitalize: 'none',
                autoCorrect: false
            }}
            fetchDetails
            enablePoweredByContainer={false}
            styles={{
                container: {
                    position: 'absolute',
                    top: Platform.select({ios: 60, android: 80}),
                    width: "100%"
                },
                textInputContainer: {
                    flex: 1,
                    backgroundColor: 'transparent',
                    height: 54,
                    marginHorizontal: 20,
                    borderTopWidth: 0,
                    borderBottomWigth: 0,

                },
                textInput: {
                    height: 54,
                    margin: 0,
                    borderRadius: 20,
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingLeft: 20,
                    paddingRight: 20,
                    marginTop: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowOffset: {x: 0, y: 0},
                    shadowRadius: 15,
                    borderWidth: 1,
                    borderColor: '#DDD',
                    fontSize: 18
                },
                listView: {
                    borderWidth: 1,
                    borderColor: '#DDD',
                    backgroundColor: '#FFF',
                    marginHorizontal: 20,
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowOffset: {x: 0, y: 0},
                    shadowRadius: 15,
                    marginTop: 10

                },
                description: {
                    fontsize: 16
                },
                row: {
                    padding: 20,
                    height: 58
                }
            }}
        />;  
    }
}