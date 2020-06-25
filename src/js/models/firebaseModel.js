import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export default class FirebaseModel {
  constructor() {
    this.firebaseConfig = {
      apiKey: 'AIzaSyCoqpTfOVB0Ooc_1PXQBIjYafAK3Lr3woY',
      authDomain: 'rsland-5710a.firebaseapp.com',
      databaseURL: 'https://rsland-5710a.firebaseio.com',
      projectId: 'rsland-5710a',
      storageBucket: 'rsland-5710a.appspot.com',
      messagingSenderId: '839023755415',
      appId: '1:839023755415:web:4b216318c83fa4c68969d2',
      measurementId: 'G-3YELKYH44D',
    };
    firebase.initializeApp(this.firebaseConfig);
    this.auth = firebase.auth();
    this.database = firebase.database();
  }

  onAuthStateChangedHandler() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        // todo: show modal on refresh
        console.log('user log in');
      } else {
        console.log('user log out');
      }
    });
  }

  writeUserData(email, username, password) {
    this.database.ref(`users/${this.auth.currentUser.uid}`).set({
      username,
      email,
      password,
    });
  }

  onLogOut() {
    this.auth.signOut();
  }
}
