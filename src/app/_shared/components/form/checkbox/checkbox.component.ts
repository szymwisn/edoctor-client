import { Component, Input, forwardRef, OnInit } from "@angular/core";
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
export class CheckboxComponent implements OnInit, ControlValueAccessor {
  //TODO: selecting default values from form builder on start

  disabled: boolean = false;
  selectedItems: CheckboxItem[] = [];
  _items: CheckboxItem[] = [];

  @Input() label: string = null;
  @Input() items: string[] = [];

  ngOnInit() {
    this._items = this.items.map((item) => ({ name: item, checked: false }));
  }

  selectItem(item: CheckboxItem) {
    if (item.checked) {
      this.selectedItems = [...this.selectedItems, item];
    } else {
      this.selectedItems = this.selectedItems.filter((i) => i !== item);
    }

    this.onChange(this.selectedItems.map((item) => item.name));
  }

  writeValue(obj: string[]): void {
    if (obj !== undefined && Array.isArray(obj)) {
      this.selectedItems = obj.map((item) => ({ name: item, checked: true }));
      this._items.forEach((item) => {
        this.selectedItems.forEach((selectedItem) => {
          if (selectedItem.name === item.name) {
            item.checked = true;
          }
        });
      });

      // console.log("selected", this.selectedItems);
      // console.log("_items", this._items);
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
