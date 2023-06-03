import React from 'react'

const Result = ({ selectedOptions, questions }) => {
  const friendResults = questions.map((question, index) => {
    const selectedOption = selectedOptions[index];
    const optionSymbol = selectedOption === "yes" ? "○" : selectedOption === "soso" ? "△" : "X";
    return (
      <div className='friend-results-inner' key={index}>
        <p>{question}</p>
        <p>{optionSymbol}</p>
      </div>
    );
  });

  return (
    <div className='result'>
      <div className='result-content-top'>
        <div className='friend-think'>
          <div className='result-title'>
            <p><div id='friend-name'>김지투</div>님이 생각하는&nbsp; <div id='my-name'>피알미</div>님의 성격은?!</p>
          </div>
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
      <div className='result-content-bottom'>
        <div className='friend-results'>
          {friendResults}
        </div>
      </div>
    </div>
  )
}

export default Result;