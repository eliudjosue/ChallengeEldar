import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { EmailsService } from 'src/app/shared/services/emails.service';


export const AuthGuard = () => {
  const auth = getAuth();
  const router = inject(Router);
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(true);
      } else {
        router.navigate(['/login']);
        resolve(false);
      }
    });
  });
};

export const RoleGuard = () => {
  const router = inject(Router);
  const emailsService = inject(EmailsService);
  const auth = getAuth();
  const emailToCheck = auth.currentUser?.email;
  return new Promise((resolve) => {
    let permisos: boolean;
    emailsService.getEmails().subscribe((rol) => {
      permisos = rol.some(item => item.address === emailToCheck);
      if (permisos) {
        resolve(true);
      } else {
        router.navigate(['/productos']);
        resolve(true);
      }
    });
  });
};
