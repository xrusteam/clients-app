import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddClientDialogComponent } from './add-client-dialog.component';

@Injectable({ providedIn: 'root' })
export class AddClentDialogService {
  private readonly matDialog = inject(MatDialog);

  public open() {
    const dialogRef = this.matDialog.open<AddClientDialogComponent>(
      AddClientDialogComponent
    );

    return dialogRef.afterClosed();
  }
}
