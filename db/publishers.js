const db = require("./index");

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

module.exports = {
  getById,
} 