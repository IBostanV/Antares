export class GlossaryTypeEntity {
    id: number;
    name: string;
    options: string;
    isActive: boolean;

    constructor(id: number, name: string, options: string, isActive: boolean) {
        this.name = name;
        this.id = id;
        this.options = options;
        this.isActive = isActive;
    }

    static getDefaultInstance = () => {
        return new GlossaryTypeEntity(null, null, null, false);
    }

}