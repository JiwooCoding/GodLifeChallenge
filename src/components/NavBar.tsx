import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
    <div className='navbar'>
        <div className='nav_inner'>
        <div className='flex justify-between'>
            <div className='flex'>
                <Link to={'/product'} className='navbar_left'>쇼핑</Link>
                <Link to={'/point'} className='navbar_left'>이벤트</Link>
                <h2 className='navbar_left'>업로드</h2> 
                {/* 업로드는 기업 회원한테만 보이도록 설정해야 함 */}
            </div>
            <div className='flex'>
                <h3 className='navbar_right'>로그인</h3>
                <h3 className='navbar_right'>로그아웃</h3>
                <h3 className='navbar_right'>회원가입</h3>
            </div>
        </div>
        </div>
    </div>
    )
}

export default NavBar