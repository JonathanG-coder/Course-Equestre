import { Injectable } from '@angular/core';
import { Cheval } from '../models/cheval';

@Injectable({
  providedIn: 'root'
})
export class ChevalServiceService {

  private chevaux: Cheval[] = [];

  constructor() { }

  /**
   * Ajoute un cheval à la liste.
   * 
   * @param cheval - Le cheval à ajouter.
   */
  addCheval(cheval: Cheval): void {
    this.chevaux.push(cheval);
  }

  /**
   * Supprime un cheval par son identifiant.
   * 
   * @param id - L'identifiant du cheval à supprimer.
   */
  removeChevalById(id: number): void {
    if (id >= 0 && id < this.chevaux.length) {
      this.chevaux.splice(id, 1);
    } else {
      console.error('Erreur: Index du cheval invalide.');
    }
    console.log('removeChevalById appelé', id, this.chevaux);
  }

  /**
   * Vide la liste des chevaux.
   */
  clearChevaux(): void {
    this.chevaux = [];
    console.log('clearChevaux appelé', this.chevaux);
  }

  /**
   * Retourne la liste des chevaux.
   * 
   * @returns La liste des chevaux.
   */
  getChevaux(): Cheval[] {
    return this.chevaux;
  }

  /**
   * Retourne un cheval par son identifiant.
   * 
   * @param id - L'identifiant du cheval.
   * @returns Le cheval correspondant à l'identifiant, ou undefined si l'identifiant est invalide.
   */
  getChevalById(id: number): Cheval | undefined {
    if (id >= 0 && id < this.chevaux.length) {
      return this.chevaux[id];
    }
    console.log('getChevalById called', id, this.chevaux);
    console.error('Erreur: Index du cheval invalide.');
    return undefined;
  }

  /**
   * Initialise la liste des chevaux avec des valeurs par défaut.
   */
  public initChevaux(): void {
    let roquepine: Cheval = new Cheval("Roquépine");
    let ourasi: Cheval = new Cheval("Ourasi");
    let nemesis: Cheval = new Cheval("Nemesis");
    let groot: Cheval = new Cheval("Groot");

    this.addCheval(roquepine);
    this.addCheval(ourasi);
    this.addCheval(nemesis);
    this.addCheval(groot);
  }

  /**
   * Retourne une copie de la liste des chevaux.
   * 
   * @returns Une copie de la liste des chevaux.
   */
  getCopyOfChevaux(): Cheval[] {
    return [...this.chevaux];
  }
}
