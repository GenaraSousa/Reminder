import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import { FontAwesome } from '@expo/vector-icons';

export default function ButtonRadius({text, onPress}) {
    return (
            <TouchableOpacity style={style.button} onPress= {onPress} >
                {text === 'Ok' ? <FontAwesome name="check" size={24} color="white" /> : <Text style={style.buttonTitle}>{text}</Text>}            
            </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        width: 60,
        borderRadius: 100,
        backgroundColor: colors.primaryColor,
        marginTop: '20%',
        elevation: 10,
    },
    buttonTitle:{
        color: '#fff', 
        fontFamily: 'sans-serif-condensed',
        fontSize: 24,
        fontWeight: 'bold',
    }
})