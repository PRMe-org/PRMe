import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className='navbar1'>
      <div className='titles'>
        <div className='title'>PR Me!</div>
        <div className='sub'>성격 찾기 프로젝트</div>
      </div>
      <Link to='./help'><button id='help'>?</button></Link>
    </div>
  )
}

export default Navbar