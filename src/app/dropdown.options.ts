import { Divsn, Opts } from "./data.models";

export const ALL_DIVISIONS : Divsn = {
    eastern: [{
      value: 'atlantic',
      name: 'Atlantic'
    }, {
      value: 'central',
      name: 'Central'
    }, {
      value: 'southeast',
      name: 'Southeast'
    }],
    western: [{
      value: 'northwest',
      name: 'Northwest'
    }, {
      value: 'pacific',
      name: 'Pacific'
    }, {
      value: 'southwest',
      name: 'Southwest'
    }]
  };
 
  export const ALL_CONFERENCES: Opts[] = [{
    value: 'west',
    name: 'Western'
  }, {
    value: 'east',
    name: 'Eastern'
  }];