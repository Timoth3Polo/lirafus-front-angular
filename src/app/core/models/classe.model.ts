import { Type } from "./type.model";

export class Classe {
    constructor(
        public name: string,
        public primaryColor: string,
        public secondaryColor: string,
        public urlProfilePicture: string,
        public urlCharacterPicture: string,
        public urlBackgroundPicture: string,
        public overview: string,
        public nickname1: string,
        public nickname2: string,
        public types: string[],
        public fetchedTypes: Type[]
    ) {}
}