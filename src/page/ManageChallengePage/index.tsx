import React, { useEffect, useState } from 'react'
import { UserChallengeRecord } from '../../type/challengeData';
import api from '../../api/api';
import { useParams } from 'react-router-dom';
import styles from './manageAuthImage/ManageChallengePage.module.scss'
import AuthDateOption from './auth-date-option/AuthDateOption';
import ManageAuthImage from './manageAuthImage/ManageAuthImage';

type RouteParmas = {
    challengeId:string;
}

const ManageAuthPage = () => {

    const [selectedStatus, setSelectedStatus] = useState('');

    const handleStatusChange = (status:string) => {
        setSelectedStatus(status);
    }

    const {challengeId} = useParams<RouteParmas>();
    
    return (
        <div className='page'>
            <div className={styles.managePage}>
                <h1>관리 목록</h1>
                <p>
                    <b>기준에 맞지 않는 유저</b>의 챌린지 인증 사진은 인증 실패로 처리할 수 있습니다.
                </p>
                <ManageAuthImage
                    challengeId={challengeId}
                    selectedStatus={selectedStatus}
                    onStatusChange={handleStatusChange}
                />
            </div>
        </div>
    )
}

export default ManageAuthPage