import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  userActivated: boolean = false;

  activSub: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.activSub = this.userService.activatedEmmitter.subscribe((didActivate) => {
      this.userActivated = didActivate;
    });
  }

  ngOnDestroy(): void {
      if(this.activSub) {
        this.activSub.unsubscribe();
      }
  }
}
