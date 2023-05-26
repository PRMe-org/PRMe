import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
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
            <input id='input' type="text" placeholder='10자 이하' />
            <p id='subtitle'>이메일</p>
            <input id='input' type="text" placeholder='example@gmail.com' />
            <p id='subtitle'>비밀번호</p>
            <input id='input' type="text" placeholder='7자 이하' />
          </div>
          <button id='register-register'>회원가입</button>
          <button id='register-login'>
            <img src={imgUrl} className='kakao'/>  
            카카오톡으로 회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
