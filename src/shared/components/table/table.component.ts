import {
  Component,
  computed,
  effect,
  input,
  output,
  viewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TableColumn } from './table.interface';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';

export interface TableConfig {
  selectable: boolean;
  multiSelect: boolean;
  sortable: boolean;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  imports: [MatTableModule, MatSortModule, MatCheckboxModule],
})
export class TableComponent<T> {
  public rows = input<T[]>([]);
  public columns = input<TableColumn[]>([]);

  public config = input<TableConfig>({
    selectable: false,
    multiSelect: true,
    sortable: false,
  });

  protected readonly dataSource = computed(
    () => new MatTableDataSource<T>(this.rows())
  );

  private readonly sort = viewChild.required(MatSort);

  public sortChange = output<Sort>();
  public selectionChanged = output<T[]>();

  constructor() {
    effect(() => {
      this.dataSource().sort = this.sort();
    });
  }

  get isAllSelected() {
    return this.selection().selected.length === this.rows().length;
  }

  public isMultiSelect = computed(
    () => this.config().selectable && this.config().multiSelect
  );

  public toggleAllRows() {
    if (this.isAllSelected) {
      this.selection().clear();
      return;
    }

    this.selection().select(...this.rows());
    this.selectionChanged.emit(this.selection().selected);
  }

  public toggleRow(row: T) {
    this.selection().toggle(row);
    this.selectionChanged.emit(this.selection().selected);
  }

  public readonly selection = computed(() => {
    return new SelectionModel<T>(this.isMultiSelect(), []);
  });

  protected readonly displayedColumns = computed(() => {
    const columnKeys = this.isMultiSelect() ? ['select'] : [];

    this.columns().forEach((column) => {
      columnKeys.push(column.key);
    });

    return columnKeys;
  });
}
