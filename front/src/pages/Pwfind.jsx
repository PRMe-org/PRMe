import React from 'react'


const Pwfind = () => {

  const imgUrl = '/images/smile'+'.png'

  return (
    <div className='welcome'>
      <img src={imgUrl} className='smile'/>
      
      <div className='loginbuttons'>
        <input type='text' id='pwfind' name='email' placeholder='피알미에 가입된 이메일을 입력해주세요'></input>
        <button id='login'>비밀번호 변경 url 전송</button>

      </div>
    </div>
  )
}

export default Pwfind