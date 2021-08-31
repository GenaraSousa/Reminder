import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    SafeAreaView,
    TouchableOpacity,
    Alert,
    FlatList
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { loadRemindersStorage, removeReminderStorage } from '../services/storage';
import * as Notifications from 'expo-notifications';
import Animated from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import fonts from '../styles/fonts';
import colors from '../styles/colors';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});


export function Home() {

    const [isPermissionNotification, setIsPermissionNotification] = useState(false)
    const [load, setLoad] = useState(true)
    const navigation = useNavigation();
    const [reminders, setReminders] = useState([])

    async function handleRemove(reminder) {
        Alert.alert('Remover', `Deseja remover a ${reminder.contentTitle}?`, [
            {
                text: 'Não 🤷‍♀️',
                style: 'cancel'
            },
            {
                text: 'Sim ✌',
                onPress: async () => {
                    try {
                        await removeReminderStorage(reminder.id)
                        setLoad(!load);
                    } catch (error) {
                        Alert.alert('Não foi possivel remover! 👀')
                    }
                }
            }
        ])
    }

    //Verificar se tem permissão para notificação
    async function alertIfRemoteNotificationsDisabledAsync() {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();

        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            Alert.alert('Desculpe', "Você precisa autorizar as noficações.. 😶");
            return;
        }
        setIsPermissionNotification(true);
    }

    useEffect(() => {
        alertIfRemoteNotificationsDisabledAsync();
        async function loadStorageData() {
            const remindersStoraged = await loadRemindersStorage();
            setReminders(remindersStoraged);
        }
        navigation.addListener('focus', () => setLoad(!load))
        loadStorageData();
    }, [load, navigation])


    return (
        <SafeAreaView style={style.container}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <View style={style.header}>
                <Text style={style.title} >Seus lembretes</Text>
            </View>
            <FlatList
                style={{ width: '80%' }}
                data={reminders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Swipeable
                        overshootRight={false}
                        renderRightActions={() =>
                            <Animated.View>
                                <View>
                                    <TouchableOpacity
                                        style={style.buttonRemove}
                                        onPress={() => { handleRemove(item) }}>
                                        <Feather name="trash-2" size={24} color={colors.orange} />
                                    </TouchableOpacity>
                                </View>

                            </Animated.View>}
                    >
                        <TouchableOpacity style={style.cardReminder} >
                            <Text style={style.titleReminder}>
                                {item.contentTitle}
                            </Text>
                            <Text numberOfLines={3} ellipsizeMode='tail' style={style.textReminder}>
                                {item.content}
                            </Text>
                        </TouchableOpacity>
                    </Swipeable>

                )}
            />



            <View style={style.footer}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('NewReminder')}
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
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
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
        backgroundColor: 'white',
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
    },
    buttonRemove: {
        width: 100,
        height: '90%',
        backgroundColor: colors.red,
        borderRadius: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        paddingLeft: 15
    }
})
