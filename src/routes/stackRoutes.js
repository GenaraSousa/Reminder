import AsyncStorage from '@react-native-async-storage/async-storage';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import ConfigUserView from '../views/ConfigUserView';
import HomeView from '../views/HomeView';
import WellcomeView from '../views/WellcomeView';

const stackRoutes = createStackNavigator();

export default function AppRoutes() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    useEffect(() => {
        async function getUser() {
            try {
                const value = await AsyncStorage.getItem('@ReminderApp_userName')
                if (value) {
                    setIsSignedIn(true);
                }
            } catch (e) {
                console.log(e)
            }
        }
        getUser();
    }, [])
    return (
        <stackRoutes.Navigator
            mode='modal'
            headerMode="float"
            headerBackground='white'
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
                headerBackground: 'transparent',
                cardStyle: {
                    backgroundColor: '#fff'
                },
            }}>

            {isSignedIn ?
                <stackRoutes.Screen
                    name="HomeView"
                    component={HomeView} /> :
                (
                    <>
                        <stackRoutes.Screen
                            name="Wellcome"
                            component={WellcomeView} />

                        <stackRoutes.Screen
                            name="ConfigUserView"
                            component={ConfigUserView} />
                        <stackRoutes.Screen
                            name="HomeView"
                            component={HomeView} />
                    </>
                )
            }
        </stackRoutes.Navigator>
    )
}

