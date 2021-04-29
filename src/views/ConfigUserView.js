import React, { useState } from 'react';
import {
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet,
    View,
    Text,
    TextInput,
} from 'react-native';
import { useNavigation} from '@react-navigation/core';
import {CommonActions} from '@react-navigation/native';
import colors from '../styles/colors';
import Button from '../components/ButtonRadius';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ConfigUserView() {
    const [IsFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState();
    const navigation = useNavigation();

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!name);
    }
    function handleInputFocus() {
        setIsFocused(true);
    }
    function handleInputChange(value) {
        setIsFilled(!!value);
        setName(value);
    }

     async function handleSubmit() {
         console.log(name);
         if(name){
            try {
                await AsyncStorage.setItem('@ReminderApp_userName', name)
            } catch (e) {
                console.log(error);
            }
            navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'HomeView' }],
            })
            )
         }
            
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.h1}>Reminder</Text>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>

                            <View style={styles.header}>
                                <Text style={styles.title}>
                                    Como posso chamar você?
                                </Text>
                            </View>
                            <TextInput
                                style={[
                                    styles.input,
                                    (IsFocused || isFilled) && { borderColor: colors.inputActive }]}
                                placeholder="Nome"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange}
                            />

                            <View style={styles.footer}>
                                <Button
                                    text="Ok"
                                    onPress={handleSubmit}
                                />
                            </View>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView >

    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    content: {
        flex: 1,
        width: '100%',
    },
    h1: {

        top: '10%',
        fontSize: 25,
        fontFamily: 'serif',
        fontWeight: 'bold',
        color: colors.primaryColor,
        marginBottom: '60%',
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
        height: '100%'
    },
    header: {
        alignItems: 'center'
    },
    emoji: {
        fontSize: 50
    },
    input: {
        borderWidth: 2,
        borderColor: colors.inputColor,
        color: colors.subTitleColor,
        borderRadius: 5,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        paddingLeft: 10,
        padding: 5,
        textAlign: 'left'
    },
    title: {
        fontSize: 18,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.titleColor,
        fontFamily: 'serif',
        marginTop: 20
    },
    footer: {
        marginTop: 40,
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'center'
    }
})