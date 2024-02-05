import { StyleSheet, Text, View } from "react-native"
import React from "react"
export default function Header() {
    return(
        <View style={styles.header}>
            <Text style={styles.title}>Cobra Weather</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        height: 80,
        paddingTop: 38,
        backgroundColor: '#333'
    },
    title: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center'
    }
})