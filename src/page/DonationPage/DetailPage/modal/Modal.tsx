import styles from './Modal.module.scss'
import React, { useState } from 'react';
import { useUser } from '../../../../contexts/UserProvider';
import api from '../../../../api/api';
import { useNavigate } from 'react-router-dom';
import { formatNumberWithCommas } from '../../../../utils/fomatNumberWithCommas';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal = ({isOpen, onClose}:ModalProps) => {

    const {user} = useUser();
    const [points, setPoints] = useState(0); //기부 포인트
    const navigate = useNavigate();

    const handlePointChane = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPoints(Number(e.target.value));
    }

    const fetchDonationPoint = async() => {
        if(!user){
            navigate('/login');
        }

        if (points <= 0) {
            alert('포인트를 선택해주세요!');
            return;
        }
        
        if(points !== null){
            try {
                await api.post('/api/donation', {points});
                alert('기부가 성공적으로 완료되었습니다!');
                onClose();
            } catch (error) {
                console.log('기부가 실패했습니다!',error);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
                <div className={styles.modal_text}>
                    <h1>후원 금액(포인트)</h1>
                    <p>※ 원하시는 금액을 선택해주세요</p>
                </div>
                {user && (
                    <p className={styles.userpoint}>보유 포인트 {formatNumberWithCommas(user?.totalPoint)} P</p>
                )}
                <div className={styles.select_button}>
                    <label>
                        <input 
                            name='supportRadio'
                            type='radio'
                            value={1000}
                            checked={points === 1000}
                            className={styles.input}
                            onChange={handlePointChane}
                        />
                        <div className={styles.inputRadio}>
                            <span>1,000</span>
                        </div>
                    </label>
                    <label>
                        <input 
                            name='supportRadio'
                            type='radio'
                            value={3000}
                            checked={points === 3000}
                            className={styles.input}
                            onChange={handlePointChane}
                        />
                        <div className={styles.inputRadio}>
                            <span>3,000</span>
                        </div>
                    </label>
                    <label>
                        <input 
                            name='supportRadio'
                            type='radio'
                            value={5000}
                            checked={points === 5000}
                            className={styles.input}
                            onChange={handlePointChane}
                        />
                        <div className={styles.inputRadio}>
                            <span>5,000</span>
                        </div>
                    </label>
                    <label>
                        <input 
                            name='supportRadio'
                            type='radio'
                            value={10000}
                            checked={points === 10000}
                            className={styles.input}
                            onChange={handlePointChane}
                        />
                        <div className={styles.inputRadio}>
                            <span>10,000</span>
                        </div>
                    </label>
                    <label>
                        <input 
                            name='supportRadio'
                            type='radio'
                            value={30000}
                            checked={points === 30000}
                            className={styles.input}
                            onChange={handlePointChane}
                        />
                        <div className={styles.inputRadio}>
                            <span>30,000</span>
                        </div>
                    </label>
                    <label>
                        <input 
                            name='supportRadio'
                            type='radio'
                            value={50000}
                            checked={points === 50000}
                            className={styles.input}
                            onChange={handlePointChane}
                        />
                        <div className={styles.inputRadio}>
                            <span>50,000</span>
                        </div>
                    </label>
                </div>
                
                <hr></hr>

                <div className={styles.donation_amount}>
                    <span>총 기부금액</span>
                    <p>{points !== null ? `${points.toLocaleString()} 원` : '0 원'}</p>
                </div>
                <div className={styles.modal_button}>
                    <button className={styles.closebutton} onClick={onClose}>닫기</button>
                    <button className={styles.confirmbutton} onClick={fetchDonationPoint}>{!user ? '로그인' : '확인'}</button>
                </div>
            </div>
        </div>
    )
}

export default Modal