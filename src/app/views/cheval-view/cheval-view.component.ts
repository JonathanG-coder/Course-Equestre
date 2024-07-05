import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cheval } from '../../models/cheval';
import { ChevalServiceService } from '../../services/cheval-service.service';
import { RaceService } from '../../service/race_service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cheval-view',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cheval-view.component.html',
  styleUrls: ['./cheval-view.component.scss'],
})
export class ChevalViewComponent implements OnInit {

  public cheval: Cheval = new Cheval('');
  public listChevaux: Cheval[] = [];
  private readonly MAX_CHEVAUX: number = 10;

  constructor(
    private chevalService: ChevalServiceService,
    private raceService: RaceService,
    private router: Router
  ) {}

  /**
   * Hook de cycle de vie appelé après l'initialisation des propriétés liées aux données.
   * Initialise la liste des chevaux en récupérant les chevaux depuis le service.
   */
  ngOnInit(): void {
    this.listChevaux = this.chevalService.getChevaux();
  }

  /**
   * Ajoute un cheval à la liste.
   * Vérifie si la liste des chevaux a atteint la limite maximale.
   * Met à jour la liste des chevaux pour l'affichage et réinitialise le formulaire.
   */
  addCheval(): void {
    if (this.listChevaux.length >= this.MAX_CHEVAUX) {
      console.error(
        "Erreur: Impossible d'ajouter plus de chevaux. La limite maximale de",
        this.MAX_CHEVAUX,
        'a été atteinte.'
      );
      return;
    }
    this.chevalService.addCheval(this.cheval);
    this.updateRaceService();
    this.listChevaux = this.chevalService.getChevaux();
    this.cheval = new Cheval('');
  }

  /**
   * Supprime un cheval de la liste par son ID.
   * Met à jour la liste des chevaux pour l'affichage.
   * 
   * @param id - L'ID du cheval à supprimer.
   */
  removeChevalById(id: number): void {
    this.chevalService.removeChevalById(id);
    this.updateRaceService();
    this.listChevaux = this.chevalService.getChevaux();
  }

  /**
   * Vide la liste des chevaux.
   * Met à jour la liste des chevaux pour l'affichage.
   */
  clearChevaux(): void {
    this.chevalService.clearChevaux();
    this.updateRaceService();
    this.listChevaux = this.chevalService.getChevaux();
  }

  /**
   * Récupère la liste des chevaux.
   * 
   * @returns La liste des chevaux.
   */
  getChevaux(): Cheval[] {
    return this.chevalService.getChevaux();
  }

  /**
   * Récupère un cheval par son ID.
   * 
   * @param id - L'ID du cheval à récupérer.
   * @returns Le cheval correspondant à l'ID, ou undefined s'il n'est pas trouvé.
   */
  getChevalById(id: number): Cheval | undefined {
    return this.chevalService.getChevalById(id);
  }

  /**
   * Affiche les informations du cheval dans la console.
   */
  showMe() {
    console.log(
      `${this.cheval?.name} - ${this.cheval.robe ?? ''} - ${
        this.cheval.vitesse_max ?? ''
      }`
    );
  }

  /**
   * Soumet le formulaire et ajoute un cheval.
   * Vérifie si le nom du cheval est valide (non vide) avant de l'ajouter.
   */
  onSubmit() {
    if (this.cheval.name && this.cheval.name.trim()) {
      this.addCheval();
    }
  }

  /**
   * Redirige vers la page d'accueil.
   */
  goHome() {
    this.router.navigate(['/']);
  }

  /**
   * Met à jour le RaceService avec la liste des chevaux.
   * Méthode privée pour synchroniser la liste des chevaux avec le service de course.
   */
  private updateRaceService() {
    this.raceService.initHorses(this.chevalService.getCopyOfChevaux());
  }
}
