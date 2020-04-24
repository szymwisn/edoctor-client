import {
  Component,
  Input,
  forwardRef,
  ElementRef,
  HostListener,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-select",
  templateUrl: "./select.component.html",
  styleUrls: ["./select.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  disabled: boolean = false;
  value: string = "";
  dropdownOpen: boolean = false;
  icon: string = "drop-down";

  @Input() label: string = null;
  @Input() placeholder: string = "Select your option";
  @Input() options: string[] = [];
  @Input() invalidMessage: string = "Please provide a valid value";
  @Input() invalid: boolean = false;

  constructor(private elRef: ElementRef) {}

  @HostListener("document:click", ["$event"])
  clickout(event) {
    if (this.dropdownOpen && !this.elRef.nativeElement.contains(event.target)) {
      this.toggleDropdown();
    }
  }

  selectOption(option: string) {
    this.value = option;
    this.onChange(this.value);
    this.toggleDropdown();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;

    if (this.dropdownOpen) {
      this.icon = "drop-up";
    } else {
      this.icon = "drop-down";
    }
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
