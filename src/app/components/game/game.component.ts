import { Component, OnInit } from '@angular/core';
import { Tag } from '../../models/tag';
import { Meme } from '../../models/meme';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  private usedTags: Array<Tag>;
  private currentTag: Tag;
  private memes: Array<Meme>;
  private isFinished: boolean;
  private finalMessage: string;
  private finalMeme: Meme;
  private question: string;
  private numberQuestion: number;
  private isFirst: boolean;
  private json = { "tags": [{ "id": 1, "title": "computação" }, { "id": 2, "title": "diversos" }, { "id": 3, "title": "programação" }, { "id": 4, "title": "tempo" }, { "id": 5, "title": "qualidade" }, { "id": 5, "title": "técnico de informática" }], "memes": [{ "id": 1, "title": "meme1", "imageUrl": "/assets/logo.png", "mainTag": { "id": 1, "title": "computação" }, "tags": [{ "id": 3, "title": "programação" }, { "id": 4, "title": "tempo" }] }, { "id": 2, "title": "meme2", "imageUrl": "/assets/logo.png", "mainTag": { "id": 1, "title": "computação" }, "tags": [{ "id": 3, "title": "programação" }, { "id": 5, "title": "qualidade" }] }, { "id": 3, "title": "meme3", "imageUrl": "/assets/logo.png", "mainTag": { "id": 1, "title": "computação" }, "tags": [{ "id": 3, "title": "programação" }, { "id": 6, "title": "técnico de informática" }] }, { "id": 4, "title": "meme4", "imageUrl": "/assets/logo.png", "mainTag": { "id": 1, "title": "computação" }, "tags": [{ "id": 6, "title": "técnico de informática" }, { "id": 4, "title": "tempo" }] }] };

  constructor() {
    this.usedTags = new Array<Tag>();
    this.memes = this.json.memes;
    this.isFinished = false;
    this.numberQuestion = 1;
  }

  ngOnInit() {
    this.init();
    this.isFirst = true;
  }


  public init(): void {
    this.currentTag = this.json.tags[0];
    this.generateQuestion();
  }

  public first(liked: boolean): void {
    this.memes = this.memes.filter(x => (liked ? this.currentTag.id === x.mainTag.id : !(this.currentTag.id === x.mainTag.id)));
    if (this.memes.length === 0) {
      this.isFinished = true;
      this.finalMessage = 'Não há memes cadastrados =/';
    } else {
      this.generateNextTag(this.memes[0]);
      this.generateQuestion();
      this.isFirst = false;
    }
  }

  public next(liked: boolean): void {
    this.usedTags.push(this.currentTag);
    this.memes = this.memes.filter(x => (liked ? x.tags.some(x => x.id === this.currentTag.id) : !x.tags.some(x => x.id === this.currentTag.id)));
    switch (this.memes.length) {
      case 0:
        this.isFinished = true;
        break;
      case 1:
        this.finalMeme = this.memes[0];
        this.isFinished = true;
        this.finalMessage = 'O meme encontrado foi';
        break;
      default:
        this.generateNextTag(this.memes[0]);
        this.generateQuestion();
        break;
    }
  }

  private generateNextTag(meme: Meme): void {
    this.currentTag = meme.tags.filter(x => !this.usedTags.some(y => y.id === x.id))[0];
  }

  private generateQuestion() {
    this.question = `pergunta: ${this.currentTag.title}`;
  }

}
