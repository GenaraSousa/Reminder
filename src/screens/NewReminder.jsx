import React, { useState } from 'react';
import { SafeAreaView, Keyboard, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import colors from '../styles/colors';
import fonts from '../styles/fonts'

export function NewReminder() {
    const [time, setTime] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);

    const [contentTitle, setContentTitle] = useState("");
    const [content, setContent] = useState("");
    const [contentTitleFocus, setContentTitleFocus] = useState(false);

    const [selectedLanguage, setSelectedLanguage] = useState();


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(Platform.OS === 'ios');
        setTime(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
    };

    const showTimepicker = () => {
        showMode('time');
    };


    return (
        <TouchableWithoutFeedback style={style.container} onPress={() => { Keyboard.dismiss(), setContentTitleFocus(false) }} >
            <SafeAreaView style={style.container}>
                <StatusBar barStyle="dark-content" backgroundColor="white" />
                <View style={style.header}>
                    <Text style={style.title} >Novo lembrete</Text>
                </View>
                <ScrollView style={style.containerForm}>
                    <View style={style.containerInputSimple}>
                        <TextInput
                            value={contentTitle}
                            maxLength={30}
                            onChangeText={(value) => { setContentTitle(value) }}
                            placeholder="Título"
                            placeholderTextColor={colors.gray20}
                            style={style.input}
                            onFocus={() => { setContentTitleFocus(true) }}
                        />
                        {contentTitleFocus ?
                            <Text style={style.latterCont}>
                                {contentTitle.length}/30
                            </Text> :
                            null
                        }
                    </View>
                    <TextInput
                        value={content}
                        multiline={true}
                        onChangeText={(value) => { setContent(value) }}
                        placeholder="Conteúdo"
                        placeholderTextColor={colors.gray20}
                        style={style.textArea}
                        onFocus={() => { setContentTitleFocus(false) }}
                    />

                    <View style={{marginBottom: 15,}}>
                        <Text style={style.label}>
                            Primeiro lembrete
                        </Text>
                        <TouchableOpacity
                            style={style.inputWithIcon}
                            onPress={showTimepicker}
                            title="Show time picker!">
                            <Text style={style.hours}>
                                {`${format(time, 'HH:mm')}`}
                            </Text>
                            <MaterialCommunityIcons style={{ alignSelf: 'center' }} name="clock-time-three" size={24} color={colors.gray20} />
                        </TouchableOpacity>
                    </View>

                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={time}
                            mode='time'
                            is24Hour={true}
                            display="spinner"
                            onChange={onChange}
                        />
                    )}

                    <Picker
                        selectedValue={selectedLanguage}
                        style={style.input}
                        dropdownIconColor={colors.gray20}
                        inputWithIcon={true}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedLanguage(itemValue)
                        }>
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker>

                </ScrollView>
                <View style={style.footer}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => { }}
                        style={style.buttonAdd}
                    >
                        <Text style={style.textButton}>Concluir</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
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

    containerForm: {
        width: '80%',
        marginBottom: 10,
        marginTop: 15,
    },
    containerInputSimple: {
        alignItems: 'flex-end',
        marginBottom: 15,
    },
    latterCont: {
        marginTop: 3,
        fontSize: 14,
        fontFamily: fonts.regular,
        color: colors.gray20,
    },
    input: {
        height: 40,
        width: '100%',
        backgroundColor: colors.gray10,
        color: colors.black,
        borderRadius: 5,
        paddingHorizontal: 15,
        fontFamily: fonts.regular,
        fontSize: 18,
    },

    textArea: {
        height: 120,
        textAlign: 'justify',
        textAlignVertical: 'top',
        justifyContent: 'flex-start',
        width: '100%',
        backgroundColor: colors.gray10,
        color: colors.black,
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontFamily: fonts.regular,
        fontSize: 18,
        marginBottom: 15,
    },
    inputWithIcon: {
        flexDirection: 'row',
        height: 40,
        width: '100%',
        justifyContent: 'flex-end',
        backgroundColor: colors.gray10,
        color: colors.black,
        borderRadius: 5,
        paddingHorizontal: 15,
        fontFamily: fonts.regular,
        fontSize: 18,
    },

    label: {
        fontFamily: fonts.regular,
        fontSize: 18,
        color: colors.gray20,
        marginBottom: 3,

    },

    hours: {
        fontFamily: fonts.medium,
        width: '80%',
        color: colors.black,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 18,
    },

    footer: {
        height: '13%',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    buttonAdd: {
        width: '100%',
        height: 50,
        borderRadius: 5,
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        fontFamily: fonts.bold,
        color: 'white',
        fontSize: 25,
    }
})
