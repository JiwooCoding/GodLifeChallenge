import { useState } from 'react'
import InputField from '../../../components/inputField/InputField'
import { useForm } from 'react-hook-form';
import SelectSmall from '../../../components/select-category/SelectCategory';
import ImageUpload from '../../../components/imageField/ImageField';

import { handlePhotoChange } from '../../../utils/handlePhotoChange';
import ChallengeStartEndDate from './challenge-start-endDate/ChallengeStartEndDate';
import TextareaField from '../../../components/textareaField/TextareaField';
import ChallengeExamplePhoto from './challenge-example-photo/ChallengeExamplePhoto';
import api from '../../../api/api';
import Button from '../../../components/button/Button';
import styles from './ChallengeUploda.module.scss'
import { useNavigate } from 'react-router-dom';
import ChallengeAuthMethod from './challenge-authMethod/ChallengeAuthMethod';

export type FormValues = {
    title: string; //챌린지 제목
    category: string; // 챌린지 카테고리
    startDate: string; // 챌린지 시작일 (당일x, 다음날부터 가능)
    endDate:string;// 챌린지 종료일
    authMethod:string;
    //frequency: string; //챌린지 빈도 (매일, 평일, 주말)
    participantsLimit:number; //챌린지 리밋 인원
    description: string;
    mainImage: FileList;
    exampleImages:File[]; // 인증 사진 예시
}

const ChallengeUpload = () => {

    const {handleSubmit, register, control, formState: { errors }} = useForm<FormValues>();
    const navigate = useNavigate();

    const [activeInput, setActiveInput] = useState('');
    const [category, setCategory] = useState<string>('');
    

    const handleFocus = (inputId: string) => {
        setActiveInput(inputId);
    };

    const handleBlur = () => {
        setActiveInput('');
    };

    const backToPage = () => {
        navigate(-1);
    }

    const onSubmit = async(data:FormValues) => {
        const successFile = (data.exampleImages.filter(file => file.name.endsWith('-success')) || []);
        const failFile = (data.exampleImages.filter(file => file.name.endsWith('-fail')) || []);
        const exampleImages = [...successFile, ...failFile];

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('category', data.category);
        formData.append('startDate', data.startDate);
        formData.append('endDate', data.endDate);
        formData.append('participantsLimit', data.participantsLimit.toString());
        formData.append('description', data.description);
        formData.append('mainImage', data.mainImage[0]);
        exampleImages.forEach((file, index) => {
            formData.append(`exampleImages[${index}]`, file);
        });

        try {
            const response = await api.post('/api/challenge', formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('response => ', response.data);
        } catch (error) {
            console.log('챌린지 업로드 실패', error);
        }
    }

    return (
        <div className={styles.challenge_upload}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* 챌린지 메인 이미지 */}
                <ImageUpload
                    name="mainImage"
                    label="메인 이미지"
                    multiple={false}
                    control={control}
                    //handlePhotoChange={(files) => handlePhotoChange(files, setPreview, noImage)}
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
                    options={[
                        {value:'규칙적인생활',label:'규칙적인생활'},
                        {value:'운동', label:'운동'},
                        {value:'셀프케어', label:'셀프케어'},
                        {value:'식습관',label:'식습관'}
                    ]}
                />
                {/* 인증 빈도 */}
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
                
                {/* 챌린지 시작과 끝 일자 및 시간 */}
                <ChallengeStartEndDate
                    activeInput={activeInput}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
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
                    name="exampleImages"
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
    )
}

export default ChallengeUpload