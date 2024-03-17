import {CategoryEntity} from "./category-entity";
import {GlossaryTypeEntity} from "./glossary-type-entity";

export class GlossaryEntity {
    termId: string;
    key: string;
    value: string;
    isActive: boolean;
    type: GlossaryTypeEntity;
    category: CategoryEntity;

    constructor(termId: string,
                key: string,
                value: string,
                isActive: boolean,
                type: GlossaryTypeEntity,
                category: CategoryEntity)
    {
        this.termId = termId;
        this.key = key;
        this.value = value;
        this.isActive = isActive;
        this.type = type;
        this.category = category;
    }

    static getDefaultInstance = () => {
        return new GlossaryEntity(
            null, '', '', false,
            GlossaryTypeEntity.getDefaultInstance(), CategoryEntity.getDefaultInstance());
    }
}