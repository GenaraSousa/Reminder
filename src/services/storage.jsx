import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
export async function setReminderStore(stickyNote) {
  try {
    //Buscar lembretes do async storage
    const data = await AsyncStorage.getItem('@SmartReminder:StickyNotes');
    const oldStickNotes = data ? (JSON.parse(data)) : {};
    const id = uuidv4();
    const newStickyNote = {
      [id]: {
        data: stickyNote,
        id,
      }
    }
    await AsyncStorage.setItem('@storage_Key',
      JSON.stringify({
        ...newStickyNote,
        ...oldStickNotes
      })
    )
  } catch (e) {
    console.log(e)
    throw new Error(e);
  }
}
