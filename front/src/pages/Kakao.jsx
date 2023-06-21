import React, { useEffect } from 'react';

const Kakao = () => {

  useEffect (() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get("code"); // code=인가코드
    const grant_type = "authorization_code";
    const client_id = "a29a3d743f55295b46cbfb49ba08a3ce";
    const REDIRECT_URL = "http://localhost:3000/kakao";
  })

  // 블로그https://velog.io/@adguy/%EC%B9%B4%EC%B9%B4%EC%98%A4-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84web%EC%9A%B0%EB%A6%AC%EB%82%98%EB%9D%BC%EC%97%90%EC%84%9C-%EA%B0%80%EC%9E%A5-%EC%89%BD%EA%B2%8C-%EC%95%8C%EB%A0%A4%EC%A3%BC%EA%B8%B0React-restAPI-%EB%B0%A9%EC%8B%9D
  //보면서 axios.post부터..


    // kakao?code=인가 코드에서 인가코드만 console에 출력
    // const code = new URL(window.location.href).searchParams.get("code");
    // console.log(code)  

  return (
    <div>kakao login</div>
    // if 카카오 로그인이 성공한다면 /home으로 navigate하면 되지 않을까..
  )
}

export default Kakao