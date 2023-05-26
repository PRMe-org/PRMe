import React from 'react'

const Home = () => {
  return (
    <div className='home'>

      <div className='one'>
        <span className='profile'>
          <img src="" alt="" />
        </span>
        <span className='tag-text'>
          열정적이고 즉흥적인 피알미 입니다.
        </span>
      </div>

      <div className='two'>
        <div className='me-think'>
          <p>내가 생각하는 내 성격</p>
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
            <tr>
              <td>5</td>
              <td>6</td>
              <td>7</td>
              <td>8</td>
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
            <tr>
              <td>5</td>
              <td>6</td>
              <td>7</td>
              <td>8</td>
            </tr>
          </table>
        </div>
      </div>

      <div className='three'>
        <p>내 성격은?!</p>
      </div>

    </div>
  )
}

export default Home