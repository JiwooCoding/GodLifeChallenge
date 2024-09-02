import React, { useState } from 'react';
import { useForm, FieldValues, Path } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import noImage from '../../../image/noimage.jpeg';
import InputField from '../../../components/inputField/InputField';
import ImageUpload from '../../../components/imageField/ImageField';
import api from '../../../api/api';
import SelectSmall from '../../../components/select-category/SelectCategory';
import Button from '../../../components/button/Button';
import { handlePhotoChange } from '../../../utils/handlePhotoChange';

export type FormValues = {
    productCompany: string;
    productName: string;
    productImage: FileList;
    price: number;
    category: string;
    stock: number;
};

const ProductUploadForm: React.FC = () => {
    const { handleSubmit, control, register } = useForm<FormValues>();
    const [preview, setPreview] = useState<string>(noImage);
    const [activeInput, setActiveInput] = useState('');
    const [category, setCategory] = useState<string>('');

    const navigate = useNavigate();

    const onSubmit = async (data: FormValues) => {
        const formData = new FormData();
        formData.append('productCompany', data.productCompany);
        formData.append('productName', data.productName);
        formData.append('price', data.price.toString());
        formData.append('category', category);
        formData.append('stock', data.stock.toString());

        if (data.productImage && data.productImage.length > 0) {
            formData.append('productImage', data.productImage[0]);
        }

        try {
            const response = await api.post('/api/admin/shop/product/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('response => ', response.data);
        } catch (error) {
            console.log('error => ', error);
        }
    };

    const handleFocus = (inputId: string) => {
        setActiveInput(inputId);
    };

    const handleBlur = () => {
        setActiveInput('');
    };

    const backToPage = () => {
        navigate(-1);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <InputField
                        id="productCompany"
                        label="브랜드명"
                        type="text"
                        placeholder="브랜드명 입력"
                        activeInput={activeInput}
                        register={register}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
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
                    label="상품 카테고리"
                    onBlur={handleBlur}
                    setCategory={setCategory} 
                    options={[
                        {value:'식음료', label:'식음료'},
                        {value:'문화·생활', label:'문화·생활'}
                    ]}
                />
                <InputField
                    id="stock"
                    label="상품 수량"
                    type="number"
                    placeholder="상품 수량 입력"
                    activeInput={activeInput}
                    register={register}
                    step={10}
                    min={10}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <ImageUpload
                    name="productImage"
                    label="상품 사진"
                    multiple={false}
                    control={control}
                    preview={preview}
                    handlePhotoChange={(files) => handlePhotoChange(files, setPreview, noImage)}
                />
            </div>
            <div>
                <Button type="button" variant="close" onclick={backToPage}>
                    취소
                </Button>
                <Button type="submit" variant="confirm">
                    업로드하기
                </Button>
            </div>
        </form>
    );
};

export default ProductUploadForm;
