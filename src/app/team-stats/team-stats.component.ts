import {Component, Input, OnInit} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {NbaService} from '../nba.service';
import {Game, Stats, Team} from '../data.models';
import { PopupModalService } from '../services/popup-modal.service';

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.css']
})
export class TeamStatsComponent implements OnInit {

  @Input()
  team!: Team;


  selectedTeam: Team;
  selectedDays: number = 6;
  games$!: Observable<Game[]>;
  stats!: Stats;
  pastDays = [6, 12, 20];
  constructor(protected nbaService: NbaService, protected popupModalService: PopupModalService) { 
    this.selectedTeam = this.team;
  }

  ngOnInit(): void {
    this.getLastResults();
  }

  getLastResults() {
    this.games$ = this.nbaService.getLastResults(this.team, this.selectedDays).pipe(
      tap(games =>  this.stats = this.nbaService.getStatsFromGames(games, this.team))
    )
  }

  openModal(team: Team) {
    this.nbaService.setTeam(team);
    this.popupModalService.openModal(team);
  }

  close(remove: string): void {
    if(remove === 'yes') {
      this.nbaService.removeTrackedTeam();
    }
    this.popupModalService.closeModal();

  }

}
