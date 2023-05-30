import React from 'react';
import { Link } from 'react-router-dom'


const Dropdown = () => {

    return (
        <div className='dropdown'>
            <ul className='dropdown-ul'>
                <Link to='./'><li className='d1'>🏠</li></Link>
                <Link to='./friends'><li className='d2'>🧑‍🤝‍🧑</li></Link>
                <Link to='./mypage'><li className='d3'>⚙️</li></Link>
                <li className='d4'>🏃🏻</li>
            </ul>
        </div>
    )
}

export default Dropdown;