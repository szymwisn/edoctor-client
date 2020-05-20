import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  spinning$ = new Subject<boolean>();

  getSpinning() {
    return this.spinning$.asObservable();
  }

  start() {
    this.spinning$.next(true);
  }

  stop() {
    this.spinning$.next(false);
  }
}
