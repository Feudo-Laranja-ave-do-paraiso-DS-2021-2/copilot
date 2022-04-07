import React, {useEffect, useState} from "react";
import { View, StyleSheet, Platform } from "react-native";
import MapView from "react-native-maps";
import * as Application from 'expo-application';
import * as Location from "expo-location";
import Search from '../../components/Search';
const Home = () => {
//const [latitude, setLatitude] = useState<number>(0);
//const [longitude, setLongitude] = useState<number>(0);
const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
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
      initialRegion={{
        latitude: initialPosition[0],
        longitude: initialPosition[1],
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      showsUserLocation
      loadingEnabled
      mapType="terrain"
    />
    )}
     <Search />
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
