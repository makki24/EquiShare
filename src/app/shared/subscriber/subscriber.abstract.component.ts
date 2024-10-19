import {Component, OnDestroy} from "@angular/core";
import {Subject} from "rxjs";

@Component({
  template: ``
})
export abstract class SubscriberComponent implements OnDestroy{
  protected destroy$: Subject<void> = new Subject<void>();

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
