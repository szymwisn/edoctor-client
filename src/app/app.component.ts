import {
  Component,
  ViewContainerRef,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { UserFacade } from "./_shared/security/user.facade";
import { Observable, combineLatest } from "rxjs";
import { DecodedToken } from "./_shared/security/models/token.model";
import { User } from "./_shared/security/models/user.model";
import { map } from "rxjs/operators";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NotificationService } from "./_shared/services/notification.service";
import { ModalService } from "./_shared/services/modal.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  @ViewChild("modalContent") modalContent: TemplateRef<any>;

  testForm: FormGroup;

  allData$: Observable<{
    token: DecodedToken;
    profile: User;
  }>;

  formSubmitted = false;

  doctors = ["dr Rick Owens", "dr Drake Ramoray", "dr Mario Pastini"];

  onSubmit() {
    this.formSubmitted = true;

    if (this.testForm.valid) {
      console.log(this.testForm.value);
      this.notificationService.createNotification("Form submitted!", 3000);
      this.testForm.reset();
      this.formSubmitted = false;
    } else {
      console.log("form invalid");
    }
  }

  constructor(
    private fb: FormBuilder,
    private userFacade: UserFacade,
    private notificationService: NotificationService,
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef
  ) {
    this.notificationService.setViewContainerRef(this.viewContainerRef);
    this.modalService.setViewContainerRef(this.viewContainerRef);

    this.allData$ = combineLatest(
      this.userFacade.token$,
      this.userFacade.profile$
    ).pipe(map(([token, profile]) => ({ token, profile })));

    this.testForm = fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      description: ["", [Validators.required]],
      doctors: ["", [Validators.required]],
      checkbox: [],
    });
  }

  showNotification() {
    this.notificationService.createNotification("Something happened!");
  }

  tempSignIn() {
    this.userFacade.signin(null);
  }

  tempSignOut() {
    this.userFacade.signout();
  }

  changePage(page: number) {
    console.log(page);
  }

  showModal() {
    this.modalService.openModal(this.modalContent);
  }
}
