import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const Login = () => {
  const server = 'http://localhost:3002'
  
  // input 값을 변수에 저장
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 요청
  const login = () => {
    axios
    .post(`${ server }/login`, {
      email: email,
      password: password,
    })
    .then(response => {
      alert("로그인 요청 성공!");
      console.log(response.data)
    })
    .catch(error => {
      console.log('실패했어요:', error.response);
    });
  }


  
  const imgUrl = '/images/kakao.svg';

  return (
    <div className='form'>
      <div className='tab-header'>
      <Link to='/register'><div id='login-register-tab'>회원가입</div></Link>
        <div id='login-login-tab'>로그인</div>
      </div>

      <div className='tab-content'>
        <div className='tab-body'>
          
          <div className='form-element'>
            <p id='subtitle'>이메일</p>
            <input id='input' type="text" placeholder='example@gmail.com'
              onChange={(event) => {
                setEmail(event.target.value);
              }}
             />

            <p id='subtitle'>비밀번호</p>
            <input id='input' type="password" placeholder='7자 이하'
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />

          </div>

          <button onClick={ login } id='register-register'>로그인</button>
          <button id='register-login'>
            <img src={imgUrl} className='kakao'/>  
            카카오톡으로 로그인
          </button>
          
          <Link to='/pwfind' style={{ textDecorationLine: 'none' }}>
            <p id='pwforgot'>비밀번호를 잊으셨나요?</p></Link>
        </div>
      </div>
    </div>
  );
}

export default Login;