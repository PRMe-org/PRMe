import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Selectbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState('-');
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    if (currentValue === option) {
      setIsOpen(false);
      return;
    }

    setCurrentValue(option);
    setIsOpen(false);

     // 로그아웃 (쿠키삭제 예시)
     function deleteCookie(name) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }  

    // 화면 일정 비율 이하시 보이는 selectBox 
    if (option === 'HOME') {
      navigate('/home');
    } else if (option === '테스트 결과') {
      navigate('/home/friends');
    } else if (option === '내 정보') {
      navigate('/home/mypage');
    } else if (option === '로그아웃') {
      // 로그아웃 시 토큰 삭제 후 시작페이지로 이동
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      navigate('/');
    }
  };

  const toggleOptions = () => {
    setIsOpen((prev) => !prev);
  };

  const renderOptions = () => {
    const options = ['HOME', '테스트 결과', '내 정보', '로그아웃'];

    return (
      <ul>
        {options.map((option) => (
          <li key={option} onClick={() => handleOptionClick(option)}>
            {option}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className='selectbox'>
      <label onClick={toggleOptions}>
        {currentValue} 
        <span>{isOpen ? '∧' : '∨'}</span>
      </label>
      {isOpen && renderOptions()}
    </div>
  );
};

export default Selectbox;
