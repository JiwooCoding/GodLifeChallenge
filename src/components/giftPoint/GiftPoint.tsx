import { useState } from 'react';
import { useForm } from 'react-hook-form'; 
import styles from './GiftPoint.module.scss';
import { useUser } from '../../contexts/UserProvider';
import deleteIcon from '../../image/delete.png';
import api from '../../api/api';
import { formatNumberWithCommas } from '../../utils/fomatNumberWithCommas';
import Button from '../button/Button';
import { useModal } from '../../contexts/ModalProvider';
import Modal from '../modal';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const GiftPoint = () => {

    const { user, setUser } = useUser();
    const {isOpen, closeModal, openModal} = useModal();

    const { register, setValue, watch, clearErrors, formState: { errors }, reset } = useForm({
        defaultValues: {
            recipientId: '',
            customPoint: '0',
        },
    });

    const navigate = useNavigate();

    const giftPoint = watch('customPoint') ? parseInt(watch('customPoint').replace(/,/g, '')) : 0;
    const recipientId = watch('recipientId');

    const [activeButton, setActiveButton] = useState<number | null>(null);
    const [emailMessage, setEmailMessage] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [emailChecked, setEmailChecked] = useState(false);


    const handleGiftPointChange = (points: number) => {
        const newTotal = giftPoint + points;
        if (user && newTotal > user.totalPoint) {
            setDisabled(true);
            return;
        }
        setValue('customPoint', formatNumberWithCommas(newTotal));
        setActiveButton(points);
    };


    const handleCustomPointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/,/g, '');
        let numberValue = Number(value);

        if (user && numberValue > user.totalPoint) {
            numberValue = user.totalPoint;
            setDisabled(true);
        } else {
            clearErrors('customPoint');
            setDisabled(false);
        }
        setValue('customPoint', formatNumberWithCommas(numberValue));
        setActiveButton(null);
    };


    const checkId = async () => {
        try {
            // API 요청을 보낼 때 email 파라미터로 recipientId를 전달
            const response = await api.post('/api/points/check-email', null, {
                params: { email: recipientId }
            });
            if (response.data) {  
                if (recipientId === user?.email) {
                    setEmailMessage('자신에게는 선물하기가 불가능합니다');
                    setEmailChecked(false);
                } else {
                    setEmailMessage('선물하기가 가능한 회원입니다');
                    setEmailChecked(true);
                }
            } else {
                setEmailMessage('존재하지 않는 회원입니다. 다시 확인해주세요.');
                setEmailChecked(false);
            }
        } catch (error) {
            console.error('아이디 체크 에러:', error);
            setEmailMessage('아이디 확인 중 문제가 발생했습니다. 다시 시도해주세요.');
            setEmailChecked(false);
        }
    };


    const sendGiftPoint = async () => {
        if (!recipientId.trim()) {
            setEmailMessage('아이디를 입력해주세요.');
            return;
        }

        try {
            await api.post('/api/points/gift', {
                recipientId,
                points: giftPoint,
                senderId: user!.email,
            });
            toast.success('포인트가 전송되었습니다!');
            // 유저 포인트 업데이트
            setUser(prevUser => ({
                ...prevUser!,
                totalPoint: prevUser!.totalPoint - giftPoint,
            }));
            closeModal();
            setActiveButton(null); // 선택된 버튼 초기화
            setEmailMessage(''); // 이메일 메시지 초기화
            setEmailChecked(false); // 이메일 확인 상태 초기화
            reset();
        } catch (error) {
            console.log('포인트 전송 실패', error);
            toast.error('포인트 전송 실패');
        }
    };


    const deleteNumber = () => {
        setValue('customPoint', '');
        setActiveButton(null);
    };


    const handleGiftButtonClick = () => {
        if (!recipientId || giftPoint === 0) {
            alert('아이디 혹은 포인트를 모두 입력해주세요!');
            return;
        }

        if(!emailChecked){
            alert('이메일 확인을 해주세요');
            return;
        }
        openModal();
    };



    return (
        <>
            <div className='page'>
                <div className={styles.giftPage}>
                    <h1>선물하기</h1>
                    <div className={`${styles.inputbox} ${emailMessage ? styles.inputboxWithMessage : ''}`}>
                        <label htmlFor='id'>아이디</label>
                        <input
                            type='email'
                            placeholder='선물 받을 상대방 아이디 입력'
                            {...register('recipientId',{
                                required:{value:true, message:'이메일을 입력해주세요'},
                                pattern:{
                                    value:/^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i,
                                    message:'이메일 형식이 올바르지 않습니다'
                                },
                            }
                            )}
                        />
                        <Button onclick={checkId} variant='check'>확인</Button>
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
                            <span className={styles.mypoint}><b>보유 포인트</b> {formatNumberWithCommas(user?.totalPoint)}P</span>
                        )}
                        <input
                            className={styles.point_input}
                            type='text'
                            placeholder='금액을 입력하세요'
                            value={watch('customPoint')}
                            {...register('customPoint', { onChange: handleCustomPointChange })}
                        />
                        <img src={deleteIcon} onClick={deleteNumber} alt='delete-icon' style={{ width: '17px', position: 'absolute', bottom: '89px', right: '21px', cursor: 'pointer' }} />
                    </div>
                    {errors.customPoint && <p className={styles.errorMessage}>{errors.customPoint.message}</p>}
                            <Button
                            variant='main'
                            onclick={handleGiftButtonClick}
                            disabled={disabled}
                        >
                            선물하기
                        </Button>
                </div>
            </div>
            {isOpen && (
                <Modal isOpen={isOpen} onClose={closeModal}>
                    <Modal.Header>
                        선물하기
                    </Modal.Header>
                    <Modal.Content>
                        {recipientId}님께 포인트를 선물하시겠습니까?
                    </Modal.Content>
                    <Modal.Footer>
                        <Modal.Button buttonStyle='button--primary' onClick={sendGiftPoint}>확인</Modal.Button>
                        <Modal.Button buttonStyle='button--secondary' onClick={closeModal}>취소</Modal.Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};

export default GiftPoint;
