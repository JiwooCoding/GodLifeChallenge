import styles from './Modal.module.scss';
import React, { useState, useEffect } from 'react';
import { useUser } from '../../../../contexts/UserProvider';
import api from '../../../../api/api';
import { useNavigate } from 'react-router-dom';
import { formatNumberWithCommas } from '../../../../utils/fomatNumberWithCommas';
import useDonationData from '../../../../hooks/useDonationData';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedDonationId: string | null; 
}

const Modal = ({ isOpen, onClose, selectedDonationId }: ModalProps) => {

    const [points, setPoints] = useState(0);
    const [localDonationId, setLocalDonationId] = useState<string | null>(null);

    const { user } = useUser();
    const {goal, donationAmounts} = useDonationData();
    const navigate = useNavigate();
    

    useEffect(() => {
        const storedId = localStorage.getItem('selectedDonationId');
        setLocalDonationId(storedId);
    }, []);


    const handlePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPoints(Number(e.target.value));
    };

    const fetchDonationPoint = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (points <= 0) {
            alert('포인트를 선택해주세요!');
            return;
        }

        // 선택된 기부 대상 ID가 없거나 유효하지 않은 경우 처리
        const donationId = selectedDonationId || localDonationId;
        if (donationId && points !== null) {
            const remainingAmount = goal - (donationAmounts[donationId] || 0);

            if(points > remainingAmount){
                alert(`목표금액까지 남은 금액 ${remainingAmount.toLocaleString()}원을 초과할 수 없습니다!`);
                return;
            }

            try {
                await api.post('/api/donation', { id: donationId, points });
                alert('기부가 성공적으로 완료되었습니다!');
                onClose();
            } catch (error) {
                console.log('기부가 실패했습니다!', error);
            }
        } else {
            alert('기부 대상을 선택해주세요!');
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
                    <p className={styles.userpoint}>보유 포인트 {formatNumberWithCommas(user.totalPoint)} P</p>
                )}
                <div className={styles.select_button}>
                    <label>
                        <input 
                            name='supportRadio'
                            type='radio'
                            value={1000}
                            checked={points === 1000}
                            className={styles.input}
                            onChange={handlePointChange}
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
                            onChange={handlePointChange}
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
                            onChange={handlePointChange}
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
                            onChange={handlePointChange}
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
                            onChange={handlePointChange}
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
                            onChange={handlePointChange}
                        />
                        <div className={styles.inputRadio}>
                            <span>50,000</span>
                        </div>
                    </label>
                </div>
                
                <hr />

                <div className={styles.donation_amount}>
                    <span>총 기부금액</span>
                    <p>{points !== null ? `${points.toLocaleString()} 원` : '0 원'}</p>
                </div>
                <div className={styles.modal_button}>
                    <button className={styles.closebutton} onClick={onClose}>닫기</button>
                    <button className={styles.confirmbutton} onClick={fetchDonationPoint}>
                        {!user ? '로그인' : '확인'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
