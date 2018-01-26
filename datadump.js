const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

db.all('SELECT * FROM Artist', (error, rows) => {
  if (error) {console.log(error)};
  console.log("Artists");
  console.log(rows);
});
db.all('SELECT * FROM Issue', (error, rows) => {
  if (error) {console.log(error)};
  console.log("Issues");
  console.log(rows);
});
db.all('SELECT * FROM Series', (error, rows) => {
  if (error) {console.log(error)};
  console.log("Series");
  console.log(rows);
});
