import React, { useState, useEffect } from 'react';
import Result from '../components/Result';
import axios from 'axios';

const Test = () => {
  const server = 'http://localhost:3002';

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 20;
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [progressWidth, setProgressWidth] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
  const questions = [
    "1. ISTJ 인가요?",
    "2. ISFJ 인가요?",
    "3. INFJ 인가요?",
    "4. INTJ 인가요?",
    "5. ISTP 인가요?",
    "6. ISFP 인가요?",
    "7. INFP 인가요?",
    "8. INTP 인가요?",
    "9. ESTP 인가요?",
    "10. ESFP 인가요?",
    "11. ENFP인가요?",
    "12. ENTP 인가요?",
    "13. ESTJ 인가요?",
    "14. ESFJ 인가요?",
    "15. ENFJ 인가요?",
    "16. ENTJ 인가요?",
    "17. E (O X) 질문입니다",
    "18. N (O X) 질문입니다?",
    "19. F (O X) 질문입니다",
    "20. J (O X) 질문입니다",
  ];

  // 다음 질문으로
  const handleNext = () => {
    if (selectedOptions[currentQuestion - 1] !== undefined && currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  // 이전 질문으로
  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // 선택한 결과를 배열로 만들기
  const handleOptionChange = (e) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestion - 1] = e.target.value; // select한 결과를 배열로
    setSelectedOptions(updatedOptions); // select한 결과 저장

    return updatedOptions; // myTestSave에 배열 전달을 위해 반환
  };

  // 결과 DB 저장 요청
  const myTestSave = () => {
    const event = { target: // handleOptionChange()함수를 그냥 호출 할 시 배열의 마지막 원소가 출력되지 않는 오류 수정을 위한 코드
      { value: selectedOptions[currentQuestion - 1] || '' } 
    }; 
    const result = handleOptionChange(event); // 함수를 호출하여 배열 받기
    axios
    .get(`${ server }/home/test`, {
      params: {
        result: result,
      },
    })
    .then(response => {
      alert("요청 성공");
      console.log(response.data);
      handleResult();
    })
    .catch(error => {
      alert("실패했어요");
      console.log('실패했어요:', error.response);
    })
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
      {showResult ? (
        <Result selectedOptions={selectedOptions} questions={questions} />
      ) : (      <div className='test-content'>
        <div className='test-content-top'>
          <div className="progress-bar">
            <div className="progress-bar-full" style={{ width: `${progressWidth}%` }}></div>
          </div>
          <div className='progress-bar-text'>{currentQuestion.toString().padStart(2, '0')}/{totalQuestions}</div>
        </div>

        <div className='test-box'>
        <div className='test-title'>{currentQuestionText}</div>

        <form className='test-select'>
          {currentQuestion <= 16 ? (
            <>
              <input
                type="radio"
                name="option"
                id='yes'
                value="2"
                checked={selectedOption === "2"}
                onChange={handleOptionChange}
              />
              <label htmlFor="yes">○</label>

              <input
                type="radio"
                name="option"
                id='soso'
                value="1"
                checked={selectedOption === "1"}
                onChange={handleOptionChange}
              />
              <label htmlFor="soso">△</label>

              <input
                type="radio"
                name="option"
                id='no'
                value="0"
                checked={selectedOption === "0"}
                onChange={handleOptionChange}
              />
              <label htmlFor="no">X</label>
            </>
            ) : (
            <>
              <input
                type="radio"
                name="option"
                id='yes'
                value="0.5"
                checked={selectedOption === "0.5"}
                onChange={handleOptionChange}
              />
              <label htmlFor="yes">○</label>

              <input
                type="radio"
                name="option"
                id='no'
                value="0"
                checked={selectedOption === "0"}
                onChange={handleOptionChange}
              />
              <label htmlFor="no">X</label>
            </>
          )}
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
              onClick={ myTestSave }
              disabled={selectedOption === undefined}
            >
              테스트 결과 보기
            </button>
          )}
        </div>
      </div>
      )}
    </div>
  );
};

export default Test;