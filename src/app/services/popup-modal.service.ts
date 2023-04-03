import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Team } from '../data.models';

@Injectable({
    providedIn: 'root'
})
export class PopupModalService {

    private popup: BehaviorSubject<string> = new BehaviorSubject('close');

    listine(): Observable<string> {
        return this.popup.asObservable();
    }

    openModal(team: Team) {
        this.popup.next('open');
    }

    closeModal() {
        this.popup.next('close');
    }
}
