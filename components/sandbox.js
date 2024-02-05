import { StyleSheet, Text, View } from "react-native"
import React from "react"


export default function Sandbox() {
    return(
        <View style={styles.container}>
            <Text style={styles.boxOne}>one</Text>
            <Text style={styles.boxTwo}>two</Text>
            <Text style={styles.boxThree}>three</Text>
            <Text style={styles.boxFour}>four</Text>
        </View>
        
    )
}


const styles = StyleSheet.create({
    container: {
        //flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        paddingTop: 40,
        backgroundColor: '#ddd'
    },
    boxOne: {
        flex: 1,
        backgroundColor: 'violet',
        padding: 10,
    },
    boxTwo: {
        flex: 1,
        backgroundColor: 'gold',
        padding: 20,
    },
    boxThree: {
        flex: 1,
        backgroundColor: 'coral',
        padding: 30,
    },
    boxFour: {
        flex: 1,
        backgroundColor: 'skyblue',
        padding: 40,
    }
})