import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View, 
    FlatList,
} from 'react-native';
import Button from '../components/ButtonRadius'
import colors from '../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomeView() {
    const [name, setName] = useState();

    useEffect(  () => {
        async function getUser(){
            try {
                const value = await AsyncStorage.getItem('@ReminderApp_userName')
                if(value) {
                    setName(value);
                }else{
                    setName('Usuário')
                }
              } catch(e) {
                console.log(e)
              } 
        }
        getUser();
    },[])

    return (
        <SafeAreaView style={style.container}>
            <View style={style.header}>
                <Text style={style.textHello}>Olá</Text>
                <Text style={style.userName}>{name}</Text>
            </View>
            <Text style={style.textSection}>Seus lembretes</Text>
            <View>
                <FlatList />
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'flex-start',
        paddingHorizontal: '10%'
    },
    header:{
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop:'15%',
        marginBottom: '10%'
    },
    textHello:{
        fontSize: 18,
        color: colors.textLightColor,
        fontFamily: 'sans-serif-condensed',
    },
    userName:{
        fontSize: 36,
        fontWeight: 'bold',
        color: colors.primaryColor,
    }, 
    textSection: {
        fontSize: 18,
        fontFamily: 'sans-serif-condensed',
        fontWeight: 'bold',
        color: colors.subTitleColor,
    }
})