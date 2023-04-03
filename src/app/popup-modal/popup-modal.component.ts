import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PopupModalService } from '../services/popup-modal.service';


@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.css'],
})
export class PopupModalComponent {
  popup$: Observable<string> = new Observable();

  constructor(
    private popupModalService: PopupModalService ) {}

  ngOnInit() {
    this.popup$ = this.popupModalService.listine();
  }

 
}
