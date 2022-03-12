import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

export default function Group () {
    return (
        <View style={styles.GroupContainer}>
            <Text>Bem-vindo a seção dos grupos, essa página está em desenvolvimento</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    GroupContainer: {
        padding: 15,
        paddingTop: Platform.OS == "android" ? 50 : 0,
    },    
})