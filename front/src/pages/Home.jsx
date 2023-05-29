import React, { useRef, useState } from 'react';
import Piechart from '../components/Piechart';



// ----------------------------------------------------------

const Home = () => {
  const imgUrl = '/images/default.svg';

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
            <div className='tag-text-others'>피알미 입니다🎶</div>
          </div>
        </div>

        <div className='two'>
          <div className='me-think'>
            <p>내가 생각하는 내 성격</p>
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
        <button className='copy'>URL 복사하기</button>
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

    </div>
  )
}

export default Home;