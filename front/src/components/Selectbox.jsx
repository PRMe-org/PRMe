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

    // 화면 일정 비율 이하시 보이는 selectBox 
    if (option === 'HOME') {
      navigate('/home');
    } else if (option === '테스트 결과') {
      navigate('/home/friends');
    } else if (option === '내 정보') {
      navigate('/home/mypage');
    } else if (option === '로그아웃') {
      function deleteCookie(name) { // 쿠키 삭제
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    };
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
