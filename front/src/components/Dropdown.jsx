import React from 'react';
import { Link } from 'react-router-dom'


const Dropdown = () => {

    return (
        <div className='dropdown'>
            <ul className='dropdown-ul'>
                <Link to='./' style={{ textDecoration: "none" }}><li className='d1'>🏠</li></Link>
                <Link to='./friends' style={{ textDecoration: "none" }}><li className='d2'>🧑‍🤝‍🧑</li></Link>
                <Link to='./mypage' style={{ textDecoration: "none" }}><li className='d3'>⚙️</li></Link>
                <li className='d4' style={{ textDecoration: "none" }}>🏃🏻</li>
            </ul>
        </div>
    )
}

export default Dropdown;