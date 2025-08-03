import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SendPushMessageDialogComponent } from './send-push-message-dialog.component';
import { Client } from '../clients/clients.component';

export interface PushMessageData {
  dateStart: string;
  userIds: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class SendPushMessageDialogService {
  private readonly matDialog = inject(MatDialog);

  public open(data: { clients: Client[] }) {
    const dialogRef = this.matDialog.open<SendPushMessageDialogComponent>(
      SendPushMessageDialogComponent,
      {
        data,
      }
    );

    return dialogRef.afterClosed();
  }
}
