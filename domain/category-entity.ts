export class CategoryEntity {
    attachment: object;
    catId: string;
    name: string;
    naturalId: string;
    parentId: string;
    parentName: string;
    visible: boolean;

    constructor(attachment: object, catId: string, name: string, naturalId: string, parentId: string, parentName: string, visible: boolean) {
        this.attachment = attachment;
        this.catId = catId;
        this.name = name;
        this.naturalId = naturalId;
        this. parentId = parentId;
        this.parentName = parentName;
        this.visible = visible;
    }


    static getDefaultInstance = () => {
        return new CategoryEntity(null, null, null, null, null, null, false);
    }
}