import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "@firebase/database";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBNPOtZklfn_BQOmnggvss2DjQW_IjZScg",
  authDomain: "messageproject-a3d23.firebaseapp.com",
  databaseURL: "https://messageproject-a3d23-default-rtdb.firebaseio.com",
  projectId: "messageproject-a3d23",
  storageBucket: "messageproject-a3d23.appspot.com",
  messagingSenderId: "762711572558",
  appId: "1:762711572558:android:0a1448440bb14867fb431f",
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app,{
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
const storage = getStorage(app); 

export { auth, database, storage };