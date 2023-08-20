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
        authorId: row.authorId,
        cover: row.cover,
        rating: row.rating,
        url: row.url
      })
    });
  })
}

function create({title, description, authorId}){
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO books(title, description, authorId ) VALUES(?, ?, ?, ?)`, [title, description, authorId], (err) => {
      if(err){
        return reject(err);
      }
      return resolve({
        id: this.lastId,
        title,
        description,
        authorId
      })
    });
  })
}

function getAllByauthorId(id){
  return new Promise((resolve, reject) => {
    db.all(`SELECT ID id, title, description, authorId, cover, url, rating FROM books WHERE authorId = ?`, [id], (err, books) => {
      if(err){
        return reject(err);
      }
      return resolve(books)
    });
  })
}

function getAll(){
  return new Promise((resolve, reject) => {
    db.all(`SELECT ID id, title, description, authorId, cover, url, rating FROM books LIMIT 100`, [], (err, rows) => {
      if(err){
        return reject(err);
      }
      return resolve(rows)
    });
  })
}


export default {
  getById,
  getAllByauthorId,
  getAll,
  create
} 