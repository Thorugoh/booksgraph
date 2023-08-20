import db from "./index.js";

function getById(id){
  return new Promise((resolve, reject ) => {
    db.get(`SELECT * FROM publishers WHERE ID = ?`, [id], (err, publisher) => {
      if(err){
       return reject(err);
      }
      return resolve({
        id: publisher.ID,
        name: publisher.name,
      })
    })
  })
}

export default {
  getById,
} 