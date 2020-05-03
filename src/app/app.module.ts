import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { PagesModule } from "./pages/pages.module";
import { AppComponent } from "./app.component";
import { ModalComponent } from "./components/modal/modal.component";
import { NotificationComponent } from "./components/notification/notification.component";
import { ComponentsModule } from "./components/components.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ComponentsModule,
    PagesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [NotificationComponent, ModalComponent],
})
export class AppModule {}
