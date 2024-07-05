import { Component } from '@angular/core';
import { Chien } from '../../models/chien';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlerteConsoleService } from '../../services/alerte-console.service';

@Component({
  selector: 'app-chien-view',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './chien-view.component.html',
  styleUrl: './chien-view.component.scss',
})
export class ChienViewComponent {
  chien: Chien;
  chienForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertConsole: AlerteConsoleService
  ) {
    this.chien = new Chien('xxx');
    this.chienForm = this.fb.group({
      nom: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.alertConsole.showAlert('aie aie aie !');
  }

  /**
   * Affiche les informations du chien et de son formulaire dans la console.
   */
  showMe() {
    console.log(
      `${this.chien.name} - ${this.chienForm.get('nom')?.value} - ${
        this.chienForm.dirty
      }`
    );
  }

  /**
   * Méthode appelée lors de la soumission du formulaire.
   * Appelle la méthode showMe pour afficher les informations du chien et du formulaire dans la console.
   */
  onSubmit() {
    this.showMe();
  }
}
