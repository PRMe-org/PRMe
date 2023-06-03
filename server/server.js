//server.js
const express = require('express');
const cors = require('cors'); // CORS 
const bodyParser = require("body-parser"); // 데이터 파싱
const mysql = require("mysql"); // DB
const nodemailer = require("nodemailer"); // 메일

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

  
/* ----------------------------- 변수 저장 ----------------------------- */
const testSqlQuery = "INSERT INTO requested (rowno) VALUES (1)";
const registerQuery = "INSERT INTO user (email, name, password) VALUES (?,?,?)"; // 회원가입 쿼리
const loginQuery = "SELECT * FROM user WHERE email = ?"; // email검사 쿼리


/* --------------------- 회원가입 / 로그인 처리 함수 --------------------- */
// Get 요청 시 requested에 1이 저장되는 코드 (성공)
app.get("/", (req, res) => {
  db.query(testSqlQuery, (err, result) => {
    res.send("success!");
  });
});


// 회원가입 처리
app.post("/register", async(req, res) => { // 데이터 받아서 전송
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const sendData = { isLogin: "", name: "" };
  const sendTEst = { d: ""  };

  if (!name || !email || !password) { 
    sendTEst.d = "빈칸 없이 채워주세요.";
    res.send(sendTEst);
  } else {
    if (password.length < 5 || password.length > 12){
      sendTEst.d = "비밀번호는 5~12자리로 설정하세요.";
      res.send(sendTEst);
    } else{
      try {
        db.query(loginQuery, [email], function(err, result){
          if(err) throw err;
          if(result.length > 0) {
            sendTEst.d = "이미 있는 이메일 입니다.";
            res.send(sendTEst);
          } else {
            sendTEst.d = "확인완료";
            res.send(sendTEst);
            // 회원가입
            db.query(registerQuery, [email, name, password]);
          }
        })
    } catch (error){
        sendTEst.d = "오류가 발생했습니다.";
        res.send(sendTEst);
      }
    }
  };

});


// 로그인 처리
app.post("/login", (req, res) => { // 데이터 받아서 전송
  const email = req.body.email;
  const password = req.body.password;

  const sendData = { isLogin: "", name: "" };

  db.query(loginQuery, [email], function(err, result){
    if (err){
      console.error("로그인 쿼리 오류:", err);
      return res.status(500).send("로그인 처리 중 오류가 발생하였습니다.")
    }

    if (result.length === 0){ // 일치하는 이메일이 없는 경우
      sendData.isLogin = "로그인 실패";
      return res.json(sendData);
    }

    const user = result[0] // 쿼리 결과의 첫 번째 사용자 정보
    
    if (password === user.password) { // 비밀번호 일치
      sendData.isLogin = "로그인 성공";
      sendData.name = user.name;
    } else { 
      sendData.isLogin = "False";
    }

    return res.json(sendData);
  });
});


/* --------------------- 이메일 전송 함수 --------------------- */
app.post("/sendmail", (req, res) => {
  // 코드 출처 - https://nodemailer.com/about/
  const transporter= nodemailer.createTransport({
    "service": 'naver',
    "host": 'smtp.naver.com',
    "port": 465,
    auth:{
      user:"uu401@naver.com", // 보내는 메일 주소
      pass: "@네이버비밀번호@", // 보내는 메일 비밀번호
    }
  });

  const mailOptions = {
    from: 'uu401@naver.com',  // 송신할 네이버 메일
    to: req.body.email,  // 수신자 아이디
    subject: '0601 테스트 중', // 이메일 제목
    html: '안녕하십니까. 반갑습니다.', // 이메일 내용
  };
  
  // 두번째 인자로 콜백 함수를 넣어주면 await x
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      res.sendStatus(500); // 이메일 전송 실패 시 500 응답
    } else {
      console.log('Successfully Send Email.', info.response);
      transporter.close();
      res.sendStatus(200); // 성공 시 ok 응답
    }
  });
});