import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { format } from 'date-fns/esm';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

/**
 * Returns void
 * @param { {} } stickyNote
 * 
 */
export async function setReminderStore(stickyNote) {
  try {

    //Buscar lembretes do async storage
    const nextTime = new Date(stickyNote.selectedDateTime);
    const now = new Date();

    const seconds = Math.abs(
      Math.ceil((now.getTime() - nextTime.getTime()) / 1000 )
    )

    const notifificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: stickyNote.contentTitle,
        body: stickyNote.content,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.MAX,
        data: {
          stickyNote
        },
      }, 
      trigger: {
        seconds: seconds < 60 ? 60: seconds,
        repeats: true,
      }
    });


    const data = await AsyncStorage.getItem('@SmartReminder:StickyNotes');
    const oldStickNotes = data ? (JSON.parse(data)) : {};
    const id = uuidv4();
    const newStickyNote = {
      [id]: {
        data:{ ...stickyNote, id},
        hour: stickyNote.selectedDateTime,
        id,
        notifificationId
      }
    }
    await AsyncStorage.setItem('@SmartReminder:StickyNotes',
      JSON.stringify({
        ...newStickyNote,
        ...oldStickNotes
      })
    ) 
  } catch (e) {
    throw new Error(e);
  }
}


export async function loadRemindersStorage() {
  try {
    const data = await AsyncStorage.getItem('@SmartReminder:StickyNotes');
    const stickeNotes = data ? (JSON.parse(data)) : {};
    const stickNotesShorted = Object
    .keys(stickeNotes)
    .map((stickeNote) => {
      return {
        ...stickeNotes[stickeNote].data,
        hour: format(new Date(stickeNotes[stickeNote].data.selectedDateTime), 'HH:mm')
      }
    })
    return stickNotesShorted;
  } catch (error) {
    throw new Error(error);
  }
}

export async function removeReminderStorage(id) {

  try {
    const data = await AsyncStorage.getItem('@SmartReminder:StickyNotes');
    const stickeNotes = data ? (JSON.parse(data)) : {};

    //Cancelar a notificação
    await Notifications.cancelScheduledNotificationAsync(stickeNotes[id].notifificationId);

    //Deletar do armazenamento local
    delete stickeNotes[id];
    await AsyncStorage.setItem(
      '@SmartReminder:StickyNotes',
      JSON.stringify(stickeNotes)
    )
    
  } catch (error) {
    throw new Error(error);
  }
}
