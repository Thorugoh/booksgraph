import db from "./index.js";
import DataLoader from 'dataloader'

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

export const authorsLoader = new DataLoader(ids =>  new Promise((resolve, reject) => {
    const placeholders = ids.map(() => '?').join(', ');
    const query = `SELECT * FROM authors WHERE id IN (${placeholders})`;
    db.all(query, ids, (err, rows) => {
      console.log(`Executing query: ${query} parameters: ${ids}`);
      if(err){
        reject();
      }else {
        resolve(rows.map(row => ({id: row.ID, ...row})))
      }
    })
  })
)

export default {
  getById,
  authorsLoader,
} 