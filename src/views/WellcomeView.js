import React from 'react';
import { SafeAreaView, Text, Image, StyleSheet } from 'react-native';
import ButtonRadius from '../components/ButtonRadius';
import colors from '../styles/colors';
import { useNavigation} from '@react-navigation/core';
export default function WelcomeView() {
    const navigation= useNavigation();

    function handleMoveView(){
        navigation.navigate('ConfigUserView')
    }
    
    return (
        <SafeAreaView style={style.container}>
            <Text style={style.title}> Reminder </Text>
            <Image source={require('../assets/img/ilustration.png')} style={style.img} />
            <Text style={style.subTitle}>Eu te ajudo a lembrar e você aprende, fácil assim.</Text>
            <ButtonRadius text='Ok' onPress={handleMoveView} />
        </SafeAreaView>

    )
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '10%',
    },
    title: {
        fontSize: 24,
        fontFamily: 'serif',
        fontWeight: 'bold',
        color: colors.primaryColor,
    },
    subTitle: {
        fontSize: 20,
        fontFamily: 'monospace',
        fontWeight: 'bold',
        color: colors.subTitleColor,
    },
    img: {
        resizeMode: 'contain',
        width: '100%',
    },

})