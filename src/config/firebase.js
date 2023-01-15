import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: 'AIzaSyBVXThKZyK9CzHQS50CaYanI4sCprn_O-E',
  authDomain: 'voisik-f8e18.firebaseapp.com',
  projectId: 'voisik-f8e18',
  storageBucket: 'voisik-f8e18.appspot.com',
  messagingSenderId: '180303401153',
  appId: '1:180303401153:web:8c580ec6e2c24e2ec58440',
  measurementId: 'G-CE8NEXT81F',
};

const app = initializeApp(firebaseConfig);

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LcBUf0jAAAAAPKS_daNmV5Y-Oc3TcZ2mopDFVoh'),
  isTokenAutoRefreshEnabled: true
});


export default getFirestore(app);
