import { Injectable, signal } from '@angular/core';
import { TableColumn } from '../../../../shared/components/table/table.interface';
import { Client } from '../components/clients/clients.component';

@Injectable()
export class ClientsTableService {
  public readonly columns: TableColumn[] = [
    {
      key: 'userId',
      label: 'Id',
    },
    {
      key: 'template',
      label: 'Template',
    },
    {
      key: 'firstName',
      label: 'Имя',
    },
    {
      key: 'lastName',
      label: 'Фамилия',
    },
    {
      key: 'email',
      label: 'e-mail',
    },
    {
      key: 'gender',
      label: 'Пол',
    },
  ];

  public readonly clientRows = signal<Client[]>([]);

  public setClients(clients: Client[]) {
    this.clientRows.set(clients);
  }

  public addClient(client: Client) {
    this.clientRows.update((prev) => [...prev, client]);
  }
}
