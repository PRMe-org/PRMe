import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Dropdown = () => {
    const server = 'http://localhost:3002';
    const Navigate = useNavigate();

    const home = () => { // Home으로 이동
        Navigate('/home');
    };

    const friend = () => {
        Navigate('/home/friends');
    };

    const mypage = () => {
        Navigate('/home/mypage');
        axios
        .get(`${ server }/home/mypage`, {
            withCredentials: true, // 요청 시 쿠키를 포함
        })
        .then(response => {
            console.log(response.data + "님이 접속 중 입니다.");
        })
        .catch(error => {

        })
    };

    const logout = () => {
        // 로그아웃 (쿠키삭제 예시)
        function deleteCookie(name) {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        Navigate('/');
    };
    

    return (
        <div className='dropdown'>
            <ul className='dropdown-ul'>
                <li className='d1' onClick={ home } style={{ textDecoration: "none" }}>🏠</li>
                <li className='d2' onClick={ friend } style={{ textDecoration: "none" }}>🧑‍🤝‍🧑</li>
                <li className='d3' onClick={ mypage } style={{ textDecoration: "none" }}>⚙️</li>
                <li className='d4' onClick={ logout } style={{ textDecoration: "none" }}>🏃🏻</li>
            </ul>
        </div>
    )
}

export default Dropdown;