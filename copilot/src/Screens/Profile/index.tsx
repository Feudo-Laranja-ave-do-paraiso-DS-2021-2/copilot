import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

export default function Profile () {
    return (
        <View style={styles.ProfileContainer}>
            <Text>Bem-vindo ao perfil, essa página está em desenvolvimento</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    ProfileContainer: {
        padding: 15,
        paddingTop: Platform.OS == "android" ? 50 : 0,
    },    
})