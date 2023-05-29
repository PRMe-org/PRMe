import React from 'react';
import Piechart from '../components/Piechart';

// labels: ['외향형', '내향형', '감각형', '직관형', '사고형', '감정형', '인식형', '판단형'],


// ----------------------------------------------------------

const Home = () => {
  const imgUrl = '/images/default.svg';

  return (
    <div className='home'>

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
  )
}

export default Home;