const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('database.sqlite')

db.serialize(function () {
  db.run('CREATE TABLE IF NOT EXISTS pessoa (nome VARCHAR(200))');

  const statement = db.prepare('INSERT INTO pessoa VALUES (?)');
  for (let index = 0; index < 10; index++) {
    statement.run('Douglas ' + index);
  }
  statement.finalize();

  db.each('SELECT * FROM pessoa', function (error, row) {
    if (error) {
      console.error('Não foi possível realizar a consulta', error);
    } else {
      console.log('Pessoa:', row);
    }
  });
});