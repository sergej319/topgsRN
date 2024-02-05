import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native"
import React, {useEffect, useState} from "react"
import {MaterialIcons} from '@expo/vector-icons'
import appid from "../constants/appid"
import axios from "axios"

export default function TodoItem({item, fetchDayData, fetchMultipleDayData}) {

    const [cities, setCities] = useState()
    const [isLoading, setIsLoading] = useState(false)
    

    const newItem = {...item, country: `https://flagsapi.com/${item.country}/flat/64.png`}

    

    
    return(
        <TouchableOpacity onPress={() => {
            fetchDayData(newItem)
            fetchMultipleDayData(newItem)
            }
        }>
            <View style={styles.item}>   
                <Text style={styles.newItemText}>{newItem.local_names.en === undefined ? newItem.local_names.hr : newItem.local_names.en }</Text>
                <Image source={{uri: newItem.country}} style={styles.logo}/>
                  
                
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    item: {
        padding: 16,
        marginTop: 16,
        borderColor: '#000',
        borderWidth: 1,
        borderStyle: 'solid',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logo: {
        width: 32,
        height: 32
    }
    
})