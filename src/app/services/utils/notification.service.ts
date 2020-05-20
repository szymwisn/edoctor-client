import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  notification$ = new Subject<string>();

  getNotification(): Observable<any> {
    return this.notification$.asObservable();
  }

  addNotification(message: string, timeout?: number) {
    this.notification$.next(message);

    if (timeout) {
      setTimeout(() => {
        this.notification$.next(null);
      }, timeout);
    }
  }

  close() {
    this.notification$.next(null);
  }
}
