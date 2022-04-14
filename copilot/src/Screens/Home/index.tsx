import React, {useEffect, useState, useRef} from "react";
import { View, StyleSheet, Platform } from "react-native";
import MapView, {Marker} from "react-native-maps";
import * as Application from 'expo-application';
import * as Location from "expo-location";
import Search from '../../components/Search';

import MapViewDirections from "react-native-maps-directions";

const Home = () => {
const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
const [destination, setDestinati] = useState<[number, number]>([0, 0]);
const [location, setLocation] = useState(
  {
    latitude: -15.833391,
    longitude: -48.05713,
  }
);

const locationState = (location) => {
  setLocation ({
    latitude: location.lat,
    longitude: location.lng
  })
}

useEffect(() => {
  async function loadPosition() {
    let { status } =
      await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }  
    const location = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = location.coords;
    setInitialPosition([
      latitude,
      longitude
    ]);    
  }
  loadPosition();    
}, []);
return (
  <View style={styles.container}>
    {initialPosition[0] !== 0 && (
    <MapView
      style={styles.map}
      //showLocationButton ={true}
      initialRegion={{
        //latitude:  coordinates[0].latitude,
        //longitude: coordinates[0].longitude,
        
        latitude: initialPosition[0],
        longitude: initialPosition[1],
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      showsUserLocation
      loadingEnabled
      mapType='standard'
      ref={el => (this.mapView = el)}
     >
      <MapViewDirections
        origin={[
          initialPosition[0],
          initialPosition[1]
        ]}
        destination={location}
        apikey={"AIzaSyCs16EPfb6vFTySbyWrN1Jijfn3c0RX4R0"}
        strokeWidth={4}
        strokeColor="#ffa500"
        onReady={result => { 
          this.mapView.fitToCoordinates(result.coordinates)
        }}
        />
      <Marker coordinate={location} />
    </MapView>
    )}
     <Search locationStateCallback={locationState}/>
  </View>
);
};
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#fff",
      paddingTop: Platform.OS == "android" ? 25 : 0,
  },
  headerContainer: {
      padding: 15,
  },
  title: {
      fontSize: 24,
      fontWeight: "400",
      color: "rgb(0, 0, 0)",
  },
  subTitle: {
      fontSize: 14,
      fontWeight: "bold",
      color: "rgb(0, 0, 0)",
  },
  map: {
      flex: 1,
  },
  categoryContainer: {
      padding: 10,
  },
    newMarker: {
      height: 50,
      width: 50,
      backgroundColor: "yellow",
    },
})
export default Home;

// http://192.168.1.15:8006
