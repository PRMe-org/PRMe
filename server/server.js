//server.js
const express = require('express');
const mysql = require("mysql");
const app = express();
// const test = require('./Router/test');
const PORT = process.env.port || 3002;

// DB 연동
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "wjflrkfk",
    database: "testdb",
  });

// app.use('/api', test);
// 브라우저에 URL 입력 시 DB에 1이 저장되는 코드
app.get("/", (req, res) => {
    const sqlQuery = "INSERT INTO requested (rowno) VALUES (1)";
    db.query(sqlQuery, (err, result) => {
      res.send("success!");
    });
  });

app.listen(PORT, ()=>{
    console.log(`running on port ${PORT}`); // 포트번호 3002
});