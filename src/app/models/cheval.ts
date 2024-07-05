import { Animal } from "./animal";

export class Cheval extends Animal {
    private runningpos: number = 0; // Position actuelle du cheval pendant la course
    private indicePerformance: number = 0; // Indice de performance du cheval (aléatoire)
    private indiceFlipette: number = 0; // Indice de "flipette" (aléatoire)
    public robe: string | undefined; // Couleur de la robe du cheval
    public vitesse_max: number = 0; // Vitesse maximale du cheval (non utilisée dans le code fourni)

    /**
     * Constructeur de la classe Cheval.
     * 
     * @param name Le nom du cheval.
     */
    public constructor(name: string) {
        super(name); // Appelle le constructeur de la classe parente Animal avec le nom du cheval
        this.setIndicePerformance(); // Initialise l'indice de performance du cheval
        this.setIndiceFlipette(); // Initialise l'indice de "flipette" du cheval
    }

    /**
     * Réinitialise la position du cheval à 0.
     */
    public initPos(): void {
        this.runningpos = 0;
    }

    /**
     * Définit aléatoirement l'indice de performance du cheval.
     * Cet indice influence la vitesse de course du cheval.
     * Plus l'indice est élevé, plus le cheval est performant.
     */
    private setIndicePerformance(): void {
        this.indicePerformance = Math.floor(Math.random() * 100) + 1;
    }

    /**
     * Retourne l'indice de performance actuel du cheval.
     * 
     * @returns L'indice de performance du cheval.
     */
    public getIndicePerformance(): number {
        return this.indicePerformance;
    }

    /**
     * Définit aléatoirement l'indice de "flipette" du cheval.
     * Cet indice influence la réaction du cheval face à certaines situations.
     * Plus l'indice est élevé, plus le cheval est sujet à être effrayé.
     */
    private setIndiceFlipette(): void {
        this.indiceFlipette = Math.floor(Math.random() * 100) + 1;
    }

    /**
     * Retourne l'indice de "flipette" actuel du cheval.
     * 
     * @returns L'indice de "flipette" du cheval.
     */
    public getIndiceFlipette(): number {
        return this.indiceFlipette;
    }

    /**
     * Simule la distance parcourue par le cheval lors d'un pas.
     * La distance est influencée par l'indice de performance du cheval.
     * 
     * @returns La distance réelle parcourue par le cheval.
     */
    private getStepHorse(): number {
        return Math.floor(Math.random() * 9);
    }

    /**
     * Fait avancer le cheval d'une distance calculée aléatoirement,
     * tenant compte de son indice de performance.
     * 
     * @returns La distance réelle parcourue par le cheval.
     */
    public runHorse(): number {
        let distance: number = this.getStepHorse();
        let realDistance: number = distance * (1 + this.indicePerformance / 100);
        return realDistance;
    }

    /**
     * Définit la nouvelle position du cheval en ajoutant la distance spécifiée.
     * 
     * @param distance La distance à ajouter à la position actuelle du cheval.
     */
    public setPos(distance: number): void {
        this.runningpos += distance;
    }

    /**
     * Retourne la position actuelle du cheval.
     * 
     * @returns La position actuelle du cheval.
     */
    public getPos(): number {
        return this.runningpos;
    }
}
