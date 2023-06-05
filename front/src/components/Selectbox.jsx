import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Selectbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState('HOME');
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    if (currentValue === option) {
      setIsOpen(false);
      return;
    }

    setCurrentValue(option);
    setIsOpen(false);

    if (option === 'HOME') {
      navigate('/home');
    } else if (option === '성격 테스트') {
      navigate('/home/friends');
    } else if (option === '내 정보') {
      navigate('/home/mypage');
    } else if (option === '로그아웃') {
      // 로그아웃 기능 구현
    }
  };

  const toggleOptions = () => {
    setIsOpen((prev) => !prev);
  };

  const renderOptions = () => {
    const options = ['HOME', '성격 테스트', '내 정보', '로그아웃'];

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
