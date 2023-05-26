import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {

  const imgUrl = '/images/smile'+'.png'

  return (
    <div className='welcome'>
      <div className='welcomebox'>
        <img src={imgUrl} className='smile'/>
        
        <div className='loginbuttons'>
          <Link to='/register'><button id='register'>회원가입</button></Link>
          <Link to='/login'><button id='login'>로그인</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Welcome