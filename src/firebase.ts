import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

/** cSpell: disable */
const firebaseApp = initializeApp({
  apiKey: "AIzaSyBhXGxtADkt2MaKtOWQLxlt_B_w_3uHvRc",
  authDomain: "firestore-bug-1c43f.firebaseapp.com",
  projectId: "firestore-bug-1c43f",
  storageBucket: "firestore-bug-1c43f.appspot.com",
  messagingSenderId: "47560050411",
  appId: "1:47560050411:web:72d8992a8186baeff3a0ae"
});
/** cSpell: enable */

export const firestore = getFirestore(firebaseApp);
export default firebaseApp;