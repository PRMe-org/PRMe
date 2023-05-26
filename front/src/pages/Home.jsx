import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['외향형', '내향형', '감각형', '직관형', '사고형', '감정형', '인식형', '판단형'],
  datasets: [
    {
      // label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3, 6, 20],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export const options = {
  plugins: {
    legend: {
      position: 'bottom',
    }
  }
}

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
            <th>외향적</th>
            <th>직관적</th>
            <th>직관적</th>
            <th>판단형</th>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
            </tr>
          </table>
        </div>

        <div className='friend-think'>
        <p>친구가 생각하는 내 성격</p>
          <table>
            <th>외향적</th>
            <th>직관적</th>
            <th>현실적</th>
            <th>계획적</th>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
            </tr>
          </table>
        </div>
      </div>

      <div className='three'>
        <p className='chart-title'>내 성격은?!</p>
        <div className='piechart'>
          <Pie
            data={data}
            options={options}
            width= "30rem"
            height="30rem"
          />
        </div>
      </div>

    </div>
  )
}

export default Home