import React from 'react'
import { Link } from 'react-router-dom'

const Pwfind = () => {

  const imgUrl = '/images/smile'+'.png'

  return (
    <div className='pwfind-welcome'>
      <img src={imgUrl} className='pwfind-smile'/>
      
      <div className='pwfind-loginbuttons'>
        <input type='text' id='pwfind' name='email' placeholder='피알미에 가입된 이메일을 입력해주세요'></input>
        <button id='login'>비밀번호 변경 url 전송</button>
      </div>

      <Link to='/' style={{ textDecorationLine: 'none' }}>
        <p id='pwforgot'>첫 화면으로 돌아가기</p></Link>
    </div>
  )
}

export default Pwfind