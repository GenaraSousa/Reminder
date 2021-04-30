import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import colors from '../styles/colors';

export default function FormModal({ setVisibiliti }) {

    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalTextTitle}>Novo lembrete</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.textInput}>Conteúdo</Text>
                    <View style={styles.input}>
                        <TextInput style={styles.text} placeholder="Ex: A raiz quadrada de pi é 3,14.." />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.textInput}>Intervalo (min)</Text>
                    <View style={styles.input}>
                        <TextInput keyboardType="numeric" style={styles.text} placeholder="Ex: 30                                              " />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.textInput}>Intervalo exponencial</Text>
                    <View style={styles.input}>
                        <TextInput keyboardType="numeric" style={styles.text} placeholder="0                                                      " />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.textInput}>Repetições:</Text>
                    <View style={styles.input}>
                        <TextInput keyboardType="numeric" style={styles.text} placeholder="Ex: 45                                              " />
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.openButton}
                    onPress={() => {
                        setVisibiliti()
                    }}>
                    <FontAwesome name="check" size={24} color="white" />

                </TouchableOpacity>
            </View>
        </View>



    )
}

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
        backgroundColor: colors.primaryColor,

        borderRadius: 50,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalTextTitle: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        color: colors.subTitleColor,
    },
    inputContainer: {
        marginBottom: 10,

    },
    textInput: {
        fontSize: 12,
        color: colors.subTitleColor,
        marginBottom: 3
    },
    input: {
        borderWidth: 1.5,
        borderRadius: 10,
        paddingHorizontal: 10,
        borderColor: colors.primaryColor,

    },
    text: {
        fontSize: 12,
        color: colors.textLightColor
    }
});