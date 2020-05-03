import {
  ViewContainerRef,
  ComponentFactoryResolver,
  Injectable,
} from "@angular/core";
import { NotificationComponent } from "../../components/notification/notification.component";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  viewContainerRef: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  setViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }

  createNotification(message: string, timeout?: number) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      NotificationComponent
    );

    const componentRef = this.viewContainerRef.createComponent(factory);
    componentRef.instance.message = message;

    if (timeout) {
      setTimeout(() => {
        componentRef.instance.close();
      }, timeout);
    }

    componentRef.changeDetectorRef.detectChanges();
  }
}
