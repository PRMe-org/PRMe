import React from 'react';

const Kakao = () => {

    // kakao?code=인가 코드에서 인가코드만 console에 출력
    const code = new URL(window.location.href).searchParams.get("code");
    console.log(code)  

  return (
    <div>kakao login</div>
    
  )
}

export default Kakao