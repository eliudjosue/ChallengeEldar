import { Component } from '@angular/core';
import { EmailsService } from 'src/app/shared/services/emails.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
})
export class AgregarComponent {
  emailAddress: string = ''; 
  emails: any[] = []; 
  displayEditDialog: boolean = false; 
  selectedEmail: any = {};

  constructor(private emailsService: EmailsService) {}

  ngOnInit(): void {
    this.emailsService.getEmails().subscribe((emails) => {
      this.emails = emails;
    });
  }

  addEmail(): void {
    if (this.emailAddress) {
      const email = { address: this.emailAddress };

      this.emailsService
        .addEmail(email)
        .then(() => {
          console.log('Email agregado exitosamente');
          this.emailAddress = '';
        })
        .catch((error) => console.error('Error al agregar email:', error));
    }
  }

  deleteEmail(emailId: string): void {
    this.emailsService
      .deleteEmail(emailId)
      .then(() => console.log('Email eliminado exitosamente'))
      .catch((error) => console.error('Error al eliminar email:', error));
  }

  showEditDialog(email: any): void {
    this.selectedEmail = { ...email };
    this.displayEditDialog = true;
  }

  updateEmail(): void {
    if (this.selectedEmail && this.selectedEmail.id && this.selectedEmail.address) {
      this.emailsService
        .updateEmail(this.selectedEmail.id, this.selectedEmail.address)
        .then(() => {
          console.log('Email actualizado exitosamente');
          this.displayEditDialog = false; 
          this.selectedEmail = {}; 
        })
        .catch((error) => console.error('Error al actualizar email:', error));
    }
  }
}
