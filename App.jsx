import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Updates from 'expo-updates';
import { Alert, View, Text, PermissionsAndroid } from 'react-native';

import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { Jost_600SemiBold, Jost_400Regular, Jost_500Medium } from '@expo-google-fonts/jost';
import * as Notifications from 'expo-notifications';
import { useFonts } from 'expo-font';
import { Home } from './src/screens/Home'
import AppLoading from 'expo-app-loading';
import { NewReminder } from './src/screens/NewReminder';

export default function App() {
  const Stack = createStackNavigator();
  const [isPermissionRead, setIsPermissionRead] = useState(false)
  const [isPermissionWrite, setIsPermissionWrite] = useState(false)
  const [isPermissionNotification, setIsPermissionNotification] = useState(false)

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener( response => {
      console.log('Retorno do bagulho: ', response)
    })
    return () => subscription.remove();
    /*   const subscripition = Notifications.addNotificationReceivedListener(
        async notification => {
          const data = notification.request.content.data.stickyNote;
          //notification.request.trigger.
          console.log(data);
        }
      );
      return subscripition.remove(); */
    /* async function notifications(){
      const data = await Notifications.getAllScheduledNotificationsAsync();
      console.log(data);
    }
    notifications(); */
    // updateApp();
    // requestPermissionsStorage();
  }, [])

  /*   async function registerForPushNotificationsAsync() {
      let token;
      if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
      } else {
        alert('Must use physical device for Push Notifications');
      }
    
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
      return token;
    } */
/* 
  async function updateApp() {
    const { isAvailable } = await Updates.checkForUpdateAsync();
    if (isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  }

  const requestPermissionsStorage = async () => {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE]
    );
    console.log(granted);
    if (granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED && granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED ) {
      setIsPermissionWrite(true);
      setIsPermissionRead(true);
      alertIfRemoteNotificationsDisabledAsync()
    } else {
      Alert.alert("Ops...", 'O Reminder não funcionará corretamente sem a permissão.. 😐');
    }
  };

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
 */
  let [fontsLoaded] = useFonts({
    Jost_600SemiBold,
    Jost_400Regular,
    Jost_500Medium
  });

  if (!fontsLoaded ) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          //headerMode='float'
          screenOptions={{
            headerShown: false,
            /*gestureEnabled: true,
            gestureDirection: "horizontal",*/
            cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid
          }}
          initialRouteName={"Home"}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="NewReminder" component={NewReminder} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

}

