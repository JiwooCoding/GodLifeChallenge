import { useState } from 'react';
import styles from './GiftPoint.module.scss';
import { useUser } from '../../UserProvider';
import deleteIcon from '../../image/delete.png';
import api from '../../api/api';
import { useAppdispatch } from '../../hooks/redux';
import { closeModal, openModal } from '../../store/modal/modal.slice';
import ConfirmedGiftModal from './modal-content/ConfirmedGiftModal';
import NoUserModal from '../modal/no-user/NoUserModal';

const GiftPoint = () => {

    const { user, setUser } = useUser();
    const dispatch = useAppdispatch();

    const [totalPoint, setTotalPoint] = useState<number>(0); // 총 포인트
    const [customPoint, setCustomPoint] = useState<string>(''); // 커스텀 포인트
    const [recipientId, setRecipientId] = useState(''); // 선물할 유저 id
    const [activeButton, setActiveButton] = useState<number | null>(null);
    const [pointError, setPointError] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [disabled, setDisabled] = useState(false); //버튼 비활성화


    const formatNumberWithCommas = (number: number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleGiftPointChange = (points: number) => {
        const newTotal = totalPoint + points;
        if(user && newTotal > user.totalPoint){
            setPointError('포인트가 부족합니다');
            setDisabled(true);
            return;
        }
        setTotalPoint(newTotal);
        setCustomPoint(formatNumberWithCommas(newTotal));
        setActiveButton(points);
    };

    const handleCustomPointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/,/g, '');
        let numberValue = Number(value);

        if (user && numberValue > user.totalPoint) {
            setPointError('포인트가 부족합니다');
            numberValue = user.totalPoint;  // 보유 포인트로 설정
        } else {
            setPointError('');
            setDisabled(false);
        }

        setCustomPoint(formatNumberWithCommas(numberValue));
        setTotalPoint(numberValue);
        setActiveButton(null);
    };

    const handleRecipientIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRecipientId(e.target.value);
    };

    // 서버로 유저 아이디와 포인트 전송
    const sendGiftPoint = async () => {

        if (!recipientId || totalPoint === 0) {
            alert('아이디와 포인트를 모두 입력해주세요!');
            return;
        }

        if (!user || user.totalPoint < totalPoint) {
            setPointError('포인트가 부족합니다');
            return;
        }

        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await api.post('/points/gift', {
                recipientId,
                points: totalPoint,
                senderId: user.email
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            console.log('포인트 전송 성공');
            alert('포인트가 전송되었습니다!');

            // 유저 포인트 업데이트
            setUser(prevUser => ({
                ...prevUser!,
                points: response.data.senderPoints
            }));

        } catch (error) {
            console.log('포인트 전송 실패', error);
            alert('포인트 전송 실패');
        }
    };

    const deleteNumber = () => {
        setCustomPoint('');
        setTotalPoint(0);
        setActiveButton(null);
    }

    const checkId = async () => {
        try {
            const response = await api.post('/points/check-email', { recipientId });
            if (response.data.email) {
                if (recipientId === user?.email) {
                    setEmailMessage('자신에게는 선물하기가 불가능합니다');
                } else {
                    setEmailMessage('선물하기가 가능한 회원입니다');
                }
            } else {
                setEmailMessage('존재하지 않는 회원입니다. 다시 확인해주세요!');
            }
        } catch (error) {
            console.log('아이디 체크 에러!!', error);
        }
    };

    const handleGiftButtonClick = () => {
        if(!user){
            dispatch(openModal(<NoUserModal/>));
        }else{
            dispatch(openModal(
                <ConfirmedGiftModal
                    onConfirm={sendGiftPoint}
                    onClose={() => dispatch(closeModal())}
                />
            ));
        }
    };


    const handleBlur  = () => {
        if(!emailMessage){
            setEmailMessage('아이디를 확인해주세요')
        }
    }
    
    

    return (
        <div className='page'>
            <div className={styles.giftPage}>
                <h1>선물하기</h1>
                <div className={`${styles.inputbox} ${emailMessage ? styles.inputboxWithMessage : ''}`}>
                    <label htmlFor='id'>아이디</label>
                    <input
                        type='email'
                        placeholder='선물 받을 상대방 아이디 입력'
                        value={recipientId}
                        onChange={handleRecipientIdChange}
                        onBlur={handleBlur}
                    />
                    <button onClick={checkId} className={styles.confirmId}>확인</button>
                </div>
                {emailMessage && <div className={styles.emailMessage}>{emailMessage}</div>}
                <div>
                    <div className={styles.select_button}>
                            {[1000, 5000, 10000].map(points => (
                                <button
                                    key={points}
                                    className={`${styles.button} ${activeButton === points ? styles.active : ''}`}
                                    onClick={() => handleGiftPointChange(points)}
                                >
                                    + {points.toLocaleString()} 포인트
                                </button>
                            ))}
                    </div>
                    {user && (
                        <span className={styles.mypoint}>선물 가능 포인트 {user?.totalPoint}</span>
                    )}
                    <input
                        className={styles.point_input}
                        type='text'
                        placeholder='금액을 입력하세요'
                        value={customPoint}
                        onChange={handleCustomPointChange}
                    />
                    <img src={deleteIcon} onClick={deleteNumber} alt='delete-icon' style={{width:'17px', position:'absolute', bottom:'64px', right:'21px',cursor:'pointer'}}/>
                    {pointError && <p className={styles.errorMessage}>{pointError}</p>}
                </div>
                <button 
                    className={styles.giftButton} 
                    onClick={handleGiftButtonClick}
                    disabled={disabled}
                >
                    선물하기
                </button>
            </div>
        </div>
    );
};

export default GiftPoint;
