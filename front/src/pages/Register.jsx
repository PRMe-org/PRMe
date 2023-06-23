import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Register = () => {
  const server = 'http://localhost:3002';
  const Navigate = useNavigate();
  
  const imgUrl = '/images/kakao.svg';

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  /* ------------------ 회원가입 요청 ------------------ */
  const register = () => {
    axios
    .post(`${ server }/register`, {
      name: name,
      email: email,
      password: password,
    })
    .then(response => { 
      alert(JSON.stringify(response.data.state));
      // 회원가입 완료 시 login 페이지 이동
      if(JSON.stringify(response.data.state) === '"가입 완료"'){
        Navigate('/login');
      }
    })
    .catch(error => {
      alert('회원가입 요청 실패')
      console.log('요청이 실패했어요:', error.response);
    });
  };

  /* ------------------ 한글키 금지 ------------------ */
  const onlyEng = (event) => {
    const inputText = event.target.value;
    const filterText = inputText.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, ''); // 한글 입력 제거
    event.target.value = filterText;
  };

  /* ------------------ 페이지 첫 실행 ------------------ */
  useEffect(() => {
    if(document.cookie){ // 쿠키가 존재하는 경우
      Navigate('/home')
    } 
  }, []);
  /* ---------------------------------------------------- */


  return (
    <div className='form'>
      <div className='tab-header'>
        <div id='register-tab'>회원가입</div>
        <Link to='/login'><div id='login-tab'>로그인</div></Link>
      </div>

      <div className='tab-content'>
        <div className='tab-body'>

          <div className='form-element'>
            <p id='subtitle'>닉네임</p>
            <input id='input' type="text" placeholder='닉네임은 10자 이하로 해주세요.'
              onChange={(event) => {
                setName(event.target.value);
              }}
            />

            <p id='subtitle'>이메일</p>
            <input id='input' type="text" placeholder='example@gmail.com'
              onInput={ onlyEng }
              onChange={(event) => {
                setEmail(event.target.value);
                }}
              />

            <p id='subtitle'>비밀번호</p>
            <input id='input' type="password" placeholder='비밀번호는 5~12자 사이로 해주세요'
              onChange={(event) => {
                setPassword(event.target.value);
                }}
            />
          </div>

          <button onClick={ register } id='register-register'>
            회원가입
          </button>
          <button id='register-login'>
            <img src={ imgUrl } className='kakao'/>  
            카카오톡으로 회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;