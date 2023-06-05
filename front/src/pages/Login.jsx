import React, { useState, KeyboardEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const server = 'http://localhost:3002';
  const Navigate = useNavigate();
  
  // input 값을 변수에 저장
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 한글키 금지
  const onlyEng = (event) => {
    const inputText = event.target.value;
    const filterText = inputText.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, ''); // 한글 입력 제거
    event.target.value = filterText;
  };

  const enterKeyPress = (event) => {
    if(event.key == 'Enter'){
      login();
    }
  };

  

  // 로그인 요청
  const login = () => {
    axios
    .post(`${ server }/login`, {
      email: email,
      password: password,
    })
    .then(response => {
      // 로그인 완료 시에만 home 페이지 이동
      if(JSON.stringify(response.data.isLogin) === '"성공"'){
        Navigate('/home');
      } else{
        alert(JSON.stringify(response.data.isLogin))
      }
    })
    .catch(error => {
      alert("실패했어요");
      console.log('실패했어요:', error.response);
    })
  };

  
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
              onInput={ onlyEng }
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              onKeyPress={ enterKeyPress }
             />

            <p id='subtitle'>비밀번호</p>
            <input id='input' type="password" placeholder='5~12자 사이' maxlength="12"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              onKeyPress={ enterKeyPress }
            />

          </div>

          <button onClick={ login } id='register-register'>
            로그인
          </button>
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