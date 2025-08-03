import { Component, inject } from '@angular/core';
import { DialogWrapperComponent } from '../../../components/dialog/dialog-wrapper.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from '../clients/clients.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-send-push-message-dialog',
  templateUrl: './send-push-message-dialog.component.html',
  styleUrls: ['./send-push-message-dialog.component.scss'],
  imports: [DialogWrapperComponent, MatButtonModule, MatInputModule],
})
export class SendPushMessageDialogComponent {
  private readonly dialogRef = inject(MatDialogRef);
  private readonly data = inject(MAT_DIALOG_DATA);

  public close() {
    this.dialogRef.close(null);
  }

  public pushMessage(message: string) {
    const data = {
      dateStart: this.addTimezoneOffset(3),
      userIds: this.clientsStringify(),
      message,
    };
    this.dialogRef.close(data);
  }

  private addTimezoneOffset(hoursOffset: number) {
    const newDate = new Date();
    newDate.setHours(newDate.getHours() + hoursOffset);
    return newDate.toISOString();
  }

  public readonly clientsStringify = () => {
    return this.data.clients
      .map((client: Client) => `${client.userId}`)
      .join(', ');
  };
}
