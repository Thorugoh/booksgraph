import db from "./index.js";

function getById(id){
  return new Promise((resolve, reject ) => {
    const query = "SELECT * FROM authors WHERE ID = ?"
    db.get(query, [id], (err, author) => {
      console.log('Executing query:', query);

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