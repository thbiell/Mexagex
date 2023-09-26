import { AppRegistry } from 'react-native';
import { initializeApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
import { getDatabase } from '@react-native-firebase/database';
import { getStorage } from '@react-native-firebase/storage';



const firebaseConfig = {
  apiKey: "AIzaSyBNPOtZklfn_BQOmnggvss2DjQW_IjZScg",
  authDomain: "messageproject-a3d23.firebaseapp.com",
  databaseURL: "https://messageproject-a3d23-default-rtdb.firebaseio.com",
  projectId: "messageproject-a3d23",
  storageBucket: "messageproject-a3d23.appspot.com",
  messagingSenderId: "762711572558",
  appId: "1:762711572558:android:0a1448440bb14867fb431f",
};

// Inicialize o Firebase com a configuração
const firebaseApp = initializeApp(firebaseConfig);

// Obtenha as instâncias do Firebase que você deseja usar
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);

// Agora você pode exportar essas instâncias para uso em todo o seu aplicativo
export { auth, database, storage };