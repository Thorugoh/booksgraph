import fs from "fs"
import sqlite3 from "sqlite3";

const filepath = "./books.db";

function createDbConnection(){
  if(fs.existsSync(filepath)) {
    return new sqlite3.Database(filepath)
  }
  
  var db = new sqlite3.Database(filepath, (error) => {
    if(error){
      return console.error(error.message);
    }
  });

  createBooksTable(db);
  createPublishersTable(db);

  console.log("Connection with SQLite has been established");
  return db;
}

function createPublishersTable(db){
  db.exec(`
  CREATE TABLE authors
  (
    ID INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
  )
  `)
}

function createBooksTable(db){
  db.exec(`
  CREATE TABLE books
  (
    ID INTEGER PRIMARY KEY,
    title TEXT,
    description TEXT,
    authorId TEXT,
    cover TEXT,
    rating TEXT,
    url TEXT
  )
  `)
}

export default createDbConnection();