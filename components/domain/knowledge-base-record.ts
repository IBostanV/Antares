export class KnowledgeBaseRecord {
  public categoryId: number;
  public content: string;
  public tags: string;
  public title: string;
  public visible: boolean;

  constructor(categoryId: number,
    content: string,
    tags: string,
    title: string,
    visible: boolean) {
    this.categoryId = categoryId;
    this.content = content;
    this.tags = tags;
    this.title = title;
    this.visible = visible;
  }
}