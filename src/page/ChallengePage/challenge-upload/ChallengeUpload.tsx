import React, { useState } from 'react'
import InputField from '../../UploadPage/upload/input-upload/InputField'
import { useForm } from 'react-hook-form';
import SelectSmall from '../../UploadPage/upload/select-category/SelectCategory';
import ImageUpload from '../../UploadPage/upload/image-upload/ImageUpload';
import noImage from '../../../image/noimage.jpeg';
import { handlePhotoChange } from '../../../utils/handlePhotoChange';

export type FormValues = {
    title: string; //챌린지 제목
    category: string; // 챌린지 카테고리
    startDate: Date; // 챌린지 시작일 (당일x, 다음날부터 가능)
    uploadStartTime:string; 
    uploadEndTime: string;
    description: string;
    mainImage: string;
    exampleImages:File[]; // 인증 사진 예시
}

const ChallengeUpload = () => {

    const {handleSubmit, register, control} = useForm<FormValues>();

    const [activeInput, setActiveInput] = useState('');
    const [category, setCategory] = useState<string>('');
    const [preview, setPreview] = useState<string>(noImage);

    const handleFocus = (inputId: string) => {
        setActiveInput(inputId);
    };

    const handleBlur = () => {
        setActiveInput('');
    };

    return (
        <div className='page'>
            <form>
                <InputField
                    id='title'
                    label='챌린지 제목'
                    type='text'
                    placeholder='예) 기상 8시'
                    activeInput={activeInput}
                    register={register}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
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
                <ImageUpload
                    name="mainImage"
                    label="상품 사진"
                    multiple={false}
                    control={control}
                    preview={preview}
                    handlePhotoChange={(files) => handlePhotoChange(files, setPreview, noImage)}
                />
            </form>
        </div>
    )
}

export default ChallengeUpload