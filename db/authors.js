import db from "./index.js";

function getById(id){
  return new Promise((resolve, reject ) => {
    db.get(`SELECT * FROM authors WHERE ID = ?`, [id], (err, author) => {
      if(err){
       return reject(err);
      }
      return resolve({
        id: author.ID,
        name: author.name,
      })
    })
  })
}

export default {
  getById,
} 