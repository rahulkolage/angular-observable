import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // activatedEmmitter = new EventEmitter<boolean>();

  activatedEmmitter = new Subject<boolean>();


}
