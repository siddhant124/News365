import {initializeApp} from 'firebase/app';
//@ts-ignore
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDDEVJvr5hi1Qq7IyCZ93M7Tp0rVy5Pt-E',
  authDomain: 'news365-b9e71.firebaseapp.com',
  projectId: 'news365-b9e71',
  storageBucket: 'news365-b9e71.appspot.com',
  messagingSenderId: '18277469276',
  appId: '1:18277469276:web:3b2ecd3719d32f6428aa99',
  measurementId: 'G-B0JSJHLP4B',
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export {auth};
