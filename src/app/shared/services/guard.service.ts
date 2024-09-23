import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuardService {
  private guardStatus = new BehaviorSubject<boolean>(false);

  guardStatus$ = this.guardStatus.asObservable();

  updateGuardStatus(status: boolean) {
    this.guardStatus.next(status);
  }

}
