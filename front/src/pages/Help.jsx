import React from 'react';
import { useNavigate } from 'react-router-dom';

const Help = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div className='help'>
      <button id='close' onClick={handleClick}>X</button>
      
      <div className='introduce'>
        <p id='text'>
          안녕하세요 :)<br/>
          'PR Me'는 내 진짜 성격을 찾을 수 있는 서비스 입니다.<br/>
          내가 생각하는 내 성격을 정리하고,<br/>
          다른 사람이 생각하는 내성격과 비교해보며<br/>
          진짜 내 성격이 어떤지 알아볼 수 있습니다.<br/>
          피알미와 함께 내 진짜 성격을 찾아보세요!
        </p>
        <p id='from'>- PR Me 개발자 일동 -</p>
      </div>
    </div>
  )
}

export default Help