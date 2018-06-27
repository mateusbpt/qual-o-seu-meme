import { Tag } from "./tag";

export class Meme {
    public id: number;
    public title: string;
    public imageUrl: string;
    public mainTag: Tag;
    public tags: Array<Tag>;
}
