import { Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

export interface ToggleOption<T> {
  value: T;
  label: string;
}

@Component({
  selector: 'app-toggle-select',
  templateUrl: './toggle-select.component.html',
  imports: [CommonModule, MatButtonToggleModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleSelectComponent),
      multi: true,
    },
  ],
})
export class ToggleSelectComponent<T> implements ControlValueAccessor {
  public readonly options = input.required<ToggleOption<T>[]>();

  public value: T | null = null;
  public disabled: boolean = false;

  private onChange = (value: T) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelectionChange(value: any): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
