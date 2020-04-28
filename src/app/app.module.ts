import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./_shared/shared.module";
import { PagesModule } from "./pages/pages.module";
import { AppComponent } from "./app.component";
import { ModalComponent } from "./_shared/components/modal/modal.component";
import { NotificationComponent } from "./_shared/components/notification/notification.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    PagesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [NotificationComponent, ModalComponent],
})
export class AppModule {}
