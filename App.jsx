import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { Jost_600SemiBold, Jost_400Regular, Jost_500Medium } from '@expo-google-fonts/jost';
import * as Notifications from 'expo-notifications';
import { useFonts } from 'expo-font';
import { Home } from './src/screens/Home'
import AppLoading from 'expo-app-loading';
import { NewReminder } from './src/screens/NewReminder';

export default function App() {
  const Stack = createStackNavigator();

  useEffect( () => {
  /*   const subscripition = Notifications.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data.stickyNote;
        //notification.request.trigger.
        console.log(data);
      }
    );
    return subscripition.remove(); */
    async function notifications(){
      const data = await Notifications.getAllScheduledNotificationsAsync();
      console.log(data);
    }
    notifications();
  })

  let [fontsLoaded] = useFonts({
    Jost_600SemiBold,
    Jost_400Regular,
    Jost_500Medium
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          headerMode='float'
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
