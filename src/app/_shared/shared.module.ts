import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InputComponent } from "./components/form/input/input.component";
import { SelectComponent } from "./components/form/select/select.component";
import { TextareaComponent } from "./components/form/textarea/textarea.component";
import { CheckboxComponent } from "./components/form/checkbox/checkbox.component";
import { NotificationComponent } from "./components/notification/notification.component";
import { ModalComponent } from "./components/modal/modal.component";
import { ButtonComponent } from "./components/form/button/button.component";
import { PaginationComponent } from "./components/pagination/pagination.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { BreadcrumbComponent } from "./components/breadcrumb/breadcrumb.component";
import { LogoComponent } from "./components/logo/logo.component";
import { IconComponent } from "./components/icon/icon.component";
import { SearchComponent } from "./components/search/search.component";
import { HeadingBoxComponent } from "./components/heading-box/heading-box.component";
import { CheckboxItemComponent } from "./components/form/checkbox/checkbox-item/checkbox-item.component";
import { RouterModule } from "@angular/router";
import { MenuIconComponent } from "./components/sidebar/menu-icon/menu-icon.component";
import { PaginationButtonComponent } from "./components/pagination/pagination-button/pagination-button.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ToolboxComponent } from "./components/toolbox/toolbox.component";
import { BoxComponent } from "./components/toolbox/box/box.component";

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
];

@NgModule({
  declarations: [...items],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [...items, RouterModule, ReactiveFormsModule],
})
export class SharedModule {}
