import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Platform, FlatList, Touchable, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps"
import {categories} from "./categories";

export default function Home () {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}> 
                <Text style={styles.title}>Bem-vindo!</Text>
                <Text style={styles.subTitle}>"Olá eu sou a Home"</Text>
            </View>

            <MapView style={styles.map}>
                <Marker
                    coordinate={{
                        latitude: -15.9890870,
                        longitude: -48.0453828,
                    }}
                />
            </MapView>

            <View style={styles.categoryContainer}>

                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        alignItems: "center"
                    }}
                    renderItem={({item})=>(
                        <TouchableOpacity
                            key={item.key}
                        >
                            <Image source={item.image}/>
                            <Text>{item.label}</Text>

                        </TouchableOpacity>
                    )}
                />
            </View>

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
        paddingTop: Platform.OS == "android" ? 0 : 0,
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