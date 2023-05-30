import React, { useState } from 'react';
import Dropdown from './Dropdown';

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className='navbar1'>
      <div className='titles'>
        <div className='title'>PR Me!</div>
        <div className='sub'>성격 찾기 프로젝트</div>
      </div>
      <div>
      <button id='help' onClick={() => setIsOpen((prev) => !prev)}>★</button>
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