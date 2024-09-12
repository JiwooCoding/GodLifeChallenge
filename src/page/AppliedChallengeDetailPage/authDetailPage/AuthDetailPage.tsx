import React from 'react'
import { challenges } from '../../../data/challengeData'
import { useLocation } from 'react-router-dom'

const AuthDetailPage = () => {

    const location = useLocation();
    const {record} = location.state || {};

    if(!record) {
        return <p>상세데이터가 없습니다</p>
    }
    return (
        <div>
            <h1>인증샷 상세</h1>
            <img src={record.image} alt="인증샷" />
            <p>날짜: {record.checkDate.toString()}</p>
            <p>상태: {record.status}</p>
            <p>설명: {record.description}</p>
        </div>
    )
}

export default AuthDetailPage