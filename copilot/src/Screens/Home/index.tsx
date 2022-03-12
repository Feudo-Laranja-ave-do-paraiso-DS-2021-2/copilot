import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Platform, FlatList, Touchable, Image } from "react-native";
import MapView, { Marker } from "react-native-maps"

export default function Home () {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}> 
                
            </View>

            <MapView style={styles.map}>
                <Marker
                    coordinate={{
                        latitude: -15.9890870,
                        longitude: -48.0453828,
                    }}
                />
            </MapView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    headerContainer: {
        padding: 15,
        paddingTop: Platform.OS == "android" ? 10 : 0,
    },
    title: {
        fontSize: 24,
        fontWeight: "400",
        color: "rgb(0, 0, 0)",
    },
    subTitle: {
        fontSize: 14,
        fontWeight: "400",
        color: "rgb(0, 0, 0)",
    },
    map: {
        flex: 1,
    },
    categoryContainer: {
        padding: 10,
    },
})