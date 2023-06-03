import React, { useState, useEffect } from 'react';
import Result from '../components/Result';

const Test = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 20;
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [progressWidth, setProgressWidth] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
  const questions = [
    "1. 피알미 성격 테스트 질문입니다.",
    "2. 다음 질문입니다.",
    "3. 다음 질문입니다.",
    "4. 다음 질문입니다.",
    "5. 다음 질문입니다.",
    "6. 다음 질문입니다.",
    "7. 다음 질문입니다.",
    "8. 다음 질문입니다.",
    "9. 다음 질문입니다.",
    "10. 다음 질문입니다.",
    "11. 피알미 성격 테스트 질문입니다.",
    "12. 다음 질문입니다.",
    "13. 다음 질문입니다.",
    "14. 다음 질문입니다.",
    "15. 다음 질문입니다.",
    "16. 다음 질문입니다.",
    "17. 다음 질문입니다.",
    "18. 다음 질문입니다.",
    "19. 다음 질문입니다.",
    "20. 다음 질문입니다.",
  ];

  const handleNext = () => {
    if (selectedOptions[currentQuestion - 1] !== undefined && currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleOptionChange = (e) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestion - 1] = e.target.value;
    setSelectedOptions(updatedOptions);
  };

  const handleResult = () => {
    // 결과 보기 버튼을 클릭했을 때의 동작을 처리.
    setShowResult(true);
  };

  useEffect(() => {
    const width = ((currentQuestion - 1) / (totalQuestions - 1)) * 95 + 5;
    setProgressWidth(width);
  }, [currentQuestion, totalQuestions]);

  const currentQuestionText = questions[currentQuestion - 1];
  const selectedOption = selectedOptions[currentQuestion - 1];

  return (
    <div className='test'>
      <div className='test-content'>
        <div className='test-content-top'>
          <div className="progress-bar">
            <div className="progress-bar-full" style={{ width: `${progressWidth}%` }}></div>
          </div>
          <div className='progress-bar-text'>{currentQuestion.toString().padStart(2, '0')}/{totalQuestions}</div>
        </div>

        <div className='test-box'>
          <div className='test-title'>{currentQuestionText}</div>

          <form className='test-select'>
            <input
              type="radio"
              name="option"
              id='yes'
              value="yes"
              checked={selectedOption === "yes"}
              onChange={handleOptionChange}
            />
            <label htmlFor="yes">○</label>

            <input
              type="radio"
              name="option"
              id='soso'
              value="soso"
              checked={selectedOption === "soso"}
              onChange={handleOptionChange}
            />
            <label htmlFor="soso">△</label>

            <input
              type="radio"
              name="option"
              id='no'
              value="no"
              checked={selectedOption === "no"}
              onChange={handleOptionChange}
            />
            <label htmlFor="no">X</label>
          </form>
        </div>

        <div className='test-buttons'>
          {currentQuestion !== 1 ? (
            <button className='test-button-prev' onClick={handlePrevious}>이전</button>
          ) : (
            <button className='test-button-none' onClick={handlePrevious}></button>
          )}
          {currentQuestion !== totalQuestions ? (
            <button
              className={`test-button-next${selectedOption === undefined ? ' test-button-next-disabled' : ''}`}
              onClick={handleNext}
              disabled={selectedOption === undefined}
            >
              다음
            </button>
          ) : (
            <button
              className={`test-button-result${selectedOption === undefined ? ' test-button-result-disabled' : ''}`}
              onClick={handleResult}
              disabled={selectedOption === undefined}
            >
              테스트 결과 보기
            </button>
          )}
        </div>
      </div>
      {showResult && (
        <Result selectedOptions={selectedOptions} questions={questions} />
      )}
    </div>
  );
};

export default Test;