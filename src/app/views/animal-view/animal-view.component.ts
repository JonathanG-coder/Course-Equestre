import { Component } from '@angular/core';
import { Cheval } from '../../models/cheval';
import { RaceService } from '../../service/race_service';
import { ChevalServiceService } from '../../services/cheval-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-animal-view',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './animal-view.component.html',
  styleUrls: ['./animal-view.component.scss'],
})
export class AnimalViewComponent {

  public podium: String[] = [];
  public race: Cheval[] = [];
  public haveRunned: boolean | undefined;
  private timerId: any;
  public today: Date = new Date();

  constructor(
    private chevalService: ChevalServiceService,
    private raceService: RaceService
  ) {
    if (this.chevalService.getChevaux().length <= 0) {
      this.chevalService.initChevaux();
    }
  }

  /**
   * Configure la course en initialisant les chevaux et en définissant la distance.
   * Méthode privée.
   */
  private setRace(): void {
    this.raceService.initHorses(this.chevalService.getCopyOfChevaux());
    this.raceService.setRaceDistance(900);
  }

  /**
   * Fait avancer la course en exécutant une étape.
   * Met à jour la liste des chevaux et le podium une fois la course terminée.
   * Méthode privée.
   */
  private run(): void {
    this.raceService.runRound();

    if (
      this.raceService.finishedRunning.length === this.raceService.horses.length
    ) {
      this.race = this.raceService.finishedRunning;
      this.podium = this.raceService.getPodium();
      this.haveRunned = true;
      clearInterval(this.timerId);
    } else {
      this.race = this.raceService.horses;
    }
  }

  /**
   * Démarre la course en configurant les chevaux et en lançant un timer.
   * Méthode publique.
   */
  public runCourse(): void {
    this.setRace();
    this.timerId = setInterval(() => this.run(), 250); // Démarre le timer pour exécuter la course à intervalles réguliers
    this.haveRunned = undefined;
  }
}
