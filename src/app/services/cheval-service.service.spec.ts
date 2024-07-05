import { TestBed } from '@angular/core/testing';
import { ChevalServiceService } from './cheval-service.service';
import { Cheval } from '../models/cheval';


describe('ChevalServiceService', () => {
  let service: ChevalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChevalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('test ajout cheval', () => {
    let cheval = new Cheval('Johnny');
    service.addCheval(cheval);
    expect(service.getChevaux().length).toEqual(1);
  });

  it('test supprimer un cheval' , () => {
    // Ajoutez d'abord un cheval pour le supprimer ensuite
    let cheval = new Cheval('A');
    service.addCheval(cheval);
    // Vérifiez que le cheval a bien été ajouté
    expect(service.getChevaux().length).toEqual(1);
    // Récupérez l'ID du cheval ajouté
    let idCheval = service.getChevaux().indexOf(cheval);
    // Supprimez le cheval par son ID
    service.removeChevalById(idCheval);
    // Vérifiez que le cheval a bien été supprimé
    expect(service.getChevaux().length).toEqual(0);
  });

  it('test suppression de la liste avec tous les chevaux', () => {
    // Ajoutez quelques chevaux pour vous assurer qu'il y en a au moins un dans la liste
    service.addCheval(new Cheval('AZ'));
    service.addCheval(new Cheval('aZER'));
    service.addCheval(new Cheval('AZER'));
    // Vérifiez d'abord que la liste des chevaux n'est pas vide
    expect(service.getChevaux().length).toBeGreaterThan(0);
    // Appelez la méthode clearChevaux() pour vider la liste
    service.clearChevaux();
    // Assurez-vous maintenant que la liste des chevaux est vide après avoir vidé le tableau
    expect(service.getChevaux().length).toEqual(0);
  });

  it('test pour récuperer un cheval de listechevaux' , () => {
    // Ajout des chevaux à la liste des chevaux du service
    service.addCheval(new Cheval('AZE'));
    service.addCheval(new Cheval('AZER'));
    // Vérifiez d'abord que la liste des chevaux n'est pas vide
    expect(service.getChevaux().length).toBeGreaterThan(0);
    // Récupération de la liste des chevaux à partir du service
    let chevaux = service.getChevaux();
    // Vérification de la longueur de la liste si elle posséde au moin un cheval
    expect(chevaux.length).toBeGreaterThanOrEqual(1);
  })

  it('test pour récuperer un cheval par son index', () => {
    let cheval1 = new Cheval('Johnny');
    let cheval2 = new Cheval('Daisy');
    service.addCheval(cheval1);
    service.addCheval(cheval2);
    // Vérification que le cheval ajouté est récuperé par la methode getchevalById par son index
    expect(service.getChevalById(0)).toEqual(cheval1);
    expect(service.getChevalById(1)).toEqual(cheval2);
  });



});
