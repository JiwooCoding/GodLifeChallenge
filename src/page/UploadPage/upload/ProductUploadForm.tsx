import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './ProductUploadForm.scss';
import { Link } from 'react-router-dom';
import noImage from '../../../image/noimage.jpeg';
import InputField from './input-upload/InputField';
import ImageUpload from './image-upload/ImageUpload';
import api from '../../../api/api';
import SelectSmall from './select-category/SelectCategory';

export type FormValues = {
    productName: string;
    productImages: FileList;
    price: number;
    category: string;
    stock: number;
};

const ProductUploadForm: React.FC = () => {
    const { handleSubmit, control, register, setValue } = useForm<FormValues>();
    const [preview, setPreview] = useState<string>(noImage);
    const [activeInput, setActiveInput] = useState('');
    const [category, setCategory] = useState<string>('');

    const onSubmit = async (data: FormValues) => {
        const formData = new FormData();
        formData.append('productName', data.productName);
        if (data.productImages && data.productImages.length > 0) {
            formData.append('productImages', data.productImages[0]);
        }
        formData.append('price', data.price.toString());
        formData.append('category', category);
        formData.append('stock', data.stock.toString());

        try {
            const response = await api.post('/admin/shop/product/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('response => ', response.data);
        } catch (error) {
            console.log('error => ', error);
        }
    };

    const handlePhotoChange = (files: FileList | null) => {
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(noImage);
        }
    };

    const handleFocus = (inputId: string) => {
        setActiveInput(inputId);
    };

    const handleBlur = () => {
        setActiveInput('');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid'>
                <InputField
                    id="productName"
                    label="상품 이름"
                    type="text"
                    placeholder="상품명 입력"
                    activeInput={activeInput}
                    register={register}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <InputField
                    id="price"
                    label="상품 가격"
                    type="number"
                    placeholder="상품 가격 입력"
                    step={100}
                    min={100}
                    activeInput={activeInput}
                    register={register}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <SelectSmall
                    id="category"
                    label='상품 카테고리'
                    onBlur={handleBlur}
                    setCategory={setCategory} // 카테고리 상태를 설정하는 함수 전달
                />
                <InputField
                    id='stock'
                    label='상품 수량'
                    type='number'
                    placeholder='상품 수량 입력'
                    activeInput={activeInput}
                    register={register}
                    step={10}
                    min={10}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <ImageUpload
                    control={control}
                    preview={preview}
                    handlePhotoChange={handlePhotoChange}
                />
            </div>
            <Link to={'/'}><button className='cancle-button'>취소</button></Link>
            <button type="submit" className='upload-button'>업로드하기</button>
        </form>
    );
};

export default ProductUploadForm;