import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import WellcomeView from '../views/WellcomeView';
import HomeView from '../views/HomeView';
import ConfigUserView from '../views/ConfigUserView';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
            headerMode="none"
            screenOptions={{
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

