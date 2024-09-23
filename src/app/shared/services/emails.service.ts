import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailsService {
  constructor(private firestore: AngularFirestore) {}

  addEmail(email: { address: string }): Promise<void> {
    const id = this.firestore.createId();
    const emailData = { id, address: email.address };
    return this.firestore.collection('emails').doc(id).set(emailData);
  }

  getEmails(): Observable<any[]> {
    return this.firestore.collection('emails').valueChanges();
  }

  deleteEmail(id: string): Promise<void> {
    return this.firestore.collection('emails').doc(id).delete();
  }

  updateEmail(id: string, newAddress: string): Promise<void> {
    return this.firestore.collection('emails').doc(id).update({ address: newAddress });
  }

}
