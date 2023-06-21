import React, { useEffect } from 'react';
import axios from "axios"

const Kakao = () => {

  useEffect (() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get("code"); // code=인가코드
    const grant_type = "authorization_code";
    const client_id = "a29a3d743f55295b46cbfb49ba08a3ce"; // rest api
    const REDIRECT_URL = "http://localhost:3000/kakao";

    axios.post(
      `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${REDIRECT_URL}&code=${code}`,
      {},
      { headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" } }
    )
      .then((res) => {
        console.log(res);
        const { access_token } = res.data;
      axios.post(
        `https://kapi.kakao.com/v2/user/me`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
        .then((res) => {
          console.log('2번째', res);
          // 액세스 토큰을 서버로 전송
          sendAccessTokenToServer(access_token);
        })
        .catch((error) => {
          console.log('1번에러',error);
        });
    })
    .catch((error) => {
      console.log('2번에러',error);
    });
}, []);


const sendAccessTokenToServer = (access_token) => {
  // 서버로 액세스 토큰을 전송하는 요청
  axios
    .post('/api/kakao-token', { access_token }) // 서버의 적절한 엔드포인트로 변경해야 합니다.
    .then((res) => {
      console.log('액세스 토큰 전송 성공:', res);
    })
    .catch((error) => {
      console.log('액세스 토큰 전송 실패:', error);
    });
};


  return (
    <div>kakao login</div>
    // if 카카오 로그인이 성공한다면 /home으로 navigate하면 되지 않을까..
    // 카카오 로그인이 성공하면 홈페이지로 이동하도록 하면 될 것 같습니다.
    // 예를 들어 <Redirect to="/home" /> 등을 사용하여 리다이렉트할 수 있습니다.
  )
}

export default Kakao