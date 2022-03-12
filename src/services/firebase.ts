import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { Database, getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_apiKey,
  authDomain: process.env.FIREBASE_authDomain,
  projectId: process.env.FIREBASE_projectId,
  storageBucket: process.env.FIREBASE_storageBucket,
  messagingSenderId: process.env.FIREBASE_messagingSenderId,
  appId: process.env.FIREBASE_appId,
};

export class Firebase {
  app: FirebaseApp;
  auth: Auth;
  database: Database;

  constructor() {
    this.app = initializeApp(firebaseConfig);

    this.auth = getAuth();
    this.database = getDatabase(this.app);
  }

  login = (email: string, password: string) =>
    signInWithEmailAndPassword(this.auth, email, password);

  createWithEmail = (email: string, password: string) =>
    createUserWithEmailAndPassword(this.auth, email, password);

  logout = () => {
    signOut(this.auth);
  };
}

export const firebase = new Firebase();
