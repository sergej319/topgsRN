import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import {useState, useEffect} from 'react'

export default function DayItem({item}){
        
            return(
            <View>

                <Text style={styles.table}>{item.main.temp}°C</Text>
            </View>
        )
    
}

const styles = StyleSheet.create({
    table: {
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 12
      }
})