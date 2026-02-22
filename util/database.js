const mysql=require('mysql2');
const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    database:'nis_final',
    password:'NewPass123!'
});
module.exports=pool.promise();