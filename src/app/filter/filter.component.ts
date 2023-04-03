import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Opts, Team } from '../data.models';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Output() triggerFilter = new EventEmitter<{}>();
  @Input() filterType : string = 'default';
  @Input() filterOptions: Opts[] = [];

  valueChanges(event: any): void {
    const filterObj = {
        type: this.filterType,
        value: event.target.value
    }
    this.triggerFilter.emit(filterObj);
  }
  
}
