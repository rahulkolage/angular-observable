import { Component, OnDestroy, OnInit } from "@angular/core";
import { interval, Subscription, Observable } from "rxjs";
import { map, filter } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  private custSub: Subscription;

  constructor() {}

  ngOnInit() {
    // this.sub = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });

    // Observable.create method is deprecated
    const customIntervalObs = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);

        // observable complete
        if (count === 2) {
          observer.complete();
        }

        // observable error
        if (count > 3) {
          observer.error(new Error("Count is greater 3"));
        }

        count++;
        // observer.error();
        // observer.complete();
      }, 1000);
    });

    // operators
    // subscribe to custom observable
    this.custSub = customIntervalObs
      .pipe(
        filter((data) => {
          return data > 0;
        }),
        map((data: number) => {
          return "Round: " + (data + 1);
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          console.log("Completion!");
        }
      );
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    if (this.custSub) {
      this.custSub.unsubscribe();
    }
  }
}
