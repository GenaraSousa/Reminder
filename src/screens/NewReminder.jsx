import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
    Dimensions,
    Platform,
    Keyboard
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import InputSpinner from "react-native-input-spinner";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format, isBefore } from 'date-fns';
import colors from '../styles/colors';
import fonts from '../styles/fonts'
import { setReminderStore } from '../services/storage';

const margin = Dimensions.get('window').width * 0.80;
export function NewReminder() {
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');

    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [contentTitle, setContentTitle] = useState("");
    const [content, setContent] = useState("");
    const [contentTitleFocus, setContentTitleFocus] = useState(false);
    const [multiplicadorBreak, setMultiplicadorBreak] = useState(1);
    const [incrimentBreak, setIncrimentBreak] = useState(0);
    const [initialBreak, setInitialBreak] = useState(1);
    const [repititionsBreak, setRepititionsBreak] = useState(1);
    const [maximumBreak, setMaximumBreak] = useState(initialBreak + incrimentBreak);


    function onChange (event, dateTime) {
        if (Platform.OS == 'android') {
            setShowDatePicker(oldState => !oldState);
        }
        if (dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date())
            return Alert.alert('Escolha uma hora válida! ⏰ ');
        }
        if (dateTime)
            setSelectedDateTime(dateTime);
    }

    function handleOpenDareTimePickerForAndroid() {
        setShowDatePicker(oldState => !oldState);
    }

    async function handleSave() {
        Keyboard.dismiss();

        if(!contentTitle || !content){
            return Alert.alert('Opa..', 'Preencha todos os campos.. 🙃');
        }

        try {
            await setReminderStore({
                contentTitle,
                content,
                selectedDateTime,
                initialBreak,
                incrimentBreak,
                multiplicadorBreak,
                repititionsBreak,
                maximumBreak,
            })

            setContent("");
            setContentTitle("");
            setIncrimentBreak(1);
            setMultiplicadorBreak(1);
            setRepititionsBreak(1);
            setMaximumBreak(50);
            setInitialBreak(1);
            Alert.alert("Sucesso!", "Lembrete armazenado.. 🥰")

        } catch (error) {
            console.log(error)
            Alert.alert('Desculpe','Não foi possível salvar. 😥 ');
        }
    }


    return (

        <SafeAreaView style={style.container}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <View style={style.header}>
                <Text style={style.title} >Novo lembrete</Text>
            </View>

            <ScrollView
                style={style.containerForm}

                showsVerticalScrollIndicator={false}
            >
                <View style={{width: margin, marginBottom: 50}}>
                    {/* TITULO */}
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

                    {/* CONTEÚDO */}

                    <TextInput
                        value={content}
                        multiline={true}
                        textBreakStrategy='highQuality'
                        onChangeText={(value) => { setContent(value) }}
                        placeholder="Conteúdo"
                        placeholderTextColor={colors.gray20}
                        style={style.textArea}
                        onFocus={() => { setContentTitleFocus(false) }}
                    />

                    {/* HORÁRIO DO PRIMEIRO LEMBRETE */}

                    { Platform.OS == 'android' && (<View style={{ marginBottom: 15, }}>
                        <Text style={style.label}>
                            Primeiro lembrete
                        </Text>
                        <TouchableOpacity
                            style={style.inputWithIcon}
                            onPress={handleOpenDareTimePickerForAndroid}
                            title="Show time picker!">
                            <Text style={style.hours}>
                                {`${format(selectedDateTime, 'HH:mm')}`}
                            </Text>
                            <MaterialCommunityIcons style={{ alignSelf: 'center' }} name="clock-time-three" size={30} color={colors.gray20} />
                        </TouchableOpacity>
                    </View>)}

                    {showDatePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={selectedDateTime}
                            mode='time'
                            
                            display="spinner"
                            onChange={ onChange}
                        />
                    )}

                    {/* INTERVALO INICIAL */}


                    <Text style={style.label}>
                        Intervalo inicial (min)
                    </Text>

                    <InputSpinner
                        style={style.inputSpinner}
                        max={1000}
                        min={1}
                        step={1}
                        buttonStyle={style.buttonSpinner}
                        inputStyle={style.textSpinner}
                        rounded={false}
                        value={initialBreak}
                        onChange={(num) => {
                            setInitialBreak(num);
                        }}
                    />
                    {/* Multiplicador de intervalo (min)*/}


                    <Text style={style.label}>
                        Invremento ao intervalo (min)
                    </Text>
                    <InputSpinner
                        style={style.inputSpinner}
                        max={1000}
                        min={0}
                        step={1}
                        buttonStyle={style.buttonSpinner}
                        inputStyle={style.textSpinner}
                        rounded={false}
                        value={incrimentBreak}
                        onChange={(num) => {
                            setIncrimentBreak(num);
                        }}
                    />

                    {/* Multiplicador de intervalo (min)*/}


                    <Text style={style.label}>
                        Multiplicador de intervalo (min)
                    </Text>


                    <InputSpinner
                        style={style.inputSpinner}
                        max={1000}
                        min={1}
                        step={1}
                        buttonStyle={style.buttonSpinner}
                        inputStyle={style.textSpinner}
                        rounded={false}
                        value={multiplicadorBreak}
                        onChange={(num) => {
                            setMultiplicadorBreak(num);
                        }}
                    />

                    {/* QUANTIDADE DE REPETÇÕES*/}

                    <Text style={style.label}>
                        Quantidade de repetições
                    </Text>

                    <InputSpinner
                        style={style.inputSpinner}
                        max={1000}
                        min={1}
                        step={1}
                        buttonStyle={style.buttonSpinner}
                        inputStyle={style.textSpinner}
                        rounded={false}
                        value={repititionsBreak}
                        onChange={(num) => {
                            setRepititionsBreak(num);
                        }}
                    />


                    <Text style={style.label}>
                        Intervalo máximo (min)
                    </Text>

                    <InputSpinner
                        style={style.inputSpinner}
                        max={1000}
                        min={1}
                        step={1}
                        buttonStyle={style.buttonSpinner}
                        inputStyle={style.textSpinner}
                        rounded={false}
                        value={maximumBreak}
                        onChange={(num) => {
                            setMaximumBreak(num);
                        }}
                    />

                </View>
            </ScrollView>
            <View style={style.footer}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={handleSave}
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
        width: '100%',
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
        paddingHorizontal: '10%',
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
        height: 50,
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
        height: 50,
        width: '100%',
        justifyContent: 'flex-end',
        backgroundColor: colors.gray10,
        color: colors.black,
        borderRadius: 5,
        paddingHorizontal: 5,
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
        width: '78%',
        color: colors.black,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 18,
    },
    picker: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.gray10,
        borderRadius: 5,
        fontFamily: fonts.regular,
        fontSize: 18,
    },
    inputSpinner: {
        height: 40,
        backgroundColor: colors.gray10,
        color: colors.black,
        borderRadius: 5,
        paddingHorizontal: 5,
        fontFamily: fonts.regular,
        fontSize: 18,
        justifyContent: 'center',
        marginBottom: 10,
    },

    buttonSpinner: {
        width: 30,
        height: 30,
        backgroundColor: colors.gray20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textSpinner: {
        fontFamily: fonts.medium,
        height: 40,

        fontSize: 18,
        color: colors.black,
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
        marginTop: 5,
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
