import React, { useState }  from 'react'
import Modal2 from '../components/Modal2';


const Mypage = () => {
  const imgUrl = '/images/default.svg';
  const modal_text = '정말 탈퇴하시겠습니까?'; 
  const modal_emoji = '😭';

  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className='mypage'>
      <div className='mypage-content'>
        
        <div className='mypage-content-top'>
          <div className='profile-hover'>+</div>
          <div className='profile' id='mypage-prorile'>
            <img src={imgUrl} className='default'/>
          </div>
          <div className='mypage-settings'>
          <div className={`mypage-settings-title ${window.innerWidth <= 768 ? 'hide-title' : ''}`}>기본 정보</div>

            <div className='mypage-setting1'>
              <div className='mypage-subtitle'>닉네임</div>
              <input type="text" placeholder='피알미'/>
            </div>

            <div className='mypage-setting2'>
              <div className='mypage-subtitle'>이메일</div>
              <div className='mypage-fixed'>example@gmail.com</div>
            </div>

            <div className='mypage-setting3'>
              <div className='mypage-subtitle'>검사일</div>
              <div className='mypage-fixed'>2023.05.30</div>
            </div>

          </div>
        </div>

        <div className='delete-save'>
          <button onClick={ openModal } className='mypage-delete'>탈퇴하기</button>
          <button className='mypage-save'>저장하기</button>
        </div>
      </div>

      <div className='mypage-buttons'>
        <button>테스트 결과 보기</button>
        <button id='retry'>테스트 다시 하기</button>
      </div>

      <Modal2 open={modalOpen} close={closeModal} header="모달 제목">
        <span id='modal-text'> { modal_text } </span>
        <span id='modal-emoji'> { modal_emoji } </span>
      </Modal2>
    </div>
  )
}

export default Mypage;