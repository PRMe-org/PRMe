import React, {useState} from 'react'

const Register = () => {
  const imgUrl = '/images/kakao.svg';

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className='form'>
      <div className='tab-header'>
        <div
          className={`tab-pane ${activeTab === 0 ? 'active' : ''}`}
          id='register-tab'
          onClick={() => handleTabClick(0)}
        >
          회원가입
        </div>
        <div
          className={`tab-pane ${activeTab === 1 ? 'active' : ''}`}
          id='login-tab'
          onClick={() => handleTabClick(1)}
        >
          로그인
        </div>
      </div>

      <div className='tab-content'>
        <div className={`tab-body ${activeTab === 0 ? 'active' : ''}`}>
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

        <div className={`tab-body ${activeTab === 1 ? 'active' : ''}`}>
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
          <p id='subtitle'>비밀번호를 잊으셨나요?</p>
        </div>
      </div>
    </div>
  );
}

export default Register;
