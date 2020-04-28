import {
  ViewContainerRef,
  ComponentFactoryResolver,
  Injectable,
  TemplateRef,
  Type,
  Injector,
  Inject,
  ApplicationRef,
} from "@angular/core";
import { ModalComponent } from "../components/modal/modal.component";
import { DOCUMENT } from "@angular/common";

export type Content<T> = string | TemplateRef<T> | Type<T>;

@Injectable({
  providedIn: "root",
})
export class ModalService {
  viewContainerRef: ViewContainerRef;

  constructor(
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(DOCUMENT) private document: Document,
    private applicationRef: ApplicationRef
  ) {}

  setViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }

  openModal<T>(content: Content<T>) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      ModalComponent
    );
    const ngContent = this.resolveNgContent(content);
    const componentRef = factory.create(this.injector, ngContent);

    componentRef.hostView.detectChanges();

    const { nativeElement } = componentRef.location;
    this.document.body.appendChild(nativeElement);
  }

  resolveNgContent<T>(content: Content<T>) {
    if (typeof content === "string") {
      const element = this.document.createTextNode(content);

      return [[element]];
    }

    if (content instanceof TemplateRef) {
      const viewRef = content.createEmbeddedView(null);
      this.applicationRef.attachView(viewRef);

      return [viewRef.rootNodes];
    }

    if (content instanceof Type) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(
        content
      );
      const componentRef = factory.create(this.injector);
      this.applicationRef.attachView(componentRef.hostView);

      return [[componentRef.location.nativeElement]];
    }
  }
}
