import { Component } from '@angular/core';
import { Divsn, Opts, Team } from '../data.models';
import { Observable, tap } from 'rxjs';
import { NbaService } from '../nba.service';
import { ALL_CONFERENCES, ALL_DIVISIONS } from '../dropdown.options';

@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styleUrls: ['./game-stats.component.css']
})
export class GameStatsComponent {

  allTeams: Team[] = [];
  allDivsions: Divsn = ALL_DIVISIONS;
  divisions: Opts[] = [];
  allConferences: Opts[] = ALL_CONFERENCES;
  optedDivision = '';
  optedConference = '';
  teamsOptions: Team[] = [];


  constructor(protected nbaService: NbaService) {
    this.divisions = [...this.allDivsions.eastern, ...this.allDivsions.western];
    nbaService.getAllTeams().subscribe(
      (data) => {
        this.allTeams = data;
        this.teamsOptions = data;
      }
    );
  }

  trackTeam(teamId: string): void {
    let team = this.allTeams.find(team => team.id == Number(teamId));
    if (team)
      this.nbaService.addTrackedTeam(team);
  }

  triggerFilter(filterData: any) {
    if (filterData.type) {
      if (filterData.type && filterData.type === 'Conference') {
        this.optedConference = filterData.value;
        this.divisions = this.optedConference.toLowerCase() === 'east' ? [...this.allDivsions.eastern] :
          this.optedConference.toLowerCase() === 'west' ? [...this.allDivsions.western] :
            [...this.allDivsions.eastern, ...this.allDivsions.western];

        if (this.optedConference && this.optedConference?.toLowerCase() !== 'default') {
          this.teamsOptions = this.allTeams.filter(data => {
            return data.conference.toLowerCase() === this.optedConference.toLowerCase()
          });
        }
      }

      if (filterData.type && filterData.type === 'Division') {
        this.optedDivision = filterData.value;
        if (this.optedDivision && this.optedDivision?.toLowerCase() !== 'default') {
          this.teamsOptions = this.allTeams.filter(data => {
            return data.division.toLowerCase() === this.optedDivision.toLowerCase()
          });
        }

      }
      this.filterTeams();
    }
  }

  filterTeams() {
    if ((this.optedConference && this.optedConference?.toLowerCase() !== 'default') &&
      (this.optedDivision && this.optedDivision.toLowerCase() === 'default')) {
      this.teamsOptions = this.allTeams.filter(data => {
        return data.conference.toLowerCase() === this.optedConference.toLowerCase()
      });
    }

    if ((this.optedConference && this.optedConference?.toLowerCase() === 'default') &&
      (this.optedDivision && this.optedDivision.toLowerCase() === 'default')) {
      this.teamsOptions = [...this.allTeams];
    }

  }
}
