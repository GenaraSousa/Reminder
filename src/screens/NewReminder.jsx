import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function NewReminder() {
    return (
        <SafeAreaView style ={ style.container}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <View style={style.header}>
                <Text style={style.title} >Novo lembrete</Text>
            </View>
            <View>

            </View>
            <View style={style.footer}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() =>  {}}
                    style={style.buttonAdd}
                >
                    <Text style={style.textButton}>Concluir</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    header: {
        width: '100%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5%',
    },
    title: {
        fontFamily: fonts.bold,
        color: colors.black,
        fontSize: 24,
    },
    footer: {
        height: '13%',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    buttonAdd:{
        width: '100%',
        height: 50,
        borderRadius: 5,
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    textButton:{
        fontFamily: fonts.bold,
        color: 'white',
        fontSize: 25,
    }
})
