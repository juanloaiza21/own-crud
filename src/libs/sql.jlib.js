const sqlite = require('sqlite')

class SQL{
  constructor(){
    this.db = new sqlite.Database("../db/db.db", sqlite.OPEN_READWRITE, (err) =>{
      if(err) console.error(err)
    })
    this.sql;
    this._tableUser = "CREATE TABLE USERS (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, fullName TEXT, password TEXT)"
  }

  tableUserGet(){
    return this._tableUser
  }

  sqlSet(sql){
    this.sql = sql
  }

  _close() {
    this.db.close((err)=> {
      if(err) console.error(err.message)
    })
  }
  createTable(table){
    this.db.run(table)
    this._close()
  }
  runCommand(){
    this.db.run(this.sql);
    this._close()
  }

  runSelect(){
    this.db.all(this.sql, [], (err, rows)=> {
      if (err) console.error(err.message);
      rows.forEach(element => {
        console.log(element)
      });
    })
    this._close()
  }

}


module.exports = SQL;