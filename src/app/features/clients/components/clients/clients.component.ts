import { Component, inject } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import {
  TableComponent,
  TableConfig,
} from '../../../../../shared/components/table/table.component';
import { ClientsTableService } from '../../services/clients-table.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AddClentDialogService } from '../add-client-dialog/add-client-dialog.service';
import { debounce, debounceTime, first, firstValueFrom, switchMap } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  PushMessageData,
  SendPushMessageDialogService,
} from '../send-push-message-dialog/send-push-message.service';

export interface Client {
  userId?: number;
  template: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
}

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  imports: [
    TableComponent,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  providers: [ClientsTableService],
})
export class ClientsComponent {
  private readonly clientsService = inject(ClientsService);
  private readonly addClientDialogService = inject(AddClentDialogService);
  private readonly sendPushMessageDialogService = inject(
    SendPushMessageDialogService
  );
  public readonly clientsTableService = inject(ClientsTableService);

  public readonly nameControl = new FormControl(null);

  public readonly config = {
    selectable: true,
    multiSelect: true,
    sortable: true,
  };

  private selectedClients: Client[] = [];

  constructor() {
    this.clientsService
      .getClients()
      .pipe(first())
      .subscribe((clients) => this.setClients(clients));

    this.nameControl.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((value) => this.clientsService.getClients({ userId: value })),
        takeUntilDestroyed()
      )
      .subscribe((clients) => this.setClients(clients));
  }

  public selectionChanged(clients: Client[]) {
    this.selectedClients = clients;
  }

  public addClient() {
    this.addClientDialogService
      .open()
      .subscribe(async (client: Client | null) => {
        if (client) {
          const clientToAdd = this.buildToAddClient(client);
          const newClient = await firstValueFrom(
            this.clientsService.addClient(clientToAdd)
          );
          this.clientsTableService.addClient(newClient);
        }
      });
  }

  public pushMessage() {
    this.sendPushMessageDialogService
      .open({ clients: this.selectedClients })
      .subscribe(async (data) => {
        if (data) {
          const pushMessageData = this.buildDataToPushMessage(data);
          const result = await firstValueFrom(
            this.clientsService.pushMessage(pushMessageData)
          );
          console.log(result);
        }
      });
  }

  private buildToAddClient(client: Client) {
    return {
      template: client.template,
      first_name: client.firstName,
      last_name: client.lastName,
      email: client.email,
      gender: client.gender,
    };
  }

  private buildDataToPushMessage(data: PushMessageData) {
    return {
      date_start: data.dateStart,
      user_id: data.userIds,
      push_message: data.message,
    };
  }

  private setClients(clients: Client[]) {
    this.clientsTableService.setClients(clients);
  }
}
