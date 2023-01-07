// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDNEE8lpElqMse5VeGY4SB85KRfbt8nF-s',
  authDomain: 'freshfruitcreamery-66001.firebaseapp.com',
  projectId: 'freshfruitcreamery-66001',
  storageBucket: 'freshfruitcreamery-66001.appspot.com',
  messagingSenderId: '736948979301',
  appId: '1:736948979301:web:f4d07d0bf4dec6e252e88c',
  measurementId: 'G-YWRDR6Q9P8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
