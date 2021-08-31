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
import { removeReminderStorage } from './src/services/storage';

export default function App() {
  const Stack = createStackNavigator();
  const [isPermissionRead, setIsPermissionRead] = useState(false)
  const [isPermissionWrite, setIsPermissionWrite] = useState(false)

  useEffect(() => {
    requestPermissionsStorage();
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      removeReminderStorage(response.notification.request.identifier);

      if (response.notification.request.content.data.reminder.multiplicadorBreak > 1) {
        //verificar se já foi repetido alguma vez
        if (response.notification.request.content.data.reminder?.currentBreak > 0) {
          //recalcular o novo intervalo em segundos a partir de agora multiplicando pelo intervalo atual
          //Se a quantidade de repetições for maior que 1 então verificar se existe um ocorrencia e incrementar
          //Se não houver, criar um campo nos dados e incrementar
        }else{
          //primiera vez do notificação após o horário inicial
        }
      } else if (response.notification.request.content.data.reminder.incrimentBreak > 0) {
        //recalcular noso intervalo incrementando o atual (intervalo inicial)
        if (response.notification.request.content.data.reminder?.currentBreak > 0) {
          //recalcular o novo intervalo em segundos a partir de agora somando pelo intervalo atual
          //Se a quantidade de repetições for maior que 1 então verificar se existe uma ocorrencia e incrementar
          //Se não houver, criar um campo nos dados e incrementar
        }else{
          //primiera vez do notificação após o horário inicial
          //criar o campo de currentBreak
        }
      } else {
        //o intervalo é contínuo, apenas refazer a notificação contando a partir de agora
      }

      const notifificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: reminder.contentTitle,
          body: reminder.content,
          sound: true,
          vibrate: [0, 250, 250, 250],
          priority: Notifications.AndroidNotificationPriority.MAX,
          data: {
            reminder
          },
        },
        trigger: {
          hour: Number(nextTime.getHours()),
          minute: Number(nextTime.getMinutes()),
          repeats: true
        }
      });


      let newHours = new Date();
      console.log('Existe: ', response.notification.request.content.data.reminder.incrimentBreak);
      newHours.setMinutes(newHours.getMinutes() + response.notification.request.content.data.reminder.incrimentBreak);
      response.notification.request.trigger.minute = response.notification.request.trigger.minute + 4;
    })
    return () => subscription.remove();
    // updateApp();
  }, [])

  //Permissão de amaznamento e leitura
  const requestPermissionsStorage = async () => {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE]
    );
    if (granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED && granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED) {
      setIsPermissionWrite(true);
      setIsPermissionRead(true);
    } else {
      Alert.alert("Ops...", 'O Reminder não funcionará corretamente sem a permissão.. 😐');
    }
  };

  async function updateApp() {
    const { isAvailable } = await Updates.checkForUpdateAsync();
    if (isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  }



  let [fontsLoaded] = useFonts({
    Jost_600SemiBold,
    Jost_400Regular,
    Jost_500Medium
  });

  if (!fontsLoaded || !isPermissionRead || !isPermissionWrite) {
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

