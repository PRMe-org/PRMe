import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
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
            <input id='input' type="text" placeholder='example@gmail.com' />
            <p id='subtitle'>비밀번호</p>
            <input id='input' type="text" placeholder='7자 이하' />
          </div>
          <button id='register-register'>로그인</button>
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

export default Register;
