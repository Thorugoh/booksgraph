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
  CREATE TABLE publishers
  (
    ID INTEGER PRIMARY KEY,
    name TEXT
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
    author TEXT,
    publisherId INTEGER
  )
  `)
}

export default createDbConnection();