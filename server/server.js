//server.js
const express = require('express');
const cors = require('cors'); // CORS 
const bodyParser = require("body-parser"); // 데이터 파싱
const mysql = require("mysql"); // DB
const bcrypt = require('bcrypt') // 비밀번호 해싱
const nodemailer = require("nodemailer"); // 메일
const dotenv = require('dotenv'); // 환경변수 관리
const jwt = require('jsonwebtoken'); // jwt
const cookieParser = require('cookie-parser'); // 쿠키

const app = express();
dotenv.config();

/* --------------------------- 환경 설정 ------------------------------- */
app.listen(process.env.PORT, ()=>{
  console.log(`running on port ${process.env.PORT}`); // 포트번호는 .env에
});

// CORS 활성화
app.use(cors({ 
  origin: "http://localhost:3000", // 도메인 허용 옵션
  credentials: true, // 
})); 

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


/* --------------------- 회원가입 / 로그인 처리 함수 --------------------- */
// [[ TEST ]] Get 요청 시 requested에 1이 저장되는 코드 (성공)
app.get("/", (req, res) => {
  const testSqlQuery = "INSERT INTO requested (rowno) VALUES (1)";
  db.query(testSqlQuery, (err, result) => {
    res.send("success!");
  });
});


// 회원가입 처리
app.post("/register", async(req, res) => { // 데이터 받아서 전송
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 유효성 검사를 위한 정규표현식
  const sendTest = { state: ""  };

  if (!name || !email || !password) { 
    sendTest.state = "빈칸 없이 채워주세요.";
    return res.json(sendTest);
  } else {
    // 비밀번호 길이 검사
    if (password.length < 5 || password.length > 12){
      sendTest.state = "비밀번호는 5~12자리로 설정하세요.";
      return res.json(sendTest);
    } else if(name.length > 10) {
      // 닉네임 길이 검사
      sendTest.state = "닉네임은 10자 이하로 설정하세요.";
      return res.json(sendTest);
    } else if (!emailRegex.test(email)) {
      // 이메일 유효성 검사
      sendTest.state = "유효한 이메일 주소를 입력해주세요.";
      return res.json(sendTest);
    } else {
      try {
        // 이메일 중복 검사
        db.query("SELECT * FROM user WHERE email = ?", [email], function(err, result){
          if(err) throw err;
          if(result.length > 0) {
            sendTest.state = "이미 가입된 이메일 입니다.";
            return res.json(sendTest);
          } else {
            // 닉네임 중복 검사
            db.query("SELECT * FROM user WHERE name = ?", [name], function(err,result){
              if(err) throw err;
              if(result.length > 0) {
                sendTest.state = "중복된 닉네임 입니다.";
                return res.json(sendTest);
              } else {
                // 비밀번호 해싱
                const hasedPassword = bcrypt.hashSync(password, 10);
                // 회원가입
                db.query("INSERT INTO user (email, name, password) VALUES (?,?,?)", [email, name, hasedPassword]);
                sendTest.state = "가입 완료";
                return res.json(sendTest);
              }
            })
          }
        })
    } catch (error){
        sendTest.state = "오류가 발생했습니다.";
        return res.json(sendTest);
      }
    }
  };

});


// 로그인 처리
app.post("/login", (req, res) => { // 데이터 받아서 전송
  const email = req.body.email;
  const password = req.body.password;

  const sendData = { isLogin: "", name: "", accesstoken: "", refreshtoken: "" };

  if (!email || !password) { 
    sendData.isLogin = "빈칸 없이 채워주세요.";
    return res.json(sendData);
  } else {
    try{
      // 이메일 검사
      db.query("SELECT * FROM user WHERE email = ?", [email], function(err, result){
        if (err) throw err;
        if (result.length > 0){ // 일치하는 이메일이 있을 때
          const user = result[0] // 쿼리 결과의 첫 번째 사용자 정보

          bcrypt.compare(password, user.password, (err, result) => { // 비밀번호 검사
            if(err) throw err;
            if(result === true){ 

              try{
                // access Token 발급
                const accesstoken = jwt.sign({
                  email: user.email,
                  username: user.name
                }, process.env.ACCESS_SECRET, {
                  expiresIn : '1m',
                  issuer : 'About Tech', 
                });

                // refresh Token 발급
                const refreshtoken = jwt.sign({
                  email: user.email,
                  username: user.name
                }, process.env.REFRESH_SECRET, {
                  expiresIn : '24h',
                  issuer : 'About Tech', 
                });
  
                sendData.isLogin = "성공";
                sendData.name = user.name;
                sendData.accesstoken = accesstoken;
                sendData.refreshtoken = refreshtoken;
                return res.json(sendData);
                
              } catch (error) {
                res.status(500).json(error);
              }

            } else {
              sendData.isLogin = "이메일 또는 비밀번호를 확인하여주세요.";
              return res.json(sendData);
            }
          })
        } else {
          // 일치하는 이메일이 없을 때
          sendData.isLogin = "이메일 또는 비밀번호를 확인하여주세요.";
          return res.json(sendData);
        }
      });
    } catch (error){
      sendData.isLogin = "오류가 발생했습니다.";
      return res.json(sendData);
    }
  }

});

app.get("/accessT", (req, res) => {
  try {
      const token = req.cookies.accessToken; // accessToken의 value
      const data = jwt.verify(token, process.env.ACCESS_SECRET);
  
      const userData = { email:"", name:"" };
  
      // userData.email = data.email;
      // userData.name = data.name;
      return res.send("성공");
  
    } catch (error){
      return res.send("응답실패... " + error);
    }
  
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


/* --------------------- myTest 함수 --------------------- */
app.get("/home/test", (req, res) => {
  const result = req.query.result;
  const intResult = result.map((value) => parseFloat(value)); // 문자형 -> 실수형

  const sendTest = result; // Test
  const testEmail = 'czmcm5@gmail.com'; // Test

  // 이메일 검사
  db.query("SELECT * FROM mytestsave WHERE email = ?", [testEmail], function(err, result){
    if (err) throw err;
    if (result.length > 0){ // 일치하는 이메일이 있을 때
      const myTestUpdateQuery = 'UPDATE mytestsave SET ISTJ=?,ISFJ=?,INFJ=?,INTJ=?,ISTP=?,ISFP=?,INFP=?,INTP=?,ESTP=?,ESFP=?,ENFP=?,ENTP=?,ESTJ=?,ESFJ=?,ENFJ=?,ENTJ=?,E=?,N=?,F=?,J=? WHERE email = ?';
      db.query(myTestUpdateQuery, [...intResult, testEmail], (err, result) => {
        res.send(sendTest);
      });

    } else {
      res.send("없는 이메일 이에요.");
      const resultQuery = "INSERT INTO mytestsave(email,ISTJ,ISFJ,INFJ,INTJ,ISTP,ISFP,INFP,INTP,ESTP,ESFP,ENFP,ENTP,ESTJ,ESFJ,ENFJ,ENTJ,E,N,F,J)VALUES (?,?)";
      db.query(resultQuery, [testEmail, intResult], function(err, result) {
        res.send(sendTest);
      });
    }
  });
});
