import db from "./index.js";

function getById(id){
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM books WHERE ID = ?`, [id], (err, row) => {
      if(err){
        return reject(err);
      }
      if(!row) return resolve(null);
      return resolve({
        id: row.ID,
        title: row.title,
        description: row.description,
        author: row.author,
        publisherId: row.publisherId
      })
    });
  })
}

function create({title, description, author, publisherId}){
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO books(title, description, author, publisherId) VALUES(?, ?, ?, ?)`, [title, description, author, publisherId], (err) => {
      if(err){
        return reject(err);
      }
      return resolve({
        id: this.lastId,
        title,
        description,
        author,
        publisherId
      })
    });
  })
}

function getAllByPublisherId(id){
  return new Promise((resolve, reject) => {
    db.all(`SELECT ID id, title, description, author, publisherId FROM books WHERE publisherId = ?`, [id], (err, books) => {
      if(err){
        return reject(err);
      }
      return resolve(books)
    });
  })
}

function getAll(){
  return new Promise((resolve, reject) => {
    db.all(`SELECT ID id, title, description, author, publisherId FROM books LIMIT 100`, [], (err, rows) => {
      if(err){
        return reject(err);
      }
      return resolve(rows)
    });
  })
}


export default {
  getById,
  getAllByPublisherId,
  getAll,
  create
} 