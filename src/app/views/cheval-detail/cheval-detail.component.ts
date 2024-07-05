import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cheval } from '../../models/cheval';
import { ChevalServiceService } from '../../services/cheval-service.service';

@Component({
  selector: 'app-cheval-detail',
  templateUrl: './cheval-detail.component.html',
  styleUrls: ['./cheval-detail.component.scss'],
})
export class ChevalDetailComponent implements OnInit {

  idcheval?: number;
  cheval?: Cheval;
  
  constructor(
    private route: ActivatedRoute,
    private chevalService: ChevalServiceService
  ) {
    this.route.params.subscribe((params) => {
      this.idcheval = parseInt(params['id']);
      this.getData();
    });
  }

  /**
   * Récupère les données du cheval en fonction de l'ID.
   * Si le cheval n'est pas trouvé, affiche un message d'erreur dans la console.
   */
  getData() {
    if (this.idcheval !== undefined) {
      this.cheval = this.chevalService.getChevalById(this.idcheval);
      if (!this.cheval) {
        console.error('Cheval non trouvé pour ID :', this.idcheval);
      }
    }
  }

  /**
   * Hook de cycle de vie appelé après l'initialisation des propriétés liées aux données.
   */
  ngOnInit(): void {}
}
