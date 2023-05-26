import React, { useState }  from 'react'
import { Link } from 'react-router-dom'
import Modal from '../components/Modal';

const Pwfind = () => {

  const imgUrl = '/images/smile'+'.png'
  const modal_text = '비밀번호 변경 url을 전송했습니다.\n 메일함을 확인해주세요'; 

  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className='pwfind-welcome'>
      <div className='welcomebox'>
        <img src={imgUrl} className='pwfind-smile'/>
        
        <div className='pwfind-loginbuttons'>
          <input type='text' id='pwfind' name='email' placeholder='피알미에 가입된 이메일을 입력해주세요'></input>
          <button onClick={ openModal } id='login'>비밀번호 변경 url 전송</button>
        </div>

        <Link to='/' style={{ textDecorationLine: 'none' }}>
          <p id='pwforgot'>첫 화면으로 돌아가기</p></Link>
      </div>

      <Modal open={modalOpen} close={closeModal} header="모달 제목">
        { modal_text }
      </Modal>
    </div>

  )
}

export default Pwfind