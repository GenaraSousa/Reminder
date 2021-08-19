import React from 'react'
import { StyleSheet, Text, View, StatusBar, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { useNavigation } from '@react-navigation/native';

const reminders = [
    {
        title: 'Math',
        content: '1 mais 1 é ingual a 3'
    },
    {
        title: "coiso",
        content: '1 mais 1 é ingual a 4 texto muiuto fgatyd ajksdksj  kasidfhk aklshdakj akjdhskja kajhdska kajhsdk kajhsdk'
    },
    {
        title: 'Filo',
        content: 'Rosquinha com leite'
    }
]

export function Home() {


    const navigation = useNavigation();
    return (
        <SafeAreaView style={style.container}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <View style={style.header}>
                <Text style={style.title} >Seus lembretes</Text>
            </View>

            <ScrollView style={{ width: '80%', marginTop: '5%' }}>
                {reminders.map((item, index) => (
                    <TouchableOpacity style={style.cardReminder} key={index}>
                        <Text style={style.titleReminder}>
                            {item.title}
                        </Text>
                        <Text numberOfLines={3} ellipsizeMode='tail' style={style.textReminder}>
                            {item.content}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={style.footer}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() =>  navigation.navigate('NewReminder')}
                    style={style.buttonAdd}
                >
                    <Feather name="plus" size={24} color="white" />
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
        height: '11%',
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        paddingHorizontal: '10%',
    },
    buttonAdd: {
        width: 50,
        height: 50,
        backgroundColor: colors.green,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardReminder: {
        width: '100%',
        paddingHorizontal: '8%',
        paddingVertical: '5%',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: colors.gray30,
        marginBottom: 10,
    },
    titleReminder: {
        fontFamily: fonts.bold,
        fontSize: 24,
        color: colors.green,
    },
    textReminder: {
        fontFamily: fonts.medium,
        color: colors.black,
        fontSize: 18,
        lineHeight: 22,
    }
})
