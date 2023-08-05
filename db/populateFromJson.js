const db = require("./index");
const books = require("../data/books.json")
const publishers = require("../data/publishers.json")

function populateBooks(){
  books.forEach(({id, title, description, author, publisherId}) => {
    db.run(
      `INSERT INTO books (ID, title, description, author, publisherId) VALUES (?, ?, ?, ?, ?)`,
      [id, title, description, author, publisherId],
      (error) => {
        if(error){
          console.error(error.message)
        }
        console.log(`Inserted a row with the ID ${this.lastID}`);
      }
    )
  })

}

function populatePublishers(){
  publishers.forEach(({id, name}) => {
    db.run(
      `INSERT INTO publishers (ID, name) VALUES (?, ?)`,
      [id, name],
      (error) => {
        if(error){
          console.error(error.message)
        }
        console.log(`Inserted a row with the ID ${this.lastID}`);
      }
    )
  })

}

populateBooks();
populatePublishers();