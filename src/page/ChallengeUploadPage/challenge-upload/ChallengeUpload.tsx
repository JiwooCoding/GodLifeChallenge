import { useState } from 'react'
import InputField from '../../../components/inputField/InputField'
import { useForm } from 'react-hook-form';
import SelectSmall from '../../../components/select-category/SelectCategory';
import ImageUpload from '../../../components/imageField/ImageField';
import ChallengeDate from './challenge-date/ChallengeDate';
import TextareaField from '../../../components/textareaField/TextareaField';
import ChallengeExamplePhoto from './challenge-example-photo/ChallengeExamplePhoto';
import api from '../../../api/api';
import Button from '../../../components/button/Button';
import styles from './ChallengeUploda.module.scss'
import { useNavigate } from 'react-router-dom';
import ChallengeAuthMethod from './challenge-authMethod/ChallengeAuthMethod';
import ChallengeTime from './challenge-time/ChallengeTime';
import { useModal } from '../../../contexts/ModalProvider';
import Modal from '../../../components/modal';
import { FormValues } from '../../../type/challengeData';
import useActiveInput from '../../../hooks/useActiveInput';


const ChallengeUpload = () => {

    const {handleSubmit, register, control, formState: { errors }, setValue} = useForm<FormValues>();
    const {isOpen, openModal, closeModal} = useModal();
    const navigate = useNavigate();

    const [category, setCategory] = useState<string>('');
    

    const backToPage = () => {
        navigate(-1);
    }

    const {activeInput, handleFocus, handleBlur} = useActiveInput();

    const onSubmit = async(data:FormValues) => {

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('category', data.category);
        formData.append('startDate', data.startDate);
        formData.append('endDate', data.endDate);
        formData.append('uploadStartTime', data.uploadStartTime); 
        formData.append('uploadEndTime', data.uploadEndTime); 
        formData.append('participantsLimit', data.participantsLimit.toString());
        formData.append('description', data.description); 
        formData.append('mainImage', data.mainImage[0]); 
        formData.append('authMethod', data.authMethod); 
        formData.append('successImage', data.successImage[0]); 
        formData.append('failImage', data.failImage[0]); 
        

         // FormData 내용을 확인하는 코드
        // for (let [key, value] of formData.entries()) {
        //     console.log(`${key}:`, value);
        // }

        if(data.startDate > data.endDate){
            alert('시작일이 종료일보다 클 수 없습니다!');
            return;
        }

        if(data.uploadStartTime > data.uploadEndTime){
            alert('시작시간이 종료시간보다 클 수 없습니다!');
            return;
        }

        try {
            await api.post('/api/challenge', formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            openModal();
        } catch (error) {
            console.log('챌린지 업로드 실패', error);
        }
    };

    const modalClick = () => {
        navigate('/challenge');
        closeModal();
    }

    return (
        <>
        <div className={styles.challenge_upload}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* 챌린지 메인 이미지 */}
                <ImageUpload
                    name="mainImage"
                    label="메인 이미지"
                    multiple={false}
                    control={control}
                />
                {/* 챌린지 타이틀(제목) */}
                <InputField
                    id='title'
                    label='챌린지 제목'
                    type='text'
                    placeholder='예) 매일 1만보 걷기'
                    activeInput={activeInput}
                    register={register}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                {/* 챌린지 설명 */}
                <TextareaField
                    id='description'
                    label='챌린지 소개'
                    activeInput={activeInput}
                    register={register}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholderText="예) 매일 1만보 걷고 건강해지기! 오늘부터 같이해봐요 : )"
                />
                {/* 챌린지 카테고리 */}
                <SelectSmall
                    id='category'
                    label='카테고리'
                    onBlur={handleBlur}
                    setCategory={setCategory}
                    register={register}
                    options={[
                        {value:'규칙적인생활',label:'규칙적인생활'},
                        {value:'운동', label:'운동'},
                        {value:'셀프케어', label:'셀프케어'},
                        {value:'식습관',label:'식습관'}
                    ]}
                />
                {/* 챌린지 참여 인원 리밋 */}
                <InputField
                    id='participantsLimit'
                    label='참여인원'
                    type='number'
                    activeInput={activeInput}
                    register={register}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder='최소 참가인원은 5명입니다'
                    min={5}
                    step={1}
                />
                {/* 에러 메시지 표시 */}
                {errors.participantsLimit && <p style={{ color: 'red' }}>{errors.participantsLimit.message}</p>}
                
                {/* 챌린지 시작 및 종료일 */}
                <ChallengeDate
                    activeInput={activeInput}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    setValue={setValue}
                />
                {/* 챌린지 시작 및 종료시간 */}
                <ChallengeTime
                    register={register}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    activeInput={activeInput}
                />
                {/* 챌린지 인증 방법 */}
                <ChallengeAuthMethod
                    activeInput={activeInput}
                    register={register}
                    handleFocus={handleFocus}
                    handleBlur={handleBlur}
                />
                {/* 챌린지 인증샷  */}
                <ChallengeExamplePhoto
                    control={control}
                    label="인증샷 예시"
                />
                <div className={styles.upload_button}>
                    <Button type='button' variant='close' onclick={backToPage}>
                        취소
                    </Button>
                    <Button type='submit' variant='confirm'>
                        업로드
                    </Button>
                </div>
            </form>
        </div>
        {isOpen && (
            <Modal isOpen={isOpen} onClose={closeModal}>
                <Modal.Header>
                    업로드 완료
                </Modal.Header>
                <Modal.Content>
                    챌린지가 등록되었습니다
                </Modal.Content>
                <Modal.Footer>
                    <Modal.Button buttonStyle='button--primary' onClick={modalClick}>확인</Modal.Button>
                </Modal.Footer>
            </Modal>
        )}
        </>
    )
}

export default ChallengeUpload