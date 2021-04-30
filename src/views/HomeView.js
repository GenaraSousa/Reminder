import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,

    View
} from 'react-native';
import ButtonRadius from '../components/ButtonRadius';
import FormModal from '../components/FormModal';
import colors from '../styles/colors';

export default function HomeView() {
    const [name, setName] = useState();
    const [modalVisible, setModalVisible] = useState(false)
    useEffect(() => {
        async function getUser() {
            try {
                const value = await AsyncStorage.getItem('@ReminderApp_userName')
                if (value) {
                    setName(value);
                } else {
                    setName('Usuário')
                }
            } catch (e) {
                console.log(e)
            }
        }
        getUser();
    }, [])

    return (
        <SafeAreaView style={style.container}>
            <View style={style.header}>
                <Text style={style.textHello}>Olá</Text>
                <Text style={style.userName}>{name}</Text>
            </View>
            <Text style={style.textSection}>Seus lembretes</Text>
            <View style={style.containerList}>
                <FlatList />
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >

                <FormModal setVisibiliti={() => setModalVisible(false)} />

            </Modal>
            <View style={style.button}>
                <ButtonRadius text="+" onPress={() => {
                    setModalVisible(true);
                }} />
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        paddingHorizontal: '10%'
    },
    header: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: '10%',
        marginBottom: '10%'
    },
    textHello: {
        fontSize: 18,
        color: colors.textLightColor,
        fontFamily: 'sans-serif-condensed',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primaryColor,
    },
    textSection: {
        fontSize: 18,
        fontFamily: 'sans-serif-condensed',
        fontWeight: 'bold',
        color: colors.subTitleColor,
    },
    containerList: {
        height: '55%'
    },
    button: {
        position: 'absolute',
        width: '125%',
        alignItems: 'center',
        bottom: '2%',
    }
})

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    buttonModal: {

    }
});