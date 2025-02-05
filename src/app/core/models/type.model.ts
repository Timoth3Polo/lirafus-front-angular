import { Classe } from "./classe.model";

export class Type {
    constructor(
        public name: string,
        public urlPicture: string,
        public classes: string[],
        public fetchedClasses: Classe[]
    ) {}
}