import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DialogWrapperComponent } from '../../../components/dialog/dialog-wrapper.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ToggleSelectComponent } from '../../../../../shared/components/toggle-select/toggle-select.component';

@Component({
  selector: 'app-add-client-dialog',
  templateUrl: './add-client-dialog.component.html',
  styleUrls: ['./add-client-dialog.component.scss'],
  imports: [
    DialogWrapperComponent,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ToggleSelectComponent,
  ],
})
export class AddClientDialogComponent {
  private readonly dialogRef = inject(MatDialogRef);
  private readonly formBuilder = inject(FormBuilder);

  protected readonly formGroup = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    email: ['', [Validators.email]],
    template: ['Тестовый', Validators.required],
    gender: ['W'],
  });

  protected readonly genderOptions = [
    { value: 'M', label: 'Мужской' },
    { value: 'W', label: 'Женский' },
  ];

  public close() {
    this.dialogRef.close(null);
  }

  public save() {
    this.dialogRef.close(this.formGroup.value);
  }
}
