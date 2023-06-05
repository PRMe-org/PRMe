import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import Selectbox from './Selectbox';


const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // 뷰포트 크기가 768px 이하가 되면 help2-phone만 보이게 설정
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='navbar1'>
      <div className='titles'>
        <div className='title'>PR Me!</div>
        <div className='sub'>성격 찾기 프로젝트</div>
        {/* 모바일에서 Selectbox 보이게. */}
        {isMobile && (
          <Selectbox />        
        )}
      </div>
      <div>
        {!isMobile && (
          <button id='help2' onClick={() => setIsOpen((prev) => !prev)}>★</button>
        )}
      </div>

      {isOpen && (
        <div className='dropdown'>
          <Dropdown />
        </div>
      )}

    </div>
  )
}

export default Navbar2;