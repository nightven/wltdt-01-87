import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: 'AIzaSyD0y2jUPN0vLTR8P4TcuuhfmwzbbEE6s1I',
  authDomain: 'code-masters-db210.firebaseapp.com',
  projectId: 'code-masters-db210',
  storageBucket: 'code-masters-db210.appspot.com',
  messagingSenderId: '122746698444',
  appId: '1:122746698444:web:c28498464d30808cefe069',
  measurementId: 'G-MKWFTWJBSH',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export { auth };
