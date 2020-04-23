import {
  Component,
  Input,
  forwardRef,
  Output,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Subject } from "rxjs";

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
  disabled: boolean = false;
  value: string = "";
  currentlyActive: boolean = false;

  @ViewChild("inputEl") inputEl: ElementRef;

  @Input() label: string = null;
  @Input() placeholder: string = "";
  @Input() type: string = "text";
  @Input() invalidMessage: string = null;

  onClear() {
    this.inputEl.nativeElement.value = "";
    this.inputEl.nativeElement.focus();
    setTimeout(() => {
      this.currentlyActive = true;
    }, 120);
  }

  onFocus() {
    this.currentlyActive = true;
  }

  onBlur() {
    setTimeout(() => {
      this.currentlyActive = false;
    }, 110);
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
