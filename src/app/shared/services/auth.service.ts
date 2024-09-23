import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { map, Observable } from 'rxjs';
import { EmailsService } from './emails.service';
import { getAuth } from '@firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private permisos: boolean = false;
  constructor(
    private afauth: AngularFireAuth,
    public database: AngularFirestore,
    public emailsService: EmailsService
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

  checkUserRole(): Observable<boolean> {
    const auth = getAuth();
    const emailToCheck = auth.currentUser?.email;
    console.log(auth.currentUser,"serviceeee")
    return this.emailsService.getEmails().pipe(
      map((roles) => {
        this.permisos = roles.some((item) => item.address === emailToCheck);
        return this.permisos;
      })
    );
  }

  // userHasPermission(): boolean {
  //   return this.permisos;
  // }
}
