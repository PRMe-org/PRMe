import React from 'react'

const Mypage = () => {
  const imgUrl = '/images/default.svg';

  return (
    <div className='mypage'>
      <div className='mypage-content'>
        
        <div className='mypage-content-top'>
          <div className='profile-hover'>+</div>
          <div className='profile' id='mypage-prorile'>
            <img src={imgUrl} className='default'/>
          </div>
          <div className='mypage-settings'>
            <div className='mypage-settings-title'>기본 정보</div>

            <div className='mypage-setting1'>
              <div className='mypage-subtitle'>닉네임</div>
              <input type="text" placeholder='피알미'/>
            </div>

            <div className='mypage-setting2'>
              <div className='mypage-subtitle'>이메일</div>
              <div className='mypage-fixed'>example@gmail.com</div>
            </div>

            <div className='mypage-setting3'>
              <div className='mypage-subtitle'>검사일</div>
              <div className='mypage-fixed'>2023.05.30</div>
            </div>

          </div>
        </div>

        <div className='delete-save'>
          <button className='mypage-delete'>탈퇴하기</button>
          <button className='mypage-save'>저장하기</button>
        </div>
      </div>

      <div className='mypage-buttons'>
        <button>테스트 결과 보기</button>
        <button>테스트 다시 하기</button>
      </div>
    </div>
  )
}

export default Mypage