import {
  Component,
  Input,
  forwardRef,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  value: string = "";
  currentlyActive: boolean = false;

  @ViewChild("inputEl") inputEl: ElementRef;

  @Input() label: string = null;
  @Input() placeholder: string = "";
  @Input() type: string = "text";
  @Input() invalidMessage: string = "Please provide a valid value";
  @Input() invalid: boolean = false;
  @Input() darkLabel: boolean = false;
  @Input() disabled: boolean = false;

  onClear() {
    this.value = "";
    this.onChange(this.value);
    this.inputEl.nativeElement.focus();
    setTimeout(() => {
      this.currentlyActive = true;
    }, 105);
  }

  changeValue(event: any) {
    this.value = event.target.value;
    this.onChange(this.value);
  }

  onFocus() {
    this.currentlyActive = true;
  }

  onBlur() {
    setTimeout(() => {
      this.currentlyActive = false;
    }, 100);
  }

  toggleActive() {
    this.currentlyActive = !this.currentlyActive;
  }

  writeValue(obj: any): void {
    if (obj !== undefined) {
      this.value = obj;
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
