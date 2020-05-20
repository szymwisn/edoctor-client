import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InputComponent } from "./form/input/input.component";
import { SelectComponent } from "./form/select/select.component";
import { TextareaComponent } from "./form/textarea/textarea.component";
import { CheckboxComponent } from "./form/checkbox/checkbox.component";
import { NotificationComponent } from "./notification/notification.component";
import { ModalComponent } from "./modal/modal.component";
import { ButtonComponent } from "./form/button/button.component";
import { PaginationComponent } from "./pagination/pagination.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { LogoComponent } from "./logo/logo.component";
import { IconComponent } from "./icon/icon.component";
import { SearchComponent } from "./search/search.component";
import { HeadingBoxComponent } from "./heading-box/heading-box.component";
import { CheckboxItemComponent } from "./form/checkbox/checkbox-item/checkbox-item.component";
import { MenuIconComponent } from "./sidebar/menu-icon/menu-icon.component";
import { PaginationButtonComponent } from "./pagination/pagination-button/pagination-button.component";
import { ToolboxComponent } from "./toolbox/toolbox.component";
import { BoxComponent } from "./toolbox/box/box.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";

const items = [
  InputComponent,
  SelectComponent,
  TextareaComponent,
  CheckboxComponent,
  NotificationComponent,
  ModalComponent,
  ButtonComponent,
  PaginationComponent,
  SidebarComponent,
  BreadcrumbComponent,
  LogoComponent,
  IconComponent,
  SearchComponent,
  HeadingBoxComponent,
  CheckboxItemComponent,
  MenuIconComponent,
  PaginationButtonComponent,
  ToolboxComponent,
  BoxComponent,
  LoadingSpinnerComponent,
];

@NgModule({
  declarations: [...items],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [...items, ReactiveFormsModule, RouterModule],
})
export class ComponentsModule {}
