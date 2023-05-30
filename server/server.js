//server.js
const express = require('express');
const cors = require('cors'); // CORS 
const bodyParser = require("body-parser"); // 데이터 파싱
const mysql = require("mysql"); // DB

const app = express();
const PORT = process.env.port || 3002;

/* --------------------------- 환경 설정 ------------------------------- */
// CORS 활성화
app.use(cors({ 
  origin: "http://localhost:3000", // 도메인 허용 옵션
  credentials: true, // 
})); 

app.listen(PORT, ()=>{
    console.log(`running on port ${PORT}`); // 포트번호 3002
});

// josn 형태로 데이터 파싱
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DB 연동
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "wjflrkfk",
    database: "testdb",
  });


/* --------------------------- URL 처리 함수 ------------------------------- */
// Get 요청 시 requested에 1이 저장되는 코드 (성공)
app.get("/", (req, res) => {
  const sqlQuery = "INSERT INTO requested (rowno) VALUES (1)";
  db.query(sqlQuery, (err, result) => {
    res.send("success!");
  });
});


// 회원가입 처리
app.post("/register", (req, res) => { // 데이터 받아서 전송
const name = req.body.name;
const email = req.body.email;
const password = req.body.password;

const sqlQuery = "INSERT INTO user (email, name, password) VALUES (?,?,?)";
db.query(sqlQuery, [email, name, password], (err, result) => {
  res.send("success!");
});
}
);


// 로그인 처리
app.post("/login", (req, res) => { // 데이터 받아서 전송
  const email = req.body.email;
  const password = req.body.password;
  const sendData = { isLogin: "", name: "" };

  const loginQuery = "SELECT * FROM user WHERE email = ?";
  db.query(loginQuery, [email], function(err, result, fields){
    if (err){
      console.error("로그인 쿼리 오류:", err);
      return res.status(500).send("로그인 처리 중 오류가 발생하였습니다.")
    }

    if (result.length === 0){ // 일치하는 이메일이 없는 경우
      sendData.isLogin = "False"; // 로그인 실패
      return res.json(sendData);
    }

    const user = result[0] // 쿼리 결과의 첫 번째 사용자 정보
    
    if (password === user.password) { // 비밀번호가 일치하는 경우
      sendData.isLogin = "True";
      sendData.name = user.name;
    } else { // 비밀번호가 일치하지 않는 경우
      sendData.isLogin = "False";
    }

    return res.json(sendData);
  });
});