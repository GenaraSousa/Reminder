import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import ButtonRadius from '../components/ButtonRadius';
import colors from '../styles/colors';
export default function WelcomeView() {
    const navigation = useNavigation();

    function handleMoveView() {
        navigation.navigate('ConfigUserView')
    }

    return (
        <SafeAreaView
            style={style.container}>
            <Text style={style.title}> Reminder </Text>
            <Image source={require('../assets/img/ilustration.png')} style={style.img} />
            <Text style={style.subTitle}>Eu te ajudo a lembrar e você aprende, fácil assim.</Text>
            <View style={style.areaButton}>
                <ButtonRadius text='Ok' onPress={handleMoveView} />
            </View>
            <StatusBar />
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
        marginTop: '3%'
    },
    subTitle: {
        fontSize: 18,
        fontFamily: 'monospace',
        fontWeight: 'bold',
        color: colors.subTitleColor,
        marginBottom: '15%'
    },
    img: {
        resizeMode: 'contain',
        width: '100%',
    },
    areaButton: {
        height: '10%',
        width: '100%',
        marginBottom: '5%',
        alignItems: 'center',
        justifyContent: 'center'
    }

})