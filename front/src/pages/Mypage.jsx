import React, { useState, useEffect }  from 'react';
import { useNavigate } from 'react-router-dom';
import Modal2 from '../components/Modal2';
import axios from 'axios';

const Mypage = () => {
  const server = 'http://localhost:3002';
  
  const Navigate = useNavigate();
  
  const imgUrl = '/images/default.svg';
  const modal_text = '정말 탈퇴하시겠습니까?'; 
  const modal_emoji = '😭';
  
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userDate, setUserDate] =useState('');
  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

   // accessToken 인증
   const accessT = () => {
    axios
    .get(`${ server }/accessT`, {
       withCredentials: true, // 요청 시 쿠키를 포함
    })
    .then(response => {
      if(response.data === 'TokenExpiredError'){ // accessToken 만료 시
        refreshT(); // 토큰 재발행
      } else {
        setUserEmail(response.data.email);
        setUserName(response.data.name);
        let date = response.data.date;
        setUserDate(date.split('T')[0]); // YYYY-MM-DD
      }
    })
    .catch(error => {
      console.log('실패했어요:', error.response);
    })
  };

  // refreshToken으로 accessToken 재발행
  const refreshT = () => {
    axios
    .get(`${ server }/refreshT`, {
       withCredentials: true, // 요청 시 쿠키를 포함
    })
    .then(response => {
      // accessToken 갱신완료 시
      if(JSON.stringify(response.data.isLogin) === '"성공"'){
        // 서버로부터 토큰을 받아서 쿠키에 저장
       const accessToken = response.data.accesstoken;
       const refreshToken = response.data.refreshtoken;
       // 쿠키에 토큰 저장
       document.cookie = `accessToken=${ accessToken }; path=/;`
       document.cookie = `refreshToken=${ refreshToken }; path=/;`

       setUserEmail(response.data.email);
       setUserName(response.data.name);
       let date = response.data.date;
       setUserDate(date.split('T')[0]); // YYYY-MM-DD
      }     
    })
    .catch(error => {
      console.log('실패했어요:', error.response);
    })
  };

  // 컴포넌트가 처음 마운트되었을 때 실행(처음 한번만)
  useEffect(() => {
    if(document.cookie){ // 쿠키가 존재하는 경우
      accessT(); // accessToken 인증 검사
    } else {
      Navigate('/login') // 로그인으로 이동
    }
  }, []);

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
              <input type="text" placeholder={ userName }/>
            </div>

            <div className='mypage-setting2'>
              <div className='mypage-subtitle'>이메일</div>
              <div className='mypage-fixed'>{ userEmail }</div>
            </div>

            <div className='mypage-setting3'>
              <div className='mypage-subtitle'>검사일</div>
              <div className='mypage-fixed'>{ userDate }(*가입날짜로 되어있음 수정요망)</div>
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