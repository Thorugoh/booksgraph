import db from "./index.js";
import sqlite3 from "sqlite3";

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

function count(){
  return new Promise((resolve, reject) => {
    db.all(`SELECT COUNT(*) as count FROM books`, [], (err, [row]) => {
      if(err){
        return reject(err);
      }
      return resolve(row.count)
    });
  })
}

function getAll(limit, offset){
  return new Promise((resolve, reject) => {
    let query = "SELECT ID id, title, description, authorId, cover, url, rating FROM books"
    const parameters = [];

    if(limit){
      query += ` LIMIT ?`;
      parameters.push(limit);
    }

    if(offset){
      query += ` OFFSET ?`;
      parameters.push(offset);
    }

    db.all(query, parameters, (err, rows) => {
      console.log('Executing query:', query);

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
  create,
  count
} 