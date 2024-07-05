import { Injectable } from "@angular/core";
import { Cheval } from "../models/cheval";

@Injectable({
    providedIn: 'root'
})
export class RaceService {
    public horses: Cheval[] = [];
    private raceDistance: number = 0;
    private randomOrder: number[] = [];
    public finishedRunning: Cheval[] = [];
    private readonly RACE_CAPACITY: number = 10;
    private readonly MAX_PODIUM: number = 3;
    private readonly FEAR_DISTANCE: number = 100;

    public constructor() {}

    /**
     * Initialise la liste des chevaux de la course.
     * 
     * @param horses - La liste des chevaux à participer à la course.
     */
    public initHorses(horses: Cheval[]): void {
        this.horses = horses;
        this.randomOrder = [];
        for (let i: number = 0; i < this.horses.length; i++) {
            this.randomOrder.push(i);
        }
    }

    /**
     * Ajoute un cheval à la liste des chevaux de la course.
     * 
     * @param animal - Le cheval à ajouter.
     * @throws Erreur si la capacité maximale de la course est atteinte ou si la course a déjà commencé.
     */
    public addAnimal(animal: Cheval): void {
        let sumDistances: number = 0;
        for (let i: number = 0; i < this.horses.length; i++) {
            sumDistances += this.horses[i].getPos();
        }

        let notReachedCapacity: boolean = (this.horses.length < this.RACE_CAPACITY);
        let notStarted: boolean = (sumDistances === 0);
        if (notReachedCapacity && notStarted) {
            this.horses.push(animal);
            this.randomOrder.push(this.randomOrder.length);
        } else {
            throw new Error("Max race capacity reached or race already started");
        }
    }

    /**
     * Supprime un cheval de la liste des chevaux de la course par son identifiant.
     * 
     * @param id - L'identifiant du cheval à supprimer.
     */
    public removeAnimalById(id: number): void {
        if (id >= 0 && id < this.horses.length) {
            this.horses.splice(id, 1);
            this.randomOrder.splice(id, 1);
        }
    }

    /**
     * Vide la liste des chevaux de la course.
     */
    public clearAnimals(): void {
        this.horses = [];
        this.randomOrder = [];
    }

    /**
     * Définit la distance de la course.
     * 
     * @param distance - La distance de la course.
     */
    public setRaceDistance(distance: number): void {
        this.raceDistance = distance;
    }

    /**
     * Renvoie la distance de la course.
     * 
     * @returns La distance de la course.
     */
    public getRaceDistance(): number {
        return this.raceDistance;
    }

    /**
     * Mélange l'ordre des chevaux pour la course.
     */
    private shuffle(): void {
        let choices: number[] = [];
        for (let i: number = 0; i < this.horses.length; i++) { choices.push(i); }

        for (let i: number = 0; i < this.horses.length; i++) {
            let choice: number = Math.floor(Math.random() * choices.length);
            this.randomOrder[i] = choices[choice];
            choices.splice(choice, 1);
        }
    }

    /**
     * Définit la distance réelle parcourue par un cheval pendant un tour de course.
     * 
     * @param isScared - Indique si le cheval est effrayé.
     * @param currentHorse - Le cheval actuel.
     */
    private setRealDistance(isScared: boolean, currentHorse: Cheval): void {
        const perfDistance: number = currentHorse.runHorse();
        const fearCoefficient: number = (1 - currentHorse.getIndiceFlipette() / 100);
        if (isScared) {
            currentHorse.setPos(Math.round(perfDistance * fearCoefficient));
        } else {
            currentHorse.setPos(Math.round(perfDistance));
        }
    }

    /**
     * Simule un tour de course pour un cheval donné.
     * 
     * @param idx - L'index du cheval dans la liste.
     */
    private run(idx: number): void {
        let delta: number = 0;
        let isScared: boolean = false;
        const currentHorse = this.horses[idx];

        for (let i: number = 0; i < this.horses.length; i++) {
            delta = Math.abs(this.horses[i].getPos() - currentHorse.getPos());
            const hasNotFinished: boolean = !this.finishedRunning.includes(this.horses[i]);
            const inFearZone: boolean = delta > 0 && delta < this.FEAR_DISTANCE;

            if (hasNotFinished && inFearZone) {
                isScared = true;
            }
        }

        this.setRealDistance(isScared, currentHorse);
    }

    /**
     * Exécute un tour complet de course.
     */
    public runRound(): void {
        this.shuffle();

        for (let i: number = 0; i < this.randomOrder.length; i++) {
            let idx: number = this.randomOrder[i];
            let canRun: boolean = this.horses[idx].getPos() < this.raceDistance;

            if (canRun) { this.run(idx); }
            else if (!this.finishedRunning.includes(this.horses[idx])) {
                this.finishedRunning.push(this.horses[idx]);
            }
        }
    }

    /**
     * Renvoie les noms des chevaux sur le podium.
     * 
     * @returns La liste des noms des chevaux sur le podium.
     */
    public getPodium(): String[] {
        let podium: String[] = [];

        for (let i: number = 0; i < this.MAX_PODIUM; i++) {
            podium.push(this.finishedRunning[i].name);
        }

        return podium;
    }

    /**
     * Exécute la course jusqu'à ce que tous les chevaux aient terminé.
     * 
     * @returns La liste des chevaux ayant terminé la course.
     */
    public race(): Cheval[] {
        while (this.finishedRunning.length < this.horses.length) {
            this.runRound();
        }

        return this.finishedRunning;
    }
}
