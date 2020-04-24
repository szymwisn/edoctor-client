import { Component, Input, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { CheckboxItem } from "./checkbox-item/checkbox-item.model";

@Component({
  selector: "app-checkbox",
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  disabled: boolean = false;
  selectedItems: CheckboxItem[] = [];

  @Input() label: string = null;
  @Input() items: CheckboxItem[] = [];
  @Input() invalidMessage: string = "Please provide a valid value";
  @Input() invalid: boolean = false;

  selectItem(item: CheckboxItem) {
    if (item.checked) {
      this.selectedItems = [...this.selectedItems, item];
    } else {
      this.selectedItems = this.selectedItems.filter((i) => i !== item);
    }

    this.onChange(this.selectedItems);
  }

  writeValue(obj: any): void {
    if (obj !== undefined) {
      this.selectedItems = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChange: any = () => {};

  onTouched: any = () => {};
}
