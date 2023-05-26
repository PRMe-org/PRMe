import React from 'react'
import { Link } from 'react-router-dom'


const Navbar2 = () => {
  return (
    <div className='navbar1'>
      <div className='titles'>
        <div className='title'>PR Me!</div>
        <div className='sub'>성격 찾기 프로젝트</div>
      </div>
      <Link to='./help'><button id='help'>★</button></Link>
      {/* 버튼 누르면 탭 열리게 수정해야됨!! */}
    </div>
  )
}

export default Navbar2