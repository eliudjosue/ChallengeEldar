import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { EmailsService } from 'src/app/shared/services/emails.service';
import { GuardService } from 'src/app/shared/services/guard.service';


export const AuthGuard = () => {
  const auth = getAuth();
  const router = inject(Router);
  const guardService = inject(GuardService);
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
      guardService.updateGuardStatus(true);
        resolve(true);
      } else {
      guardService.updateGuardStatus(false);
        router.navigate(['/login']);
        resolve(false);
      }
    });
  });
};

export const RoleGuard = () => {
  const guardService = inject(GuardService);
  const router = inject(Router);
  const emailsService = inject(EmailsService);
  const auth = getAuth();
  const emailToCheck = auth.currentUser?.email;
  return new Promise((resolve) => {
    let permisos: boolean;
    emailsService.getEmails().subscribe((rol) => {
      permisos = rol.some(item => item.address === emailToCheck);
      if (permisos) {
      guardService.updateGuardStatusRole(true);
        resolve(true);
      } else {
        router.navigate(['/productos']);
        resolve(true);
      }
    });
  });
};
