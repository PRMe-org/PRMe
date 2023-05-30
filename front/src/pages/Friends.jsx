import React from 'react'

const Friends = () => {
  return (
    <div className='friends'>

      <div className='friends-content'>

        <div className='friends-content-top'>
          <div className='friends-content-title'>
            <div id='friends-name'>김지원</div>
            <div id='friends-others'>님이 보는 내 모습이예요!</div>
          </div>
          <button className='friends-delete'>X</button>
        </div>

        <div className='friends-content-bottom'>
          <div className='friends-tags'>
            <div className='friends-tag1'>#열정적</div>
            <div className='friends-tag2'>#도전적</div>
            <div className='friends-tag3'>#사교적</div>
          </div>
          <div className='friends-date'>2023.05.30</div>
        </div>
      </div>
    </div>
  )
}

export default Friends