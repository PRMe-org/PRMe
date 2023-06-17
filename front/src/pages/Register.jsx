import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Register = () => {
  const server = 'http://localhost:3002';
  const Navigate = useNavigate();

  // input 값을 변수에 저장
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // 회원가입 요청
  const register = () => {
    // 코드 출처 - https://docs.strapi.io/dev-docs/plugins/users-permissions#registration
    axios
    .post(`${ server }/register`, {
      name: name, // input값을 저장한 변수
      email: email,
      password: password,
    })
    .then(response => {
      alert(JSON.stringify(response.data.state));
      // 회원가입 완료 시에만 login 페이지 이동
      if(JSON.stringify(response.data.state) === '"가입 완료"'){
        Navigate('/login');
      }
    })
    .catch(error => {
      alert('회원가입 요청 실패')
      console.log('요청이 실패했어요:', error.response);
    });
  };

  // 한글키 금지
  const onlyEng = (event) => {
    const inputText = event.target.value;
    const filterText = inputText.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, ''); // 한글 입력 제거
    event.target.value = filterText;
  };

  // 컴포넌트가 처음 마운트되었을 때 실행(처음 한번만)
  useEffect(() => {
    if(document.cookie){ // 쿠키가 존재하는 경우
      Navigate('/home')
    } 
  }, []);


  const imgUrl = '/images/kakao.svg';

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
            <input id='input' type="text" placeholder='10자 이하'
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
            <input id='input' type="password" placeholder='5~12자 사이'
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