import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Piechart from '../components/Piechart';
import Modal from '../components/Modal';
import axios from 'axios';

import { useDispatch } from "react-redux";
import { bindActionCreators as userAction } from "../../node_modules/redux/lib/redux";
// import { response } from 'express';
// redux/modules/user
const Home = (props) => {

  // 카카오톡 로그인 시
  // home/인가코드 형식으로 url 발급됨
    // 인가코드 콘솔에 출력하는 법
    // const code = new URL(window.location.href).searchParams.get("code");
    // console.log(code)    

  // useEffect 훅 안에 kakaoAccessT를 넣어두면 컴포넌트가 처음
  // 마운트 될 때 한 번만 실행되도록 할 수 있다.
  // useEffect(() => {
  //   const kakaoAccessT = async () => {
  //     const code = new URL(window.location.href).searchParams.get("code");
  //     if (code) {
  //       try {
  //         const response = await axios.get(`${server2}/home?code=${code}`);
  //         console.log(response.data);
  //       } catch (error) {
  //         console.log('실패:', error.response);
  //       }
  //     }
  //   };
  
  //   kakaoAccessT();
  // }, []);

  // const server2 = 'http://localhost:3000';
  const server = 'http://localhost:3002';
  const Navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const nicknamesRef = useRef(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartX(event.clientX - nicknamesRef.current.offsetLeft);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    event.preventDefault();
    const x = event.clientX - nicknamesRef.current.offsetLeft;
    const scroll = x - startX;
    nicknamesRef.current.scrollLeft = scrollLeft - scroll;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setScrollLeft(nicknamesRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  /* ------------------ 결과 데이터 Home에 띄우는 요청 ------------------ */
  const [E, setE] = useState('');
  const [I, setI] = useState('');
  const [N, setN] = useState('');
  const [S, setS] = useState('');
  const [F, setF] = useState('');
  const [T, setT] = useState('');
  const [P, setP] = useState('');
  const [J, setJ] = useState('');

  const home = () => {
    axios
    .get(`${ server }/home`, {
       withCredentials: true,
    })
    .then(response => {
      setE(response.data.E);
      setI(response.data.I);
      setN(response.data.N);
      setS(response.data.S);
      setF(response.data.F);
      setT(response.data.T);
      setP(response.data.P);
      setJ(response.data.J);
    })
    .catch(error => {
      console.log('실패했어요:', error.response);
    })
  };
  
  let EnI;
  let NnS;
  let FnT;
  let PnJ;
  if(E > I){ EnI = E; }else{ EnI = I; };
  if(N > S){ NnS = N; }else{ NnS = S; };
  if(F > T){ FnT = F; }else{ FnT = T; };
  if(P > J){ PnJ = P; }else{ PnJ = J; };

  let krEnI;
  let krNnS;
  let krFnT;
  let krPnJ;
  if(E > I){ krEnI = '외향형'; }else{ krEnI = '내향형'; };
  if(N > S){ krNnS = '직관형'; }else{ krNnS = '감각형'; };
  if(F > T){ krFnT = '감정형'; }else{ krFnT = '사고형'; };
  if(P > J){ krPnJ = '인식형'; }else{ krPnJ = '판단형'; };

  
   /* ------------------ url 복사 ------------------ */
  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    openModal(); // 모달 열기
  };
 
  // 모달 - 변수
  const imgUrl = '/images/default.svg';
  const modal_text = 'url이 복사되었어요!'; 
  const modal_emoji = '📑';

  // 모달 - on/off
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

   /* ------------------ jwt 인증 ------------------ */
  const accessT = () => {
    axios
    .get(`${ server }/accessT`, {
       withCredentials: true, // 요청 시 쿠키를 포함
    })
    .then(response => {
      if(response.data === 'TokenExpiredError'){ // accessToken 만료 시
        refreshT(); // 토큰 재발행
      } else {
        setUserName(response.data.name);
      }
    })
    .catch(error => {
      console.log('실패했어요:', error.response);
    })
  };

  // 토큰 재발행
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

       setUserName(response.data.name);
      }     
    })
    .catch(error => {
      console.log('실패했어요:', error.response);
    })
  };

   /* ------------------ 페이지 첫 실행 ------------------ */
  useEffect(() => {
    if(document.cookie){ // 쿠키가 존재하는 경우
      accessT(); // accessToken 인증 검사
      home()
    } else {
      Navigate('/login') // 로그인 이동
    }
  }, []);


  return (
    <div className='home'>

      <div className='home-content'>
        <div className='one'>
          <div className='profile'>
            <img src={imgUrl} className='default'/>
          </div>
          <div className='tag-texts'>
            <div className='tag-text'>
              <div className='keyword1'>열정적</div>이고&nbsp;
              <div className='keyword2'>즉흥적</div>인
            </div>
            <div className='tag-text-others'>{ userName } 입니다🎶</div>
          </div>
        </div>

        <div className='two'>
          <div className='me-think'>
            <p>내가 생각하는 내 성격</p>
            <table>
              <thead>
                <tr>
                  <th>{ krEnI }</th>
                  <th>{ krNnS }</th>
                  <th>{ krFnT }</th>
                  <th>{ krPnJ }</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{ EnI }</td>
                  <td>{ NnS }</td>
                  <td>{ FnT }</td>
                  <td>{ PnJ }</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className='friend-think'>
          <p>친구가 생각하는 내 성격</p>
            <table>
            <thead>
                <tr>
                  <th>외향적</th>
                  <th>직관적</th>
                  <th>직관적</th>
                  <th>판단형</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className='three'>
          <p className='chart-title'>내 성격은?!</p>
          <Piechart />
        </div>
      </div>

      <div className='home-buttons'>
        <button className='share'>카카오톡 공유하기</button>
        <button className='copy' onClick={ copyUrl }>URL 복사하기</button>
        <button className='print'>프린트하기</button>
      </div>

      <div className='participants'>
        <p>12명이 참여해줬어요!</p>
        <div 
          className='nicknames'
          ref={nicknamesRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <button className='nick1'>hongsebin</button>
          <button className='nick1'>윤다빈</button>
          <button className='nick1'>홍세빈</button>
          <button className='nick1'>yoondabin</button>
          <button className='nick1'>홍세빈</button>
          <button className='nick1'>윤다빈</button>
          <button className='nick1'>홍세빈</button>
          <button className='nick1'>윤다빈</button>
          <button className='nick1'>홍세빈</button>
          <button className='nick1'>윤다빈</button>
          <button className='nick1'>홍세빈</button>
          <button className='nick1'>윤다빈</button>
        </div>
      </div>


      <Modal open={ modalOpen } close={ closeModal } header="모달 제목">
        <span id='modal-text'> { modal_text } </span>
        <span id='modal-emoji'> { modal_emoji } </span>
      </Modal>

    </div>
  )
}

export default Home;