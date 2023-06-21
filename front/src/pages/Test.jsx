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
  const[username, setUserName] = useState('');
  
  const questions = [
    `1. ${ username }님은 책임감 있는 사람인가요? (ISTJ)`,
    `2. ${ username }님은 성실하고 사람들과 협동을 잘하는 사람인가요? (ISFJ)`,
    `3. ${ username }님은 사람에 대해 뛰어난 통찰력을 가진 사람인가요? (INFJ)`,
    `4. ${ username }님은 독립적이며 혼자서 행동하는 일을 두려워하지 않는 편인가요? (INTJ)`,
    `5. ${ username }님은 낯선 상황에도 적응력이 뛰어난 사람인가요? (ISTP)`,
    `6. ${ username }님은 마음이 따듯하고 겸손한 사람인가요? (ISFP)`,
    `7. ${ username }님은 상대방의 이야기를 경청하는 사람인가요? (INFP)`,
    `8. ${ username }님은 불공평한 일을 마주했을 때 해결책을 제시하는 사람인가요? (INTP)`,
    `9. ${ username }님은 돌직구를 잘던지는 편인가요? (ESTP)`,
    `10. ${ username }님은 모임에서 분위기를 띄우는 사람인가요? (ESFP)`,
    `11. ${ username }님은 새로운 친구 사귀는걸 좋아합니까? (ENFP)`,
    `12. ${ username }님은 논쟁하기를 좋아합니까? (ENTP)`,
    `13. ${ username }님은 사무적이고, 현실적인 스타일입니까? (ESTJ)`,
    `14. ${ username }님은 타인에게 봉사를 하는 편입니까? (ESFJ)`,
    `15. ${ username }님은 공감능력이 좋고 고민상담을 잘해주는 편입니까?(ENFJ)`,
    `16. ${ username }님은 팀플 할 때 자기 계획대로 직접 이끌어야 직성이 풀리는 편입니까? (ENTJ)`,
    `17. ${ username }님 E (O X) 질문입니다`,
    `18. ${ username }님 N (O X) 질문입니다?`,
    `19. ${ username }님 F (O X) 질문입니다`,
    `20. ${ username }님 J (O X) 질문입니다`,  
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

  /* ------------------ 테스트 결과 저장 요청 ------------------ */
  const myTestSave = () => {
    // handleOptionChange()호출 시 배열 마지막 원소가 출력되지 않는 오류 수정을 위한 코드
    const event = { target: 
      { value: selectedOptions[currentQuestion - 1] || '' } 
    }; 
    const result = handleOptionChange(event); // 배열 받기

    // 테스트 결과 insert 요청
    axios
    .get(`${ server }/home/test`, { 
      params: { result: result, },
      withCredentials: true, 
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

   /* ------------------ 결과 보기 동작 ------------------ */
  const handleResult = () => {
    setShowResult(true);
  };

  /* ------------------ 페이지 첫 실행 ------------------ */
  useEffect(() => {
    const width = ((currentQuestion - 1) / (totalQuestions - 1)) * 95 + 5;
    setProgressWidth(width);
  }, [currentQuestion, totalQuestions]);

  const currentQuestionText = questions[currentQuestion - 1];
  const selectedOption = selectedOptions[currentQuestion - 1];
  /* ---------------------------------------------------- */


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