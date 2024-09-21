import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afauth: AngularFireAuth,
    public database: AngularFirestore
  ) {
    this.getUid();
  }

  async register(email: string, password: string) {
    try {
      return await this.afauth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('error en login', error);
      return null;
    }
  }

  async login(email: string, password: string) {
    try {
      return await this.afauth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('error en login', error);
      return null;
    }
  }

  async loginWithGoogle(email: string, password: string) {
    try {
      return await this.afauth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );
    } catch (error) {
      console.log('error en login con Google', error);
      return null;
    }
  }

  getUserLogged() {
    return this.afauth.authState;
  }

  logOut() {
    this.afauth.signOut();
  }

  async getUid() {
    const user = await this.afauth.currentUser;
    if (user === null) {
      return null;
    } else {
      return user.uid;
    }
  }

  stateAuth() {
    return this.afauth.authState
  }
}
