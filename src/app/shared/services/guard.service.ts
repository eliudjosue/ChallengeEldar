import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuardService {
  private guardStatus = new BehaviorSubject<boolean>(false);
  private guardStatusRole = new BehaviorSubject<boolean>(false);

  guardStatus$ = this.guardStatus.asObservable();
  guardStatusRole$ = this.guardStatusRole.asObservable();

  updateGuardStatus(status: boolean) {
    this.guardStatus.next(status);
  }
  updateGuardStatusRole(status: boolean) {
    this.guardStatusRole.next(status);
  }

}
