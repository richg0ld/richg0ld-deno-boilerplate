import db from "./../../../database/index.ts";

const database = db.getDatabase();
const samples = database.collection("samples");

export interface ISampleModel {
  _id: String;
  title: String;
  author: String;
  published_date: Date;
}

export class Sample<ISampleModel> {
  title: String;
  author: String;
  published_date?: Date;
  constructor(title: String, author: String, published_date?: Date) {
    this.title = title;
    this.author = author;
    this.published_date = published_date
      ? new Date(published_date)
      : new Date();
  }
}

export default samples;
