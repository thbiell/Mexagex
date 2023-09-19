import { AppRegistry } from 'react-native';
import { initializeApp } from '@firebase/app';
import { getDatabase, ref, set, get } from '@firebase/database';
import App from './App';
import { name as appName } from './app.json';


const firebaseConfig = {
  apiKey: "AIzaSyBNPOtZklfn_BQOmnggvss2DjQW_IjZScg",
  authDomain: "messageproject-a3d23.firebaseapp.com",
  databaseURL: "https://messageproject-a3d23-default-rtdb.firebaseio.com",
  projectId: "messageproject-a3d23",
  storageBucket: "messageproject-a3d23.appspot.com",
  messagingSenderId: "762711572558",
  appId: "1:762711572558:android:0a1448440bb14867fb431f",
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

AppRegistry.registerComponent(appName, () => App);