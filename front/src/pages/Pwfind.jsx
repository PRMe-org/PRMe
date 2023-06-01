import React, { useState }  from 'react'
import { Link } from 'react-router-dom'
import Modal from '../components/Modal';
import axios from 'axios';

const Pwfind = () => {
  const server = 'http://localhost:3002'
  
  // 변수 저장
  const [email, setEmail] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 - (디폴트 false) open일 때 true
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

   // 이메일 요청
   const sendmail = () => {
    axios
    .post(`${ server }/sendmail`, {
      email: email,
    })
    .then((response) => {
      openModal();
      console.log(response.data);
    })
    .catch(error => {
      alert('유효한 이메일 인지 확인해주세요');
      console.log('요청이 실패했어요:', error.response);
    });
  }

  const imgUrl = '/images/smile'+'.png'
  const modal_text = '비밀번호 변경 url을 전송했습니다.\n 메일함을 확인해주세요\n'; 
  const modal_emoji = '📬';

  return (
    <div className='pwfind-welcome'>
      <div className='welcomebox'>
        <img src={ imgUrl } className='pwfind-smile'/>
        
        <div className='pwfind-loginbuttons'>
          <input type='text' id='pwfind' placeholder='피알미에 가입된 이메일을 입력해주세요' 
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />

          <button onClick={ sendmail } id='login'>
            비밀번호 변경 url 전송
          </button>
        </div>

        <Link to='/' style={{ textDecorationLine: 'none' }}>
          <p id='pwforgot'>첫 화면으로 돌아가기</p></Link>
      </div>


      <Modal open={ modalOpen } close={ closeModal } header="모달 제목">
        <span id='modal-text'> { modal_text } </span>
        <span id='modal-emoji'> { modal_emoji } </span>
      </Modal>
    </div>

  )
}

export default Pwfind