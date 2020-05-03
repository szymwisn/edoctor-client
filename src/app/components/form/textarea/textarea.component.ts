import {
  Component,
  Input,
  forwardRef,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-textarea",
  templateUrl: "./textarea.component.html",
  styleUrls: ["./textarea.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
})
export class TextareaComponent implements ControlValueAccessor {
  disabled: boolean = false;
  value: string = "";
  currentlyActive: boolean = false;

  @ViewChild("textareaEl") textareaEl: ElementRef;

  @Input() label: string = null;
  @Input() placeholder: string = "";
  @Input() invalidMessage: string = "Please provide a valid value";
  @Input() invalid: boolean = false;
  @Input() rows: number = 5;

  onClear() {
    this.value = "";
    this.onChange(this.value);
    this.textareaEl.nativeElement.focus();
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
